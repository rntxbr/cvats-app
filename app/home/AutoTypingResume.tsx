"use client";
import { useEffect, useRef, useState } from "react";
import { END_HOME_RESUME, START_HOME_RESUME } from "@/app/home/constants";
// Removed useTailwindBreakpoints to avoid layout shift from post-mount updates
import { deepClone } from "@/app/lib/deep-clone";
import { makeObjectCharIterator } from "@/app/lib/make-object-char-iterator";
import { initialResumeState } from "@/app/lib/redux/resumeSlice";
import { initialSettings } from "@/app/lib/redux/settingsSlice";
import { ResumeIframeCSR } from "@/components/Resume/ResumeIFrame";
import { ResumePDF } from "@/components/Resume/ResumePDF";

// countObjectChar(END_HOME_RESUME) -> ~1800 chars
const INTERVAL_MS = 50; // 20 Intervals Per Second
const CHARS_PER_INTERVAL = 10;
// Auto Typing Time:
//  10 CHARS_PER_INTERVAL -> ~1800 / (20*10) = 9s (let's go with 9s so it feels fast)
//  9 CHARS_PER_INTERVAL -> ~1800 / (20*9) = 10s
//  8 CHARS_PER_INTERVAL -> ~1800 / (20*8) = 11s

const RESET_INTERVAL_MS = 60 * 1000; // 60s

const computeScaleFromWindow = () => {
  if (typeof window === "undefined") return 0.5;
  const w = window.innerWidth;
  if (w >= 1536) return 0.9; // 2xl
  if (w >= 1280) return 0.8; // xl
  if (w >= 1024) return 0.7; // lg
  if (w >= 768) return 0.6; // md
  if (w >= 640) return 0.55; // sm
  return 0.5;
};

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(deepClone(initialResumeState));
  const resumeCharIterator = useRef(makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME));
  const hasSetEndResume = useRef(false);

  const [scale, setScale] = useState<number>(() => computeScaleFromWindow());

  useEffect(() => {
    const intervalId = setInterval(() => {
      let next = resumeCharIterator.current.next();
      for (let i = 0; i < CHARS_PER_INTERVAL - 1; i++) {
        next = resumeCharIterator.current.next();
      }
      if (!next.done) {
        setResume(next.value);
      } else {
        // Sometimes the iterator doesn't end on the last char,
        // so we manually set its end state here
        if (!hasSetEndResume.current) {
          setResume(END_HOME_RESUME);
          hasSetEndResume.current = true;
        }
      }
    }, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      resumeCharIterator.current = makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME);
      hasSetEndResume.current = false;
    }, RESET_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const next = computeScaleFromWindow();
      setScale((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <ResumeIframeCSR documentSize="A4" scale={scale}>
      <ResumePDF
        resume={resume}
        settings={{
          ...initialSettings,
          documentSize: "A4",
          fontSize: "12",
        }}
      />
    </ResumeIframeCSR>
  );
};
