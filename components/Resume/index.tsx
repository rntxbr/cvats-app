"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { A4_WIDTH_PX, DEBUG_RESUME_PDF_FLAG, LETTER_WIDTH_PX } from "@/app/lib/constants";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectResume } from "@/app/lib/redux/resumeSlice";
import { selectSettings } from "@/app/lib/redux/settingsSlice";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "@/components/fonts/NonEnglishFontsCSSLoader";
import { ResumeControlBarCSR } from "@/components/Resume/ResumeControlBar";
import { ResumeIframeCSR } from "@/components/Resume/ResumeIFrame";
import { ResumePDF } from "@/components/Resume/ResumePDF";

export const Resume = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);

  // Criar o documento diretamente - o usePDF deve detectar mudanças automaticamente
  // mas vamos usar uma key no ResumeControlBar para forçar recriação quando necessário
  const document = (
    <ResumePDF resume={resume} settings={settings} isPDF={true} suppressErrorMessages={false} />
  );
  
  // Key baseada nos dados principais para forçar remontagem do ResumeControlBar
  // quando os dados mudarem, garantindo que usePDF gere o PDF atualizado
  // Usando uma hash simples dos dados principais
  const controlBarKey = useMemo(() => {
    const profileHash = `${resume.profile.name}-${resume.profile.email}-${resume.profile.phone}`;
    const experiencesHash = resume.workExperiences
      .map((exp) => `${exp.company}-${exp.jobTitle}`)
      .join("|");
    const educationsHash = resume.educations
      .map((edu) => `${edu.school}-${edu.degree}`)
      .join("|");
    const projectsHash = resume.projects.map((proj) => proj.project).join("|");
    const skillsHash = resume.skills.descriptions.join("|");
    return `${profileHash}-${experiencesHash}-${educationsHash}-${projectsHash}-${skillsHash}-${settings.documentSize}`;
  }, [resume, settings.documentSize]);

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  // Ajusta o scale automaticamente para o currículo ocupar 100% da largura disponível
  useEffect(() => {
    const pageWidthPx = settings.documentSize === "A4" ? A4_WIDTH_PX : LETTER_WIDTH_PX;

    const updateScale = () => {
      const el = containerRef.current;
      if (!el) return;
      const availableWidth = el.clientWidth;
      if (availableWidth > 0 && pageWidthPx > 0) {
        setScale(availableWidth / pageWidthPx);
      }
    };

    updateScale();

    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [settings.documentSize]);

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className="relative flex justify-center md:justify-start w-full" ref={containerRef}>
        <div className="relative w-full">
          <section className="">
            <ResumeIframeCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
            >
              <ResumePDF resume={resume} settings={settings} isPDF={DEBUG_RESUME_PDF_FLAG} />
            </ResumeIframeCSR>
          </section>
          <ResumeControlBarCSR
            key={controlBarKey}
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={`${resume.profile.name} - Resume`}
          />
        </div>
      </div>
    </>
  );
};
