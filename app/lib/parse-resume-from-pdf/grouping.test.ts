import { extractResumeFromSections } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { groupLinesIntoSections } from "@/app/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupTextItemsIntoLines } from "@/app/lib/parse-resume-from-pdf/group-text-items-into-lines";
import type { TextItem } from "@/app/lib/parse-resume-from-pdf/types";

const item = (text: string, y = 100, page = 1): TextItem => ({
  text,
  x: 0,
  y,
  width: 100,
  height: 12,
  fontName: "Roboto",
  hasEOL: true,
  page,
});
test("coordinates and page boundaries separate lines when EOL is absent", () => {
  expect(
    groupTextItemsIntoLines([
      { ...item("A", 100), hasEOL: false },
      { ...item("B", 80), hasEOL: false },
      item("C", 80, 2),
    ]).map((line) => line[0].text)
  ).toEqual(["A", "B", "C"]);
});
test("repeated section headings preserve both pages", () => {
  const sections = groupLinesIntoSections(
    ["Maria Silva", "maria@example.com", "HABILIDADES", "SQL", "HABILIDADES", "Excel"].map(
      (text) => [item(text)]
    )
  );
  expect(sections.HABILIDADES.map((line) => line[0].text)).toEqual(["SQL", "Excel"]);
});
test("profile does not mistake a city or summary for a role", () => {
  const resume = extractResumeFromSections({
    profile: [[item("Maria Silva")], [item("São Paulo, SP")], [item("maria@example.com")]],
  });
  expect(resume.profile.role).toBe("");
  expect(resume.profile.email).toBe("maria@example.com");
});

test("summary stays outside work experience and certifications are preserved", () => {
  const resume = extractResumeFromSections({
    profile: [[item("Maria Silva")]],
    "RESUMO PROFISSIONAL": [[item("Analista com experiência em relatórios e automação")]],
    CERTIFICAÇÕES: [[item("Certificação SQL - 2025")]],
  });
  expect(resume.workExperiences).toEqual([]);
  expect(resume.custom.descriptions).toContain("Certificação SQL - 2025");
});
