"use client";

import { useEffect, useState } from "react";
import { extractResumeFromSections } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { groupLinesIntoSections } from "@/app/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupTextItemsIntoLines } from "@/app/lib/parse-resume-from-pdf/group-text-items-into-lines";
import type { Resume } from "@/app/lib/redux/types";
import { ResumeTable } from "@/app/resume-parser/ResumeTable";
import { AtsAnalysis } from "@/components/AtsAnalysis";
import { ResumeDropzone } from "@/components/ResumeDropzone";

export default function ClientPage() {
  const [fileUrl, setFileUrl] = useState("");
  const [text, setText] = useState("");
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    setText("");
    setResume(null);
    setError("");
    setLoading(Boolean(fileUrl));
    if (fileUrl) {
      (async () => {
        try {
          const { readPdf } = await import("@/app/lib/parse-resume-from-pdf/read-pdf");
          const items = await readPdf(fileUrl);
          const lines = groupTextItemsIntoLines(items);
          if (cancelled) return;
          setText(lines.map((line) => line.map((item) => item.text).join(" ")).join("\n"));
          setResume(extractResumeFromSections(groupLinesIntoSections(lines)));
        } catch (err) {
          if (!cancelled)
            setError(err instanceof Error ? err.message : "Não foi possível ler o PDF.");
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [fileUrl]);
  return (
    <main className="mx-auto max-w-7xl px-4 pt-28 pb-8 space-y-4">
      <header>
        <h1 className="text-lg font-semibold text-[#28584c]">Analisar currículo</h1>
      </header>
      <ResumeDropzone
        playgroundView
        onFileUrlChange={(url) => {
          setFileUrl(url);
          setText("");
          setResume(null);
          setError("");
        }}
      />
      <button
        type="button"
        className="text-[#28584c] underline"
        onClick={() => setFileUrl("/resume-example/joao-silva-curriculo.pdf")}
      >
        Testar com currículo de exemplo
      </button>
      {loading && <p role="status">Lendo e analisando o PDF...</p>}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <section className="space-y-4">
          {fileUrl && (
            <iframe
              src={`${fileUrl}#navpanes=0`}
              title="Prévia do currículo PDF"
              className="h-[55dvh] min-h-80 w-full rounded-xl border bg-white"
            />
          )}
          <label htmlFor="resume-text" className="block text-sm font-medium">
            {fileUrl ? "Texto extraído" : "Texto do currículo"}
          </label>
          <textarea
            id="resume-text"
            rows={12}
            disabled={loading}
            maxLength={60000}
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-4"
            placeholder="Nome, contato, resumo, experiências, formação e habilidades..."
          />
          {resume && (
            <details className="rounded-xl border bg-white p-4">
              <summary className="cursor-pointer font-semibold">
                Conferir campos identificados no PDF
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                Extração automática aproximada; o texto acima é a fonte da avaliação.
              </p>
              <ResumeTable resume={resume} />
            </details>
          )}
        </section>
        <AtsAnalysis text={text} />
      </div>
    </main>
  );
}
