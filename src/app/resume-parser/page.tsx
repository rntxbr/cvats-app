"use client";
import { useState, useEffect } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { cx } from "lib/cx";
import { Heading, Link, Paragraph } from "components/documentation";
import { ResumeTable } from "resume-parser/ResumeTable";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";
import { trackATSParserUsed } from "lib/gtag";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/laverne-resume.pdf",
    description: (
      <span>
        Emprestado do Centro de Carreiras da Universidade de La Verne -{" "}
        <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/openresume-resume.pdf",
    description: (
      <span>
        Criado com o criador de currículos CVAts -{" "}
        <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];
export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
    }
    test();
  }, [fileUrl]);

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="grid md:grid-cols-6">
        <div className="flex justify-center px-2 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
          <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
            <div className="aspect-h-[9.5] aspect-w-7">
              <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" />
            </div>
          </section>
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
        </div>
        <div className="flex px-6 text-gray-900 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
          <section className="max-w-[600px] grow">
            <Heading className="text-primary !mt-4">
              Teste o Analisador de Currículos
            </Heading>
            <Paragraph smallMarginTop={true}>
              Este analisador demonstra a capacidade do CVAts de extrair
              informações de um currículo em PDF. Clique nos exemplos de PDF
              abaixo para observar diferentes resultados de análise.
            </Paragraph>
            <div className="mt-3 flex gap-3">
              {RESUME_EXAMPLES.map((example, idx) => (
                <article
                  key={idx}
                  className={cx(
                    "relative flex-1 cursor-pointer rounded-lg outline-none transition-all",
                    example.fileUrl === fileUrl ? "scale-105" : ""
                  )}
                  onClick={() => setFileUrl(example.fileUrl)}
                  onKeyDown={(e) => {
                    if (["Enter", " "].includes(e.key))
                      setFileUrl(example.fileUrl);
                  }}
                  tabIndex={0}
                >
                  {example.fileUrl === fileUrl && (
                    <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-blue-300"></div>
                  )}
                  <div
                    className={cx(
                      "relative z-10 rounded-lg border-3 border-black bg-white px-4 py-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
                      example.fileUrl === fileUrl ? "bg-blue-50" : ""
                    )}
                  >
                    <h1 className="font-bold">
                      Exemplo de Currículo {idx + 1}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                      {example.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <Paragraph>
              Você também pode{" "}
              <span className="font-semibold">
                adicionar seu currículo abaixo
              </span>{" "}
              para avaliar o quão bem ele seria analisado por Sistemas de
              Rastreamento de Candidatos (ATS) similares usados em processos
              seletivos. Quanto mais informações o sistema conseguir extrair,
              melhor indica que o currículo está bem formatado e fácil de ler. É
              essencial que pelo menos o nome e email sejam analisados com
              precisão.
            </Paragraph>
            <div className="mt-3">
              <ResumeDropzone
                onFileUrlChange={(fileUrl) => {
                  const newFileUrl = fileUrl || defaultFileUrl;
                  setFileUrl(newFileUrl);
                  // Rastreia quando usuário faz upload de um PDF próprio
                  if (
                    fileUrl &&
                    !RESUME_EXAMPLES.some((ex) => ex.fileUrl === fileUrl)
                  ) {
                    trackATSParserUsed("User Upload");
                  }
                }}
                playgroundView={true}
              />
            </div>
            <Heading level={2} className="!mt-[1.2em]">
              Resultados da Análise do Currículo
            </Heading>
            <ResumeTable resume={resume} />
            <ResumeParserAlgorithmArticle
              textItems={textItems}
              lines={lines}
              sections={sections}
            />
            <div className="pt-24" />
          </section>
        </div>
      </div>
    </main>
  );
}
