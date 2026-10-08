"use client";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

function PdfPage({ pdf, number, width }: { pdf: PDFDocumentProxy; number: number; width: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);
  const [pageText, setPageText] = useState("");
  useEffect(() => {
    let cancelled = false;
    let task: RenderTask | undefined;
    setError(false);
    (async () => {
      const page = await pdf.getPage(number);
      if (cancelled || !ref.current) return;
      const canvas = ref.current;
      const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(viewport.width * ratio);
      canvas.height = Math.ceil(viewport.height * ratio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      task = page.render({ canvas, viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
      await task.promise;
      const content = await page.getTextContent();
      if (!cancelled)
        setPageText(content.items.flatMap((item) => ("str" in item ? [item.str] : [])).join(" "));
    })().catch(() => {
      if (!cancelled) setError(true);
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [pdf, number, width]);
  return (
    <figure className="mx-auto w-fit">
      <canvas
        ref={ref}
        aria-label={`Página ${number} do currículo`}
        role="img"
        className="block bg-white shadow-md"
      />
      <figcaption className="py-2 text-center text-xs text-[#28584c]/70">
        {error ? "Não foi possível exibir esta página." : `${number} / ${pdf.numPages}`}
      </figcaption>
      <p className="sr-only">{pageText}</p>
    </figure>
  );
}

/** Renders the exact blob offered by the download link, including fonts and page breaks. */
export function PdfPreview({
  url,
  zoom,
  onReady,
}: {
  url: string | null;
  zoom: number;
  onReady: (url: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(500);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(160, entry.contentRect.width - 32))
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    let destroy: (() => Promise<void>) | undefined;
    setError(false);
    (async () => {
      const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
      if (cancelled) return;
      GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const task = getDocument({ url });
      destroy = () => task.destroy();
      const document = await task.promise;
      if (cancelled) return;
      setPdf(document);
      onReady(url);
    })().catch(() => {
      if (!cancelled) {
        setPdf(null);
        setError(true);
      }
    });
    return () => {
      cancelled = true;
      void destroy?.();
    };
  }, [url, onReady]);
  return (
    <div
      ref={ref}
      className="h-[calc(100dvh-230px)] min-h-80 overflow-auto overscroll-contain bg-[#f1eee1]/60 p-4 lg:h-[calc(100dvh-240px)]"
      aria-label="Páginas do currículo"
    >
      {error ? (
        <p role="alert" className="p-4 text-sm text-red-700">
          Não foi possível exibir o PDF. Recarregue a página para tentar novamente.
        </p>
      ) : pdf ? (
        <div className="space-y-3" style={{ minWidth: width * zoom }}>
          {Array.from({ length: pdf.numPages }, (_, index) => (
            <PdfPage key={`${url}-${index}`} pdf={pdf} number={index + 1} width={width * zoom} />
          ))}
        </div>
      ) : (
        <p role="status" className="p-4 text-center text-sm text-[#28584c]">
          Carregando PDF…
        </p>
      )}
    </div>
  );
}
