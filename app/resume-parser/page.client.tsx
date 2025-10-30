"use client";

import { useState, useEffect } from "react";
import type { TextItems } from "@/app/lib/parse-resume-from-pdf/types";
import { ResumeDropzone } from "@/components/ResumeDropzone";
import { Heading, Link } from "@/components/documentation";
import { ResumeTable } from "@/app/resume-parser/ResumeTable";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/laverne-resume.pdf",
    description: (
      <span>
        Borrowed from University of La Verne Career Center -{" "}
        <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/cvats-resume.pdf",
    description: (
      <span>
        Created with cvats resume builder -{" "}
        <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];

export default function ClientPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [sections, setSections] = useState<any>({});
  const [resume, setResume] = useState<any>({
    profile: { name: "", email: "", phone: "", location: "", url: "", summary: "" },
    workExperiences: [],
    educations: [],
    projects: [],
    skills: { featuredSkills: [], descriptions: [] },
    custom: { descriptions: [] }
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function test() {
      if (!fileUrl) {
        return;
      }

      try {
        setError(null);
        const pdfModule = await import("@/app/lib/parse-resume-from-pdf/read-pdf");
        const { groupTextItemsIntoLines } = await import("@/app/lib/parse-resume-from-pdf/group-text-items-into-lines");
        const { groupLinesIntoSections } = await import("@/app/lib/parse-resume-from-pdf/group-lines-into-sections");
        const { extractResumeFromSections } = await import("@/app/lib/parse-resume-from-pdf/extract-resume-from-sections");

        const textItems = await pdfModule.readPdf(fileUrl);
        setTextItems(textItems);

        const lines = groupTextItemsIntoLines(textItems || []);
        setLines(lines);

        const sections = groupLinesIntoSections(lines);
        setSections(sections);

        const resume = extractResumeFromSections(sections);
        setResume(resume);
      } catch (err) {
        console.error("Error reading PDF:", err);
        setError(`Erro ao carregar PDF: ${err instanceof Error ? err.message : 'Arquivo não encontrado'}`);
        setTextItems([]);
        setLines([]);
        setSections({});
        setResume({
          profile: { name: "", email: "", phone: "", location: "", url: "", summary: "" },
          workExperiences: [],
          educations: [],
          projects: [],
          skills: { featuredSkills: [], descriptions: [] },
          custom: { descriptions: [] }
        });
      }
    }
    test();
  }, [fileUrl]);

  return (
    <main className=" w-full py-32">
      <div className="container mx-auto grid md:grid-cols-2 gap-4">
        <section className="w-full">
          <div className="aspect-h-[9.5] aspect-w-7">
            {fileUrl && <iframe src={`${fileUrl}#navpanes=0`} className="h-screen w-full" />}
            {!fileUrl && (
              <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Nenhum PDF selecionado</p>
              </div>
            )}
          </div>
        </section>
        <div className="flex px-6 text-gray-900 flex-1">
          <section className="w-full grow">
            <div className="mt-3">
              <ResumeDropzone
                onFileUrlChange={(fileUrl) => {
                  setFileUrl(fileUrl || defaultFileUrl);
                  setError(null);
                }}
                playgroundView={true}
              />
            </div>
            <Heading level={2} className="!mt-[1.2em]">
              Resultado da Análise
            </Heading>
            <ResumeTable resume={resume} />
          </section>
        </div>
      </div>
    </main>
  );
}


