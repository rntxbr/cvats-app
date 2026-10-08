"use client";
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHasUsedAppBefore } from "@/app/lib/redux/local-storage";
import { ResumeDropzone } from "@/components/ResumeDropzone";

export default function ClientPage() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  useEffect(() => setHasUsedAppBefore(getHasUsedAppBefore()), []);
  return (
    <main className="mx-auto min-h-[80dvh] max-w-xl px-4 pb-10 pt-32">
      <h1 className="mb-5 text-lg font-semibold text-[#28584c]">Importar currículo</h1>
      <ResumeDropzone onFileUrlChange={() => {}} />
      <Link
        href="/resume-builder"
        className="mt-4 flex min-h-14 items-center gap-3 rounded-2xl border border-[#28584c]/15 bg-white p-4 text-sm font-medium text-[#28584c] hover:bg-[#f1eee1]"
      >
        <PencilSquareIcon className="h-5 w-5" />
        {hasUsedAppBefore ? "Continuar no editor" : "Criar do zero"}
        <ArrowRightIcon className="ml-auto h-5 w-5" />
      </Link>
    </main>
  );
}
