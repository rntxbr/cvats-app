"use client";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectResume } from "@/app/lib/redux/resumeSlice";
import { selectSettings } from "@/app/lib/redux/settingsSlice";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";
import { PdfPreview } from "@/components/Resume/PdfPreview";
import { ResumeControlBar } from "@/components/Resume/ResumeControlBar";
import { ResumePDF } from "@/components/Resume/ResumePDF";

function ResumeClient() {
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF />,
    [resume, settings]
  );
  const [instance, update] = usePDF({ document });
  const [renderedDocument, setRenderedDocument] = useState(document);
  const [zoom, setZoom] = useState(1);
  const [previewReady, setPreviewReady] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      update(document);
      setRenderedDocument(document);
    }, 350);
    return () => clearTimeout(timer);
  }, [document, update]);
  const generating = instance.loading || renderedDocument !== document;
  const pending = generating || previewReady !== instance.url;
  const filename = `${resume.profile.name.trim().replace(/[<>:"/\\|?*]/g, "") || "curriculo"}.pdf`;
  return (
    <section
      aria-label="Prévia do PDF"
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#28584c]/15 bg-white shadow-sm"
    >
      <ResumeControlBar
        url={instance.url}
        error={instance.error}
        pending={pending}
        fileName={filename}
        zoom={zoom}
        setZoom={setZoom}
      />
      <div className="relative">
        <PdfPreview url={instance.url} zoom={zoom} onReady={setPreviewReady} />
        {generating && (
          <div
            role="status"
            className="absolute right-4 top-3 rounded-full bg-[#28584c] px-3 py-1 text-xs text-white shadow"
          >
            Atualizando…
          </div>
        )}
      </div>
    </section>
  );
}
export const Resume = dynamic(() => Promise.resolve(ResumeClient), {
  ssr: false,
  loading: () => (
    <div role="status" className="rounded-2xl bg-white p-6 text-sm">
      Preparando prévia…
    </div>
  ),
});
