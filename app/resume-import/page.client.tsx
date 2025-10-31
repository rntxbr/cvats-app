"use client";

import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHasUsedAppBefore } from "@/app/lib/redux/local-storage";
import { ResumeDropzone } from "@/components/ResumeDropzone";

export default function ClientPage() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-16 mt-10">
      <div className="mx-auto container  text-center rounded-3xl p-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {!hasUsedAppBefore ? (
            <>
              <ResumeDropzone onFileUrlChange={onFileUrlChange} className="mt-5" />
              {!hasAddedResume && (
                <SectionWithHeadingAndCreateButton
                  heading="Não tem um currículo ainda?"
                  buttonText="Criar novo cúrriculo"
                />
              )}
            </>
          ) : (
            <>
              {!hasAddedResume && (
                <SectionWithHeadingAndCreateButton
                  heading="Continue de onde você parou!"
                  buttonText="Continuar"
                />
              )}
              <ResumeDropzone onFileUrlChange={onFileUrlChange} className="mt-5" />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-green-50 p-10 space-y-4">
      <CheckCircleIcon className="h-16 w-16 text-[#28584c]" />
      <h2 className="font-bold text-[#28584c] text-2xl tracking-tight max-w-lg">{heading}</h2>
      <p className="text-lg text-[#28584c] tracking-tighter max-w-lg">
        Você tem dados salvos no navegador da sessão anterior, e pode continuar o preenchimento.
      </p>
      <Link
        href="/resume-builder"
        className="bg-[#28584c] text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#1f473d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#28584c]"
      >
        <PlusIcon className="h-5 w-5" />
        {buttonText}
      </Link>
    </div>
  );
};
