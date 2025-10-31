import {
  hasLetterAndIsAllUpperCase,
  hasOnlyLettersSpacesAmpersands,
  isBold,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import type { Line, Lines, ResumeSectionToLines } from "@/app/lib/parse-resume-from-pdf/types";
import type { ResumeKey } from "@/app/lib/redux/types";

export const PROFILE_SECTION: ResumeKey = "profile";

/**
 * Step 3. Group lines into sections
 *
 * Every section (except the profile section) starts with a section title that
 * takes up the entire line. This is a common pattern not just in resumes but
 * also in books and blogs. The resume parser uses this pattern to group lines
 * into the closest section title above these lines.
 */
export const groupLinesIntoSections = (lines: Lines) => {
  const sections: ResumeSectionToLines = {};
  let sectionName: string = PROFILE_SECTION;
  let sectionLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = line[0]?.text.trim();
    if (isSectionTitle(line, i)) {
      sections[sectionName] = [...sectionLines];
      sectionName = text;
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }
  if (sectionLines.length > 0) {
    sections[sectionName] = [...sectionLines];
  }
  return sections;
};

const SECTION_TITLE_PRIMARY_KEYWORDS = [
  "experience",
  "experiencia",
  "experiência",
  "education",
  "educacao",
  "educação",
  "educacoes",
  "educações",
  "formacao",
  "formação",
  "formacoes",
  "formaçoes",
  "escolaridade",
  "academico",
  "acadêmico",
  "academica",
  "acadêmica",
  "ensino",
  "graduacao",
  "graduação",
  "project",
  "projeto",
  "projetos",
  "skill",
  "skills",
  "habilidade",
  "habilidades",
  "competencia",
  "competência",
  "competencias",
  "competências",
];
const SECTION_TITLE_SECONDARY_KEYWORDS = [
  "job",
  "work",
  "career",
  "profissional",
  "experiencias profissionais",
  "course",
  "cursos",
  "extracurricular",
  "objective",
  "objetivo",
  "objetivos",
  "summary", // LinkedIn generated resume has a summary section
  "resumo",
  "sobre",
  "perfil",
  "apresentacao",
  "apresentação",
  "award",
  "premio",
  "prêmio",
  "honor",
  "honra",
  "project",
  "projeto",
  "projetos",
  "universidade",
  "faculdade",
  "instituicao",
  "instituição",
];
const SECTION_TITLE_KEYWORDS = [
  ...SECTION_TITLE_PRIMARY_KEYWORDS,
  ...SECTION_TITLE_SECONDARY_KEYWORDS,
];
const normalizeForKeyword = (value: string) =>
  value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const SECTION_TITLE_KEYWORDS_NORMALIZED = SECTION_TITLE_KEYWORDS.map(normalizeForKeyword);

const isSectionTitle = (line: Line, lineNumber: number) => {
  const isFirstTwoLines = lineNumber < 2;
  const hasMoreThanOneItemInLine = line.length > 1;
  const hasNoItemInLine = line.length === 0;
  if (isFirstTwoLines || hasMoreThanOneItemInLine || hasNoItemInLine) {
    return false;
  }

  const textItem = line[0];

  // The main heuristic to determine a section title is to check if the text is double emphasized
  // to be both bold and all uppercase, which is generally true for a well formatted resume
  if (isBold(textItem) && hasLetterAndIsAllUpperCase(textItem)) {
    return true;
  }

  // The following is a fallback heuristic to detect section title if it includes a keyword match
  // (This heuristics is not well tested and may not work well)
  const text = textItem.text.trim();
  const words = text.split(" ").filter((s) => s !== "&");
  const textHasAtMost3Words = words.length <= 3; // Allow up to 3 words for "FORMAÇÃO ACADÊMICA"
  const startsWithCapitalLetter = /\p{Lu}/u.test(text.slice(0, 1));
  const normalizedText = normalizeForKeyword(text);

  if (
    textHasAtMost3Words &&
    hasOnlyLettersSpacesAmpersands(textItem) &&
    startsWithCapitalLetter &&
    SECTION_TITLE_KEYWORDS_NORMALIZED.some((keyword) => normalizedText.includes(keyword))
  ) {
    return true;
  }

  return false;
};
