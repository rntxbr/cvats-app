"use client";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { resumeToText } from "@/app/lib/ats/analyze";
import { cleanResume } from "@/app/lib/ats/clean-resume";
import { downloadText } from "@/app/lib/download";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { selectResume, setResume } from "@/app/lib/redux/resumeSlice";
import { selectSettings, setSettings } from "@/app/lib/redux/settingsSlice";
import { validateState } from "@/app/lib/redux/validate-state";
import { IconButton } from "@/components/Button";

export function ResumeTools() {
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-1 text-[#28584c]">
      <IconButton
        tooltipText="Exportar texto (.txt)"
        onClick={() =>
          downloadText(resumeToText(cleanResume(resume, settings), settings), "curriculo.txt")
        }
      >
        <DocumentTextIcon className="h-5 w-5" />
      </IconButton>
      <IconButton
        tooltipText="Salvar backup editável (.json)"
        onClick={() =>
          downloadText(
            JSON.stringify({ version: 1, resume, settings }, null, 2),
            "curriculo-editavel.json",
            "application/json"
          )
        }
      >
        <ArrowDownOnSquareIcon className="h-5 w-5" />
      </IconButton>
      <IconButton
        tooltipText="Restaurar backup e substituir os dados atuais"
        onClick={() => input.current?.click()}
      >
        <ArrowUpOnSquareIcon className="h-5 w-5" />
      </IconButton>
      <IconButton href="/resume-import" tooltipText="Importar currículo em PDF">
        <DocumentArrowUpIcon className="h-5 w-5" />
      </IconButton>
      <IconButton tooltipText="Salvo automaticamente neste navegador. Faça um backup para usar em outro dispositivo.">
        <InformationCircleIcon className="h-5 w-5" />
      </IconButton>
      <input
        ref={input}
        type="file"
        accept=".json,application/json"
        className="hidden"
        aria-label="Restaurar backup"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          try {
            if (file.size > 2 * 1024 * 1024) throw new Error("A cópia deve ter no máximo 2 MB.");
            const state = validateState(JSON.parse(await file.text()));
            if (!state) throw new Error("Cópia inválida. Use um backup exportado pelo editor.");
            dispatch(setResume(state.resume));
            dispatch(setSettings(state.settings));
            setMessage("Backup restaurado.");
          } catch (error) {
            setMessage(
              error instanceof Error ? error.message : "Não foi possível restaurar o backup."
            );
          }
        }}
      />
      {message && (
        <p role="status" className="w-full text-right text-xs">
          {message}
        </p>
      )}
    </div>
  );
}
