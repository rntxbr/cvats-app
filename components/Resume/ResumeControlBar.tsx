"use client";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import Link from "next/link";

const ResumeControlBar = ({

  document,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: any;
  fileName: string;
}) => {
  const [instance] = usePDF({ document });

  return (
    <div className="mt-4 sticky bottom-0 left-0 right-0 flex h-(--resume-control-bar-height) items-center justify-center px-(--resume-padding) text-gray-600">
      {instance.loading ? (
        <div className="ml-1 flex items-center gap-1 px-10 py-4 bg-gray-400 text-white opacity-50">
          <ArrowDownTrayIcon className="h-4 w-4 animate-spin" />
          <span className="whitespace-nowrap">Gerando PDF...</span>
        </div>
      ) : instance.url ? (
        <Link
          className="w-full flex justify-center items-center cursor-pointer bg-[#28584c] text-white px-6 py-4 rounded-xl font-bold gap-2  "
          href={instance.url}
          download={fileName}
        >
        <ArrowDownTrayIcon className="h-5 w-5" />
          <span>Baixar Currículo</span>
        </Link>
      ) : (
        <div className="ml-1 flex items-center gap-1 px-10 py-4 bg-red-600 text-white">
          <span className="whitespace-nowrap">Erro ao gerar o PDF</span>
        </div>
      )}
    </div>
  );
};

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-(--resume-control-bar-height) w-full border-t-2 bg-gray-50" />
);
