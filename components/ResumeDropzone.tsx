"use client";

import { useState } from "react";
import { LockClosedIcon, ArrowUpTrayIcon, ArrowRightIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  getHasUsedAppBefore,
  saveStateToLocalStorage,
} from "@/app/lib/redux/local-storage";
import { type ShowForm, initialSettings } from "@/app/lib/redux/settingsSlice";
import { useRouter } from "next/navigation";
const addPdfSrc = "/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "@/app/lib/cx";
import { deepClone } from "@/app/lib/deep-clone";
 

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false);
  const router = useRouter();

  const hasFile = Boolean(file.name);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }

    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      setNewFile(newFile);
    } else {
      setHasNonPdfFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    setNewFile(newFile);
  };

  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const onImportClick = async () => {
    const { parseResumeFromPdf } = await import("@/app/lib/parse-resume-from-pdf");
    const resume = await parseResumeFromPdf(file.fileUrl);
    const settings = deepClone(initialSettings);

    // Set formToShow settings based on uploaded resume if users have used the app before
    if (getHasUsedAppBefore()) {
      const sections = Object.keys(settings.formToShow) as ShowForm[];
      const sectionToFormToShow: Record<ShowForm, boolean> = {
        workExperiences: resume.workExperiences.length > 0,
        educations: resume.educations.length > 0,
        projects: resume.projects.length > 0,
        skills: resume.skills.descriptions.length > 0,
        custom: resume.custom.descriptions.length > 0,
      };
      for (const section of sections) {
        settings.formToShow[section] = sectionToFormToShow[section];
      }
    }

    saveStateToLocalStorage({ resume, settings });
    router.push("/resume-builder");
  };

  return (
    <div
      className="flex justify-center rounded-3xl border-2 border-dashed border-[#28584c] p-10"
     

      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div
        className="flex flex-col justify-center items-center space-y-4"
      >
        {!playgroundView && (
         <DocumentTextIcon className="h-16 w-16 text-[#28584c]" />
        )}
        {!hasFile ? (
          <>
            <h2
              className="text-2xl font-bold text-[#28584c] max-w-lg"
            >
              Carregue um arquivo PDF. 
            </h2>
            <p className="text-lg text-[#28584c] max-w-lg">
            
             Importe seu currículo em PDF para extrair os dados e agilizar o preenchimento.
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button
              type="button"
              className="outline-theme-blue rounded-md p-1 bg-red-400 text-white"
              title="Remover Arquivo"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          {!hasFile ? (
            <>
              <label
                className="cursor-pointer bg-[#28584c] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#1f473d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#28584c]"
                
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                Procurar arquivo
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={onInputChange}
                />
              </label>
              {hasNonPdfFile && (
                <p className="mt-6 text-red-400">Apenas arquivos PDF são suportados</p>
              )}
            </>
          ) : (
            <>
              {!playgroundView && (
                <button
                  type="button"
                  className="cursor-pointer bg-[#28584c] text-white px-10 py-4 rounded-xl font-bold flex justify-center items-center gap-2"
                  onClick={onImportClick}
                >
                 Continuar <ArrowRightIcon className="h-4 w-4" />
                </button>
              )}
              <p className={cx(" text-[#28584c]", !playgroundView && "mt-6")}>
                Aviso: {!playgroundView ? "Importar" : "Analisar"} funciona melhor em currículos de uma coluna
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};
