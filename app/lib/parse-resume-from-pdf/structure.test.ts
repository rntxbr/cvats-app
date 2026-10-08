import { extractResumeFromSections } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { groupLinesIntoSections } from "@/app/lib/parse-resume-from-pdf/group-lines-into-sections";
import type { Line, Lines } from "@/app/lib/parse-resume-from-pdf/types";

const line = (text: string, y: number, bold = false, page = 1): Line => [
  {
    text,
    x: 40,
    y,
    width: 200,
    height: 11,
    fontName: bold ? "Arial-BoldMT" : "ArialMT",
    hasEOL: true,
    page,
  },
];

test("combined education with inline bullet records keeps courses, periods and additional information", () => {
  const heading = [...line("Formação", 500, true), ...line("Acadêmica e Idiomas", 500, true)];
  const sections = groupLinesIntoSections([
    line("Pessoa Exemplo", 600),
    line("Cargo", 580),
    heading,
    line(
      "● MBA em Gestão em Tecnologia da Informação – Centro Educacional Alfa (Ago 2015 – Out 2017).",
      474
    ),
    line(
      "● Tecnologia em Análise e Desenvolvimento de Sistemas – Centro Educacional Alfa (Fev 2011 – Jul 2014).",
      460
    ),
    line("● Idiomas: Inglês (CEFR B1-B2) | Espanhol (Básico).", 446),
    line("● Certificações Adicionais: ITIL Foundation e Cloud Computing Foundation.", 432),
  ]);
  const resume = extractResumeFromSections(sections);
  expect(resume.educations).toHaveLength(2);
  expect(resume.educations[0]).toMatchObject({
    degree: "MBA em Gestão em Tecnologia da Informação",
    school: "Centro Educacional Alfa",
    date: "Ago 2015 – Out 2017",
  });
  expect(resume.educations[1]).toMatchObject({ date: "Fev 2011 – Jul 2014" });
  expect(resume.custom.descriptions.join(" ")).toContain("Idiomas:");
  expect(resume.custom.descriptions.join(" ")).toContain("ITIL Foundation");
  expect(resume.workExperiences).toHaveLength(0);
});

test("three-line work headers and gaps before bullets do not produce blank records", () => {
  const lines: Lines = [
    line("Pessoa Exemplo", 800),
    line("Cargo", 780),
    line("Experiência Profissional", 750, true),
  ];
  ["EMPRESA ALFA", "Empresa Beta", "Empresa Gama", "Empresa Delta", "Empresa Épsilon"].forEach(
    (company, index) => {
      const page = index === 4 ? 2 : 1;
      const top = index === 4 ? 800 : 720 - index * 130;
      lines.push(
        line(company, top, true, page),
        line("Senior Frontend Developer", top - 17, false, page),
        line("Julho 2024 – Novembro 2025", top - 34, false, page),
        line("● Implementei sistemas de alta disponibilidade com a equipe.", top - 61, false, page),
        line("● Melhorei o desempenho das aplicações.", top - 76, false, page)
      );
    }
  );
  lines.push(
    line(
      "(Experiências anteriores incluem posições como Frontend Developer na Empresa Zeta e desenvolvimento de aplicações.)",
      670,
      false,
      2
    )
  );
  const resume = extractResumeFromSections(groupLinesIntoSections(lines));
  expect(resume.workExperiences).toHaveLength(5);
  expect(resume.workExperiences.map((item) => item.company)).toEqual([
    "EMPRESA ALFA",
    "Empresa Beta",
    "Empresa Gama",
    "Empresa Delta",
    "Empresa Épsilon",
  ]);
  for (const work of resume.workExperiences) {
    expect(work.jobTitle).toBe("Senior Frontend Developer");
    expect(work.date).toBe("Julho 2024 – Novembro 2025");
    expect(work.descriptions.join(" ")).toContain("Implementei sistemas");
  }
  expect(resume.workExperiences[4].descriptions.join(" ")).toContain("Empresa Zeta");
});

test("course-only headings stay as additional information rather than fake degrees", () => {
  const resume = extractResumeFromSections({
    "Cursos Complementares": [line("Curso de SQL", 100)],
  });
  expect(resume.educations).toEqual([]);
  expect(resume.custom.descriptions).toContain("Curso de SQL");
});
