import { initialSettings, type Settings } from "@/app/lib/redux/settingsSlice";
import type { Resume } from "@/app/lib/redux/types";

export interface AtsCheck {
  id: string;
  label: string;
  points: number;
  maxPoints: number;
  suggestion: string;
}

export interface AtsReport {
  score: number;
  wordCount: number;
  checks: AtsCheck[];
  jobMatch: null | { score: number; matched: string[]; missing: string[]; keywords: string[] };
}

export const normalizeText = (text: string) =>
  text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

// Boundaries prevent false matches such as Java in JavaScript, or C in CSS.
export const containsTerm = (text: string, term: string) => {
  const escaped = normalizeText(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9+#])${escaped}(?=$|[^a-z0-9+#])`).test(normalizeText(text));
};

const STOP_WORDS = new Set(
  normalizeText(
    "a o as os e ou de da do das dos em na no nas nos para por com um uma uns umas ao aos " +
      "que se ser ter estar como mais sua seu suas seus nossa nosso voce nos sobre entre ate " +
      "experiencia conhecimento conhecimentos habilidade habilidades requisito requisitos " +
      "desejavel obrigatorio obrigatoria necessario necessaria vaga empresa equipe trabalho " +
      "profissional profissionais atividades responsabilidade responsabilidades buscamos " +
      "the a an and or of to in on with for from is are be have has you your we our " +
      "experience knowledge skills required requirements preferred role team work ability " +
      "will can must candidate candidates job description looking responsibilities " +
      "beneficios salario contratacao horario local remoto presencial hibrido oportunidade"
  ).split(/\s+/)
);

const PHRASES = [
  "gestão de projetos",
  "gestão de pessoas",
  "atendimento ao cliente",
  "análise de dados",
  "machine learning",
  "power bi",
  "ci/cd",
  "react native",
  "node.js",
  "next.js",
  "google analytics",
  "supply chain",
  "recursos humanos",
  "testes automatizados",
  "controle de qualidade",
  "segurança da informação",
  "sql server",
  "pacote office",
];

export const extractJobKeywords = (description: string): string[] => {
  const phrases = PHRASES.filter((term) => containsTerm(description, term));
  let remaining = normalizeText(description);
  for (const phrase of phrases) remaining = remaining.split(normalizeText(phrase)).join(" ");
  const frequencies = new Map<string, number>();
  for (const word of remaining.match(/[a-z][a-z0-9]*(?:[.+#/-][a-z0-9+#]+)*|c\+\+|c#/g) || []) {
    if (
      STOP_WORDS.has(word) ||
      (word.length < 3 && !["c", "c#", "go", "r", "bi", "ux", "ui", "ia"].includes(word))
    )
      continue;
    frequencies.set(word, (frequencies.get(word) || 0) + 1);
  }
  return [
    ...phrases,
    ...Array.from(frequencies)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word),
  ].slice(0, 40);
};

export function resumeToText(resume: Resume, settings: Settings = initialSettings): string {
  const join = (values: string[]) => values.filter((text) => text.trim()).join("\n");
  const sections = {
    workExperiences: resume.workExperiences
      .map((item) => join([item.company, item.jobTitle, item.date, ...item.descriptions]))
      .filter(Boolean)
      .join("\n\n"),
    educations: resume.educations
      .map((item) => join([item.school, item.degree, item.date, item.gpa, ...item.descriptions]))
      .filter(Boolean)
      .join("\n\n"),
    projects: resume.projects
      .map((item) => join([item.project, item.date, ...item.descriptions]))
      .filter(Boolean)
      .join("\n\n"),
    skills: join([
      ...resume.skills.featuredSkills.map((item) => item.skill),
      ...resume.skills.descriptions,
    ]),
    custom: join(resume.custom.descriptions),
  };
  return [
    resume.profile.name,
    resume.profile.role,
    [resume.profile.email, resume.profile.phone, resume.profile.location, resume.profile.url]
      .filter(Boolean)
      .join(" | "),
    resume.profile.summary && `RESUMO PROFISSIONAL\n${resume.profile.summary}`,
    ...settings.formsOrder
      .filter((form) => settings.formToShow[form] && sections[form])
      .map((form) => join([settings.formToHeading[form], sections[form]])),
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function analyzeResume(text: string, jobDescription = "", explicitKeywords = ""): AtsReport {
  const trimmed = text.trim();
  const normalized = normalizeText(trimmed);
  const words = trimmed.match(/[\p{L}\p{N}+#]+/gu) || [];
  const checks: AtsCheck[] = [];
  const add = (id: string, label: string, passed: boolean, maxPoints: number, suggestion: string) =>
    checks.push({ id, label, points: passed ? maxPoints : 0, maxPoints, suggestion });
  add(
    "text",
    "Texto extraível",
    words.length >= 30,
    20,
    "Use texto selecionável. PDFs digitalizados precisam de OCR. Inclua conteúdo suficiente para uma avaliação."
  );
  add(
    "email",
    "E-mail de contato",
    /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(trimmed),
    10,
    "Inclua um e-mail válido no início do currículo."
  );
  add(
    "phone",
    "Telefone de contato",
    /(?:\+\d{1,3}[\s.-]*)?(?:\(\d{2,3}\)|\d{2,3})[\s.-]*\d{4,5}[\s.-]*\d{4}\b/.test(trimmed),
    5,
    "Inclua telefone com DDD para facilitar o contato."
  );
  add(
    "summary",
    "Resumo ou objetivo identificado",
    /(?:^|\n)\s*(?:resumo(?: profissional)?|perfil(?: profissional)?|objetivos?|summary|profile|professional summary)\s*[:\n]/.test(
      normalized
    ),
    10,
    "Adicione um título padrão como Resumo profissional e descreva seu foco e suas competências."
  );
  add(
    "experience",
    "Experiência ou projetos identificados",
    /(?:^|\n)\s*(?:experiencias?(?: profissionais?| profissional)?|experience|work experience|employment|projetos?(?: destacados)?|projects?)\s*[:\n]/.test(
      normalized
    ),
    15,
    "Use Experiência profissional ou Projetos. Para primeiro emprego, inclua projetos e atividades relevantes."
  );
  add(
    "education",
    "Formação identificada",
    /(?:^|\n)\s*(?:formacao(?: academica)?|educacao|education|escolaridade|academic background)\s*[:\n]/.test(
      normalized
    ),
    10,
    "Inclua uma seção Formação acadêmica com instituição, curso e período."
  );
  add(
    "skills",
    "Habilidades identificadas",
    /(?:^|\n)\s*(?:habilidades?(?: tecnicas)?|competencias?(?: tecnicas)?|skills|technical skills|tecnologias?)\s*[:\n]/.test(
      normalized
    ),
    10,
    "Liste habilidades relevantes em texto, com um título padrão e sem depender de barras ou estrelas."
  );
  add(
    "dates",
    "Períodos identificados",
    /\b(?:19|20)\d{2}\b/.test(trimmed),
    5,
    "Inclua mês/ano nas experiências e na formação; indique Atual quando aplicável."
  );
  add(
    "impact",
    "Resultados concretos",
    /\d+(?:[.,]\d+)?\s*(?:%|clientes|usuarios|usuários|projetos|pessoas|horas|users|customers|projects)\b|\d+(?:[.,]\d+)?\s*%|R\$\s*\d/.test(
      trimmed
    ),
    10,
    "Descreva resultados verificáveis com números quando disponíveis. Exemplo: reduzi o tempo de atendimento em 20%. Não invente métricas."
  );
  add(
    "length",
    "Extensão objetiva",
    words.length >= 100 && words.length <= 1200,
    5,
    "Revise a extensão: cerca de 100 a 1.200 palavras é uma referência ampla, ajustável à sua carreira."
  );
  const keywords = explicitKeywords.trim()
    ? [
        ...new Map(
          explicitKeywords
            .split(/[,;\n]/)
            .map((term) => term.trim())
            .filter(Boolean)
            .map((term) => [normalizeText(term), term])
        ).values(),
      ].slice(0, 80)
    : extractJobKeywords(jobDescription);
  const matched = keywords.filter((term) => containsTerm(trimmed, term));
  const missing = keywords.filter((term) => !containsTerm(trimmed, term));
  return {
    score: trimmed ? Math.round(checks.reduce((sum, check) => sum + check.points, 0)) : 0,
    wordCount: words.length,
    checks,
    jobMatch: keywords.length
      ? { score: Math.round((matched.length / keywords.length) * 100), matched, missing, keywords }
      : null,
  };
}
