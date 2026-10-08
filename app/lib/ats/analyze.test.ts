import {
  analyzeResume,
  containsTerm,
  extractJobKeywords,
  resumeToText,
} from "@/app/lib/ats/analyze";
import { cleanResume } from "@/app/lib/ats/clean-resume";
import { initialResumeState } from "@/app/lib/redux/resumeSlice";
import { initialSettings } from "@/app/lib/redux/settingsSlice";

test("empty input is zero, with no fabricated job coverage", () => {
  expect(analyzeResume("").score).toBe(0);
  expect(analyzeResume("").jobMatch).toBeNull();
  expect(analyzeResume("", "", "SQL").jobMatch?.score).toBe(0);
});

test("compound headings, accent variants and PDF spacing are recognized", () => {
  const report = analyzeResume(
    "Formação  Acadêmica  e  Idiomas:\nMBA em Gestão – Instituto Alfa (2015 - 2017)\nCompetências  Técnicas  Principais\nSQL e React"
  );
  expect(report.checks.find((check) => check.id === "education")?.points).toBe(10);
  expect(report.checks.find((check) => check.id === "skills")?.points).toBe(10);
  expect(
    analyzeResume("formaçào acadêmica").checks.find((check) => check.id === "education")?.points
  ).toBe(10);
  expect(
    analyzeResume("Minha formação acadêmica foi em 2017").checks.find(
      (check) => check.id === "education"
    )?.points
  ).toBe(0);
});
test("exact boundaries, accents and technical punctuation are preserved", () => {
  expect(containsTerm("JavaScript, C++, C#, gestão de projetos, Node.js", "Java")).toBe(false);
  expect(containsTerm("JavaScript CSS", "C")).toBe(false);
  for (const term of ["C++", "C#", "gestao de projetos", "node.js"])
    expect(containsTerm("C++ C# Gestão de projetos Node.js", term)).toBe(true);
});
test("manual keywords override extraction, deduplicate and report missing terms", () => {
  const match = analyzeResume(
    "Conheço SQL e React",
    "Precisa de Java",
    "SQL, React; Java\nSQL"
  ).jobMatch;
  expect(match?.score).toBe(67);
  expect(match?.matched).toEqual(["SQL", "React"]);
  expect(match?.missing).toEqual(["Java"]);
});
test("complete content earns all disclosed points", () => {
  const text = `Maria Silva\nmaria@example.com\n(11) 99876-5432\nRESUMO PROFISSIONAL\n${"Profissional qualificada em desenvolvimento de sistemas. ".repeat(16)}\nEXPERIÊNCIA PROFISSIONAL\nEmpresa, 2023 - Atual\nReduzi custos em 20%\nFORMAÇÃO ACADÊMICA\nCurso, 2022\nHABILIDADES\nSQL e React`;
  const report = analyzeResume(text);
  expect(report.score).toBe(100);
  expect(report.checks.reduce((sum, check) => sum + check.maxPoints, 0)).toBe(100);
});
test("job extraction keeps relevant phrases and drops common filler", () => {
  const terms = extractJobKeywords(
    "Buscamos experiência com gestão de projetos, Power BI e SQL. SQL obrigatório."
  );
  expect(terms).toContain("gestão de projetos");
  expect(terms).toContain("sql");
  expect(terms).not.toContain("experiencia");
});
test("hidden and empty sections do not inflate the assessment or exports", () => {
  const resume = structuredClone(initialResumeState);
  resume.profile.name = "Maria";
  resume.workExperiences[0].company = "Hidden Company";
  const settings = structuredClone(initialSettings);
  settings.formToShow.workExperiences = false;
  const cleaned = cleanResume(resume, settings);
  expect(cleaned.educations).toEqual([]);
  expect(resumeToText(cleaned)).toBe("Maria");
});

test("custom headings and section order match the exported content", () => {
  const resume = structuredClone(initialResumeState);
  resume.skills.descriptions = ["SQL"];
  const settings = structuredClone(initialSettings);
  settings.formToHeading.skills = "Ferramentas";
  const text = resumeToText(resume, settings);
  expect(text).toBe("Ferramentas\nSQL");
  expect(analyzeResume(text).checks.find((check) => check.id === "skills")?.points).toBe(0);
});

test("manual keyword duplicates ignore case and accents", () => {
  expect(
    analyzeResume("SQL gestão", "", "SQL, sql, gestão, gestao").jobMatch?.keywords
  ).toHaveLength(2);
});
