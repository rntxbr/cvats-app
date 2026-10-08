export type SectionKind = "summary" | "experience" | "education" | "skills" | "projects" | "custom";

export const normalizeHeading = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s*[:：]\s*$/, "");

const COMBINED =
  "(?:\\s+(?:e|and|&|/|\\|)\\s+(?:idiomas|languages|certificacoes(?: adicionais)?|certifications|cursos(?: complementares)?|courses|habilidades|skills))?";
const HEADINGS: [SectionKind, RegExp][] = [
  [
    "education",
    new RegExp(
      "^(?:formac(?:ao|oes)(?: academica| profissional| educacional)?|educac(?:ao|oes)|education|educational background|academic background|academic qualifications|escolaridade|ensino(?: superior| medio)?|graduacao|qualificacoes academicas)" +
        COMBINED +
        "$"
    ),
  ],
  [
    "experience",
    /^(?:experiencias?(?: profissionais?| profissional)?|experiencia de trabalho|experience|professional experience|work experience|employment(?: history)?|work history|career history|historico profissional|trajetoria profissional|carreira|atuacao profissional)$/,
  ],
  [
    "skills",
    /^(?:habilidades?(?: tecnicas)?|competencias?(?: tecnicas)?(?: principais)?|skills|technical skills|core skills|tecnologias?)(?: e ferramentas)?$/,
  ],
  [
    "summary",
    /^(?:resumo(?: profissional)?|perfil(?: profissional)?|objetivos?(?: profissionais?| profissional)?|summary|profile|professional summary|sobre(?: mim)?|apresentacao)$/,
  ],
  [
    "projects",
    /^(?:projetos?(?: destacados| pessoais| profissionais)?|projects?|personal projects|portfolio)$/,
  ],
  [
    "custom",
    /^(?:idiomas|languages|certificacoes(?: adicionais)?|certifications|cursos(?: complementares)?|courses|informacoes adicionais|additional information|interesses|interests|voluntariado|volunteering|publicacoes|publications|premios|awards|honors|referencias|references|secao personalizada)$/,
  ],
];

/** Match the entire heading, so a company name or a sentence does not become a section. */
export function getSectionKind(text: string): SectionKind | undefined {
  const normalized = normalizeHeading(text);
  return HEADINGS.find(([, pattern]) => pattern.test(normalized))?.[0];
}
