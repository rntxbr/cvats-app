"use client";

import {
  CheckCircleIcon,
  InformationCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { analyzeResume } from "@/app/lib/ats/analyze";
import { IconButton } from "@/components/Button";

export function AtsAnalysis({ text, compact = false }: { text: string; compact?: boolean }) {
  const [job, setJob] = useState("");
  const [keywords, setKeywords] = useState("");
  const report = useMemo(() => analyzeResume(text, job, keywords), [text, job, keywords]);
  return (
    <section
      className="rounded-2xl border border-[#28584c]/10 bg-white p-4 sm:p-5 text-gray-900 space-y-4"
      aria-label="Avaliação ATS"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#28584c]">
          {compact ? "Avaliação" : "Compatibilidade ATS"}
        </h2>
        <IconButton tooltipText="Estimativa de conteúdo e leitura. Cada ATS tem regras próprias; a nota não prevê aprovação nem avalia todo o layout.">
          <InformationCircleIcon className="h-5 w-5 text-[#28584c]" />
        </IconButton>
      </div>
      <div className="flex flex-wrap items-baseline gap-3">
        <strong className="text-4xl text-[#28584c]">{report.score}/100</strong>
        <span className="text-xs text-gray-500">{report.wordCount} palavras</span>
      </div>
      <progress
        className="w-full accent-[#28584c]"
        value={report.score}
        max={100}
        aria-label="Nota de estrutura e conteúdo"
      />
      <ul className="space-y-2">
        {report.checks.map((check) => (
          <li key={check.id} className="text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                {check.points ? (
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-[#28584c]" />
                ) : (
                  <MinusCircleIcon className="h-4 w-4 shrink-0 text-gray-400" />
                )}{" "}
                {check.label}
              </span>
              <span className="text-xs tabular-nums text-gray-500">
                {check.points}/{check.maxPoints}
              </span>
            </div>
            {!check.points && (
              <details className="ml-6 text-xs text-gray-500">
                <summary className="cursor-pointer py-1">Como melhorar</summary>
                <p className="pb-2 leading-relaxed">{check.suggestion}</p>
              </details>
            )}
          </li>
        ))}
      </ul>
      <label className="block font-semibold" htmlFor="ats-job">
        Vaga
      </label>
      <textarea
        id="ats-job"
        rows={4}
        maxLength={20000}
        className="w-full rounded-lg border border-gray-300 p-3"
        value={job}
        onChange={(event) => setJob(event.target.value)}
        placeholder="Cole os requisitos e as responsabilidades da vaga para comparar com seu currículo."
      />
      <label className="block font-semibold" htmlFor="ats-keywords">
        Palavras-chave
      </label>
      <input
        id="ats-keywords"
        className="w-full rounded-lg border border-gray-300 p-3"
        value={keywords}
        maxLength={4000}
        onChange={(event) => setKeywords(event.target.value)}
        placeholder="Excel, gestão de projetos, inglês"
      />
      <p className="text-xs text-gray-500">
        Separe por vírgulas para substituir os termos da vaga.
      </p>
      {report.jobMatch && (
        <div className="space-y-3 border-t pt-4">
          <h3 className="font-bold">Cobertura de palavras-chave: {report.jobMatch.score}%</h3>
          <p className="text-xs text-gray-500">
            {report.jobMatch.matched.length} de {report.jobMatch.keywords.length} termos
            encontrados.
          </p>
          <p className="text-sm">
            <strong>Encontradas:</strong> {report.jobMatch.matched.join(", ") || "Nenhuma"}
          </p>
          <p className="text-sm">
            <strong>Não encontradas:</strong> {report.jobMatch.missing.join(", ") || "Nenhuma"}
          </p>
          <p className="text-xs text-gray-500">
            Inclua apenas competências reais. A comparação busca termos; não avalia contexto ou
            senioridade.
          </p>
        </div>
      )}
    </section>
  );
}
