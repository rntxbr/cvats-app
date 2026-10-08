import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Font, renderToFile } from "@react-pdf/renderer";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { END_HOME_RESUME } from "@/app/home/constants";
import { extractResumeFromSections } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { groupLinesIntoSections } from "@/app/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupTextItemsIntoLines } from "@/app/lib/parse-resume-from-pdf/group-text-items-into-lines";
import type { TextItems } from "@/app/lib/parse-resume-from-pdf/types";
import { initialSettings } from "@/app/lib/redux/settingsSlice";
import { ResumePDF } from "@/components/Resume/ResumePDF";

Font.register({
  family: "Roboto",
  fonts: [
    { src: resolve("public/fonts/Roboto-Regular.ttf") },
    { src: resolve("public/fonts/Roboto-Bold.ttf"), fontWeight: "bold" },
  ],
});
Font.registerHyphenationCallback((word) => [word]);
const resume = structuredClone(END_HOME_RESUME);
resume.profile.name = "Érica d'Ávila Ferreira";
resume.skills.featuredSkills[0] = { skill: "C++ e Gestão de projetos", rating: 5 };
resume.workExperiences[0].descriptions.push("Marcador de atualização: resultado novo em 2026.");
for (let index = 0; index < 12; index++)
  resume.workExperiences.push({
    company: `Empresa de teste ${index}`,
    jobTitle: "Analista de Sistemas",
    date: "2020 - 2026",
    descriptions: [
      "Entreguei melhorias de desempenho em sistemas e reduzi custos em 25% com a equipe.",
      "Planejei e implementei processos com documentação e acompanhamento de resultados.",
    ],
  });
for (const template of ["classic", "minimal", "executive"]) {
  const filename = resolve(`tmp/pdfs/roundtrip-${template}.pdf`);
  await renderToFile(
    <ResumePDF resume={resume} settings={{ ...initialSettings, template }} isPDF />,
    filename
  );
  const loadingTask = getDocument({
    data: new Uint8Array(await readFile(filename)),
    useSystemFonts: true,
    fontExtraProperties: true,
  });
  const pdf = await loadingTask.promise;
  try {
    assert.ok(pdf.numPages >= 2, "long resumes must wrap across pages");
    const items: TextItems = [];
    for (let number = 1; number <= pdf.numPages; number++) {
      const page = await pdf.getPage(number);
      const content = await page.getTextContent();
      await page.getOperatorList();
      for (const item of content.items) {
        if (!("str" in item)) continue;
        const font = page.commonObjs.has(item.fontName) ? page.commonObjs.get(item.fontName) : null;
        items.push({
          text: item.str,
          x: item.transform[4],
          y: item.transform[5],
          width: item.width,
          height: item.height,
          fontName:
            typeof font?.name === "string"
              ? font.name
              : content.styles[item.fontName]?.fontFamily || item.fontName,
          hasEOL: item.hasEOL,
          page: number,
        });
        assert.ok(item.transform[5] >= 30, "text must respect bottom page margins");
      }
    }
    const lines = groupTextItemsIntoLines(items);
    const text = lines.map((line) => line.map((item) => item.text).join(" ")).join("\n");
    for (const expected of [
      resume.profile.name,
      resume.profile.email,
      "EXPERIÊNCIA PROFISSIONAL",
      "HABILIDADES",
      "C++ e Gestão de projetos",
      "Marcador de atualização",
      "Empresa de teste 11",
    ])
      assert.ok(text.includes(expected), `missing extractable text: ${expected}`);
    const parsed = extractResumeFromSections(groupLinesIntoSections(lines));
    await writeFile(`tmp/pdfs/extracted-${template}.txt`, text);
    await writeFile(
      `tmp/pdfs/parsed-${template}.json`,
      JSON.stringify({ parsed, sections: groupLinesIntoSections(lines) }, null, 2)
    );
    assert.equal(parsed.profile.email, resume.profile.email);
    assert.ok(
      [...parsed.skills.descriptions, ...parsed.skills.featuredSkills.map((item) => item.skill)]
        .join(" ")
        .includes("Gestão de projetos")
    );
    assert.equal(
      parsed.educations.length,
      1,
      "education must not absorb employers named Universidade"
    );
    assert.ok(
      parsed.educations[0].degree.startsWith("Bacharelado"),
      "degree must not come from a bullet point"
    );
    assert.equal(
      parsed.workExperiences.length,
      resume.workExperiences.length,
      "summary must not create an extra experience"
    );
    console.log(
      `PDF ${template} roundtrip passed: ${pdf.numPages} pages, accents, skills, updated content and margins verified.`
    );
  } finally {
    await loadingTask.destroy();
  }
}
