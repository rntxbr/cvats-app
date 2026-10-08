"use client";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowsPointingInIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { IconButton } from "@/components/Button";
import { Tooltip } from "@/components/Tooltip";

export function ResumeControlBar({
  url,
  error,
  pending,
  fileName,
  zoom,
  setZoom,
}: {
  url: string | null;
  error: string | null;
  pending: boolean;
  fileName: string;
  zoom: number;
  setZoom: (zoom: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#28584c]/10 p-3">
      <div className="flex items-center gap-1 text-[#28584c]">
        <IconButton
          aria-label="Diminuir zoom"
          tooltipText="Diminuir zoom"
          disabled={zoom <= 0.6}
          onClick={() => setZoom(Math.max(0.6, zoom - 0.2))}
        >
          <MinusIcon className="h-5 w-5" />
        </IconButton>
        <span className="w-11 text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
        <IconButton
          aria-label="Aumentar zoom"
          tooltipText="Aumentar zoom"
          disabled={zoom >= 2}
          onClick={() => setZoom(Math.min(2, zoom + 0.2))}
        >
          <PlusIcon className="h-5 w-5" />
        </IconButton>
        <IconButton
          aria-label="Ajustar à largura"
          tooltipText="Ajustar à largura"
          onClick={() => setZoom(1)}
        >
          <ArrowsPointingInIcon className="h-5 w-5" />
        </IconButton>
      </div>
      {url && !pending && !error ? (
        <Tooltip text="Baixar PDF">
          <a
            href={url}
            aria-label="Baixar PDF"
            download={fileName}
            className="flex min-h-11 items-center gap-2 rounded-xl bg-[#28584c] px-4 text-sm font-semibold text-white hover:bg-[#1f473d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28584c]"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </a>
        </Tooltip>
      ) : (
        <button
          disabled
          type="button"
          aria-label={error ? "Falha no PDF" : "Gerando PDF"}
          className="flex min-h-11 items-center gap-2 rounded-xl bg-[#28584c]/50 px-4 text-sm text-white"
        >
          <ArrowPathIcon className={`h-5 w-5 ${error ? "" : "animate-spin"}`} />
          <span className="hidden sm:inline">{error ? "Falha no PDF" : "Gerando…"}</span>
        </button>
      )}
      {error && (
        <p role="alert" className="w-full text-sm text-red-700">
          Não foi possível gerar o PDF. Revise os campos ou recarregue a página.
        </p>
      )}
    </div>
  );
}
