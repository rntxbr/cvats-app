"use client";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const anchor = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const id = useId();
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useLayoutEffect(() => {
    if (!show || !anchor.current || !tip.current) return;
    const rect = anchor.current.getBoundingClientRect();
    const box = tip.current.getBoundingClientRect();
    setPosition({
      left: Math.max(
        8,
        Math.min(window.innerWidth - box.width - 8, rect.left + (rect.width - box.width) / 2)
      ),
      top:
        rect.bottom + box.height + 12 > window.innerHeight
          ? Math.max(8, rect.top - box.height - 6)
          : rect.bottom + 6,
    });
  }, [show]);
  useEffect(() => {
    if (!show) return;
    const hide = () => setShow(false);
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
      window.removeEventListener("keydown", key);
    };
  }, [show]);
  return (
    <span
      ref={anchor}
      className="inline-flex min-w-0"
      aria-describedby={show ? id : undefined}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <div
            id={id}
            ref={tip}
            role="tooltip"
            className="pointer-events-none fixed z-50 max-w-[min(280px,calc(100vw-16px))] rounded-lg bg-[#28584c] px-3 py-2 text-xs leading-relaxed text-white shadow-lg"
            style={position}
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  );
};
