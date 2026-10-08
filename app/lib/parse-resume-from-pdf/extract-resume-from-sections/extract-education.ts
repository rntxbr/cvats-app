import {
  BULLET_POINTS,
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";
import {
  DATE_FEATURE_SETS,
  hasComma,
  hasLetter,
  hasNumber,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { getTextWithHighestFeatureScore } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import { getSectionLinesByKeywords } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import { divideSectionIntoSubsections } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/subsections";
import type {
  FeatureSet,
  ResumeSectionToLines,
  TextItem,
  TextScores,
} from "@/app/lib/parse-resume-from-pdf/types";
import type { ResumeEducation } from "@/app/lib/redux/types";
import { getSectionKind, normalizeHeading } from "@/app/lib/resume-headings";

/**
 *              Unique Attribute
 * School       Has school
 * Degree       Has degree
 * GPA          Has number
 */

// prettier-ignore
const SCHOOLS = [
  "College",
  "University",
  "Institute",
  "School",
  "Academy",
  "BASIS",
  "Magnet",
  "Universidade",
  "Faculdade",
  "Instituto",
  "Escola",
  "Centro Universitário",
  "Centro Universitario",
  "UFABC",
  "UFSC",
  "UFRJ",
  "USP",
  "UNICAMP",
  "UFMG",
  "UFRGS",
  "UFBA",
  "UFPE",
  "UFC",
  "UFPR",
  "UFF",
  "UFES",
  "UFPA",
  "UFCE",
  "UFGO",
  "UFMS",
  "UFMT",
  "UFAM",
  "UFPB",
  "UFPI",
  "UFAL",
  "UFS",
  "UFU",
  "UFV",
  "UFJF",
  "UFPEL",
  "UFSM",
  "UFRN",
  "UFMA",
  "UNIFESP",
  "UNB",
  "PUC",
  "PUCRS",
  "PUCSP",
  "PUC-Rio",
  "PUC-RJ",
  "PUC-MG",
];
const hasSchool = (item: TextItem) =>
  SCHOOLS.some((school) => normalizeHeading(item.text).includes(normalizeHeading(school)));
// prettier-ignore
const DEGREES = [
  "Associate",
  "Bachelor",
  "Master",
  "PhD",
  "Ph.",
  "Bacharel",
  "Bacharelado",
  "Licenciado",
  "Licenciatura",
  "Tecnologo",
  "Tecnólogo",
  "Tecnica",
  "Técnica",
  "Tecnico",
  "Técnico",
  "Tecnologia",
  "Especializacao",
  "Especialização",
  "MBA",
  "Mestrado",
  "Doutorado",
  "Pos-Graduacao",
  "Pós-Graduação",
  "Engenharia",
  "Medicina",
  "Direito",
  "Administracao",
  "Administração",
  "Contabilidade",
  "Psicologia",
  "Pedagogia",
  "Letras",
  "Historia",
  "História",
  "Geografia",
  "Matematica",
  "Matemática",
  "Fisica",
  "Física",
  "Quimica",
  "Química",
  "Biologia",
  "Computacao",
  "Computação",
  "Sistemas",
  "Informatica",
  "Informática",
  "Analise",
  "Análise",
  "Ciência",
  "Ciencia",
];
const hasDegree = (item: TextItem) => {
  const text = item.text;
  // Check if any degree keyword is in the text
  if (DEGREES.some((degree) => normalizeHeading(text).includes(normalizeHeading(degree))))
    return true;
  // Match abbreviations like AA, B.S., MBA, etc.
  if (/[ABM][A-Z.]/.test(text)) return true;
  // Match common Brazilian degree patterns like "Engenharia de X", "Ciência da X"
  if (
    /^(Engenharia|Ciencia|Ciência|Analise|Análise|Sistemas|Administração|Administracao)\s+(da|de|do|dos|das)?\s*[\p{L}\s-]+$/iu.test(
      text
    )
  )
    return true;
  return false;
};
const matchGPA = (item: TextItem) => item.text.match(/[0-9]{1,2}[.,]\d{1,2}/);
const matchGrade = (item: TextItem) => {
  const normalized = item.text.replace(",", ".");
  const grade = parseFloat(normalized);
  if (Number.isFinite(grade) && grade <= 110) {
    return [String(grade)] as RegExpMatchArray;
  }
  return null;
};

const SCHOOL_FEATURE_SETS: FeatureSet[] = [
  [hasSchool, 4],
  [hasDegree, -3], // Reduced penalty - some schools might have degree-like names
  [hasNumber, -2], // Reduced penalty - years might appear near school name
];

const DEGREE_FEATURE_SETS: FeatureSet[] = [
  [hasDegree, 4],
  [hasSchool, -3], // Reduced penalty - degree might mention school
  [hasNumber, -2], // Reduced penalty - years might appear near degree
];

const GPA_FEATURE_SETS: FeatureSet[] = [
  [matchGPA, 4, true],
  [matchGrade, 3, true],
  [hasComma, -3],
  [hasLetter, -4],
];

export const extractEducation = (sections: ResumeSectionToLines) => {
  const educations: ResumeEducation[] = [];
  const educationsScores: {
    schoolScores: TextScores;
    degreeScores: TextScores;
    gpaScores: TextScores;
    dateScores: TextScores;
  }[] = [];
  const educationExtras: string[] = [];
  const lines = Object.entries(sections)
    .filter(([heading]) => getSectionKind(heading) === "education")
    .flatMap(([, lines]) => lines);

  // Bullet-list education is a list of records, not a school's activity descriptions.
  const firstText =
    lines[0]
      ?.map((item) => item.text)
      .join(" ")
      .trim() || "";
  if (BULLET_POINTS.some((bullet) => firstText.startsWith(bullet))) {
    const bullets = getBulletPointsFromLines(lines);
    const records = bullets.map(parseInlineEducation);
    if (records.some(Boolean)) {
      records.forEach((record, index) => {
        if (record) educations.push(record);
        else educationExtras.push(bullets[index]);
      });
      return { educations, educationsScores, educationExtras };
    }
  }
  const subsections = divideSectionIntoSubsections(lines);
  for (const subsectionLines of subsections) {
    const descriptionsLineIdx = getDescriptionsLineIdx(subsectionLines);
    const textItems = subsectionLines
      .slice(0, descriptionsLineIdx ?? subsectionLines.length)
      .flat();
    // For school, don't require positive score - accept any match
    const [school, schoolScores] = getTextWithHighestFeatureScore(
      textItems,
      SCHOOL_FEATURE_SETS,
      false
    );
    // For degree, don't require positive score - accept any match
    const [degree, degreeScores] = getTextWithHighestFeatureScore(
      textItems,
      DEGREE_FEATURE_SETS,
      false
    );
    const [gpa, gpaScores] = getTextWithHighestFeatureScore(textItems, GPA_FEATURE_SETS);
    const [date, dateScores] = getTextWithHighestFeatureScore(textItems, DATE_FEATURE_SETS);

    let descriptions: string[] = [];
    if (descriptionsLineIdx !== undefined) {
      const descriptionsLines = subsectionLines.slice(descriptionsLineIdx);
      descriptions = getBulletPointsFromLines(descriptionsLines);
    }

    if (!school && !degree) {
      educationExtras.push(...descriptions);
      continue;
    }
    educations.push({ school, degree, gpa, date, descriptions });
    educationsScores.push({
      schoolScores,
      degreeScores,
      gpaScores,
      dateScores,
    });
  }

  if (educations.length !== 0) {
    const coursesLines = getSectionLinesByKeywords(sections, [
      "course",
      "courses",
      "curso",
      "cursos",
    ]);
    if (coursesLines.length !== 0) {
      educations[0].descriptions.push(
        "Courses: " +
          coursesLines
            .flat()
            .map((item) => item.text)
            .join(" ")
      );
    }
  }

  return {
    educations,
    educationsScores,
    educationExtras,
  };
};

function parseInlineEducation(text: string): ResumeEducation | undefined {
  const parts = text.match(/^(.+?)\s+[–—|-]\s+(.+)$/u);
  if (
    !parts ||
    !hasDegree({ text: parts[1] } as TextItem) ||
    /^(?:idiomas|certifica)/i.test(normalizeHeading(text))
  )
    return;
  const date = parts[2].match(/\(([^()]*(?:19|20)\d{2}[^()]*)\)\s*\.?$/u);
  const school = (date ? parts[2].slice(0, date.index) : parts[2]).trim().replace(/\.$/, "");
  if (!school) return;
  return {
    degree: parts[1].trim(),
    school,
    date: date?.[1].trim() || "",
    gpa: "",
    descriptions: [],
  };
}
