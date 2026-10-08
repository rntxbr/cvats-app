"use client";

import { ArrowUpTrayIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/app/lib/cx";
import { deepClone } from "@/app/lib/deep-clone";
import { saveStateToLocalStorage } from "@/app/lib/redux/local-storage";
import { initialSettings } from "@/app/lib/redux/settingsSlice";
import { IconButton } from "@/components/Button";

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (url: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [hovered, setHovered] = useState(false);
  const objectUrl = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const selection = useRef(0);
  useEffect(
    () => () => {
      selection.current++;
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    },
    []
  );

  const selectFile = async (candidate?: File) => {
    if (!candidate || busy) return;
    const version = ++selection.current;
    setError("");
    if (!/\.pdf$/i.test(candidate.name)) {
      setError("Selecione um arquivo PDF.");
      return;
    }
    if (candidate.size === 0 || candidate.size > 10 * 1024 * 1024) {
      setError("O arquivo deve ter entre 1 byte e 10 MB.");
      return;
    }
    try {
      const signature = new TextDecoder().decode(await candidate.slice(0, 5).arrayBuffer());
      if (version !== selection.current) return;
      if (signature !== "%PDF-") {
        setError("O arquivo não contém um PDF válido.");
        return;
      }
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = URL.createObjectURL(candidate);
      setFile(candidate);
      onFileUrlChange(objectUrl.current);
    } catch {
      if (version === selection.current)
        setError("Não foi possível abrir o arquivo. Selecione-o novamente.");
    }
  };
  const remove = () => {
    selection.current++;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = "";
    setFile(null);
    setError("");
    onFileUrlChange("");
    if (inputRef.current) inputRef.current.value = "";
  };
  const importResume = async () => {
    if (!file || busy) return;
    setBusy(true);
    setError("");
    try {
      const { parseResumeFromPdf } = await import("@/app/lib/parse-resume-from-pdf");
      const resume = await parseResumeFromPdf(objectUrl.current);
      const settings = deepClone(initialSettings);
      settings.formToShow = {
        workExperiences: resume.workExperiences.length > 0,
        educations: resume.educations.length > 0,
        projects: resume.projects.length > 0,
        skills:
          resume.skills.descriptions.length > 0 ||
          resume.skills.featuredSkills.some((item) => item.skill.trim()),
        custom: resume.custom.descriptions.length > 0,
      };
      if (!saveStateToLocalStorage({ resume, settings }))
        throw new Error(
          "Não foi possível salvar o currículo neste navegador. Verifique se o armazenamento local está disponível."
        );
      router.push("/resume-builder");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível importar o PDF.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div
      className={cx(
        "rounded-2xl border border-dashed bg-white p-5 text-[#28584c]",
        hovered ? "border-[#28584c] bg-[#f1eee1]" : "border-[#28584c]/40",
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setHovered(true);
      }}
      onDragLeave={() => setHovered(false)}
      onDrop={(event) => {
        event.preventDefault();
        setHovered(false);
        void selectFile(event.dataTransfer.files[0]);
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium">
          <ArrowUpTrayIcon className="h-5 w-5" />
          Arraste seu PDF aqui
        </span>
        <IconButton tooltipText="Até 10 MB e 30 páginas. Processado neste navegador. Revise os campos extraídos; PDFs digitalizados precisam de OCR externo.">
          <InformationCircleIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        disabled={busy}
        aria-label="Selecionar currículo em PDF"
        className="mt-4 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#28584c] file:px-4 file:py-3 file:text-white"
        onChange={(event) => {
          void selectFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {file && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="break-all text-sm">
            {file.name} · {(file.size / 1024).toFixed(1)} KB
          </p>
          <IconButton tooltipText="Remover arquivo" disabled={busy} onClick={remove}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
          {!playgroundView && (
            <button
              type="button"
              disabled={busy}
              onClick={importResume}
              className="rounded-xl bg-[#28584c] px-4 py-3 text-sm text-white disabled:opacity-50"
            >
              {busy ? "Importando..." : "Continuar no editor"}
            </button>
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-4 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};
