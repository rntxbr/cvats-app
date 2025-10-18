"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DocumentArrowUpIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { trackResumeImport } from "lib/gtag";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const onFileUrlChange = (fileUrl: string) => {
    const hasFile = Boolean(fileUrl);
    setHasAddedResume(hasFile);
    // Rastreia quando usuário faz upload para importar
    if (hasFile) {
      trackResumeImport();
    }
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Card Neo-Brutal */}
        <div className="relative">
          {/* Sombra de fundo */}
          <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-4 border-black bg-yellow-300"></div>

          {/* Card principal */}
          <div className="relative z-10 rounded-2xl border-4 border-black bg-white px-8 py-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:px-12 lg:py-12">
            {!hasUsedAppBefore ? (
              <>
                {/* Ícone e título */}
                <div className="mb-6 flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-black bg-blue-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <DocumentArrowUpIcon className="h-9 w-9 text-gray-900" />
                  </div>
                  <h1 className="text-center text-2xl font-bold text-gray-900 lg:text-3xl">
                    Importar dados de um currículo existente
                  </h1>
                </div>

                <ResumeDropzone
                  onFileUrlChange={onFileUrlChange}
                  className="mt-6"
                />
                {!hasAddedResume && (
                  <>
                    <OrDivider />
                    <SectionWithHeadingAndCreateButton
                      heading="Ainda não tem um currículo?"
                      buttonText="Criar do zero"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {!hasAddedResume && (
                  <>
                    <SectionWithHeadingAndCreateButton
                      heading="Você tem dados salvos no navegador de uma sessão anterior"
                      buttonText="Continuar de onde parei"
                    />
                    <OrDivider />
                  </>
                )}

                {/* Ícone e título */}
                <div className="mb-6 flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-black bg-purple-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <DocumentArrowUpIcon className="h-9 w-9 text-gray-900" />
                  </div>
                  <h1 className="text-center text-2xl font-bold text-gray-900 lg:text-3xl">
                    Substituir dados com um novo currículo
                  </h1>
                </div>

                <ResumeDropzone
                  onFileUrlChange={onFileUrlChange}
                  className="mt-6"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="my-8 flex items-center" aria-hidden="true">
    <div className="flex-grow border-t-4 border-black" />
    <span className="mx-4 text-xl font-bold text-gray-900">OU</span>
    <div className="flex-grow border-t-4 border-black" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-gray-900">{heading}</p>
      <div className="mt-6">
        <Link href="/resume-builder" className="group relative inline-block">
          <div className="absolute -right-2 -top-2 h-full w-full rounded-xl border-4 border-black bg-green-300"></div>
          <div className="relative z-10 flex items-center gap-2 rounded-xl border-4 border-black bg-gradient-to-r from-blue-400 to-purple-500 px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <RocketLaunchIcon className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">{buttonText}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
