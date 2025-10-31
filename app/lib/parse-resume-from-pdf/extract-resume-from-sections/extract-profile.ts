import {
  hasComma,
  hasLetter,
  hasLetterAndIsAllUpperCase,
  hasNumber,
  isBold,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { getTextWithHighestFeatureScore } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import { getSectionLinesByKeywords } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import type {
  FeatureSet,
  ResumeSectionToLines,
  TextItem,
} from "@/app/lib/parse-resume-from-pdf/types";

// Name (pt-BR): aceita letras unicode com acento, espaços, ponto, hífen e apóstrofo
// Exige no mínimo 7 caracteres úteis (desconsiderando espaços, ponto, apóstrofo e hífen) para evitar capturar UFs/abreviações
export const matchOnlyLetterSpaceOrPeriod = (item: TextItem) => {
  const normalized = item.text.replace(/[\s.'-]/g, "");
  if (normalized.length < 7) return null;
  return item.text.match(/^[\p{L}\p{M}\s.'-]+$/u);
};

// Email
// Simple email regex: xxx@xxx.xxx (xxx = anything not space)
export const matchEmail = (item: TextItem) => item.text.match(/\S+@\S+\.\S+/);
const hasAt = (item: TextItem) => item.text.includes("@");

// Phone (pt-BR)
// Suporta: opcional +55, DDD (2 dígitos), celular pode ter 9, separadores variados
export const matchPhone = (item: TextItem) =>
  item.text.match(/^(?:\+?55[\s-]?)?(?:\(?\d{2}\)?[\s-]?)?(?:9?\d{4}[\s-]?\d{4})$/);
const hasParenthesis = (item: TextItem) => /\(\d{2}\)/.test(item.text);

// Location (pt-BR)
// "Cidade - UF", "Cidade, UF" ou "Cidade, Estado" (com acentos)
const UFs = new Set([
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]);
export const matchCityAndState = (item: TextItem) => {
  const m = item.text.match(/^[\p{L}\p{M}\s.'-]+(?:\s*[-,]\s*)([A-Z]{2}|[\p{L}\p{M}\s.'-]+)$/u);
  if (!m) return null;
  const tail = m[1];
  if (tail.length === 2) return UFs.has(tail) ? m : null;
  return m; // Estado por extenso
};

// Url (permite TLDs de 2+ letras)
export const matchUrl = (item: TextItem) => item.text.match(/\S+\.[a-z]{2,}\/\S+/i);
// Match https://xxx.xxx where s is optional
const matchUrlHttpFallback = (item: TextItem) => item.text.match(/https?:\/\/\S+\.\S+/);
// Match www.xxx.xxx
const matchUrlWwwFallback = (item: TextItem) => item.text.match(/www\.\S+\.\S+/);
const hasSlash = (item: TextItem) => item.text.includes("/");

// Summary
const has4OrMoreWords = (item: TextItem) => item.text.split(" ").length >= 4;

/**
 *              Unique Attribute
 * Name         Bold or Has all uppercase letter
 * Email        Has @
 * Phone        Has ()
 * Location     Has ,    (overlap with summary)
 * Url          Has slash
 * Summary      Has 4 or more words
 */

/**
 * Name -> contains only letters/space/period, e.g. Leonardo W. DiCaprio
 *         (it isn't common to include middle initial in resume)
 *      -> is bolded or has all letters as uppercase
 */
const NAME_FEATURE_SETS: FeatureSet[] = [
  [matchOnlyLetterSpaceOrPeriod, 3, true],
  [isBold, 2],
  [hasLetterAndIsAllUpperCase, 2],
  // Match against other unique attributes
  [hasAt, -4], // Email
  [hasNumber, -4], // Phone
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -2], // Summary
];

// Email -> match email regex xxx@xxx.xxx
const EMAIL_FEATURE_SETS: FeatureSet[] = [
  [matchEmail, 4, true],
  [isBold, -1], // Name
  [hasLetterAndIsAllUpperCase, -1], // Name
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -4], // Summary
];

// Phone -> match phone regex (xxx)-xxx-xxxx
const PHONE_FEATURE_SETS: FeatureSet[] = [
  [matchPhone, 4, true],
  [hasLetter, -4], // Name, Email, Location, Url, Summary
];

// Location -> match location regex <City>, <ST>
const LOCATION_FEATURE_SETS: FeatureSet[] = [
  [matchCityAndState, 4, true],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [hasSlash, -4], // Url
];

// URL -> match url regex xxx.xxx/xxx
const URL_FEATURE_SETS: FeatureSet[] = [
  [matchUrl, 4, true],
  [matchUrlHttpFallback, 3, true],
  [matchUrlWwwFallback, 3, true],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [hasComma, -4], // Location
  [has4OrMoreWords, -4], // Summary
];

// Summary -> has 4 or more words
const SUMMARY_FEATURE_SETS: FeatureSet[] = [
  [has4OrMoreWords, 4],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [matchCityAndState, -4, false], // Location
];

export const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();

  const [name, nameScores] = getTextWithHighestFeatureScore(textItems, NAME_FEATURE_SETS);
  const [email, emailScores] = getTextWithHighestFeatureScore(textItems, EMAIL_FEATURE_SETS);
  const [phone, phoneScores] = getTextWithHighestFeatureScore(textItems, PHONE_FEATURE_SETS);
  const [location, locationScores] = getTextWithHighestFeatureScore(
    textItems,
    LOCATION_FEATURE_SETS
  );
  const [url, urlScores] = getTextWithHighestFeatureScore(textItems, URL_FEATURE_SETS);
  const [summary, summaryScores] = getTextWithHighestFeatureScore(
    textItems,
    SUMMARY_FEATURE_SETS,
    undefined,
    true
  );

  const summaryLines = getSectionLinesByKeywords(sections, [
    "summary",
    "resumo",
    "sobre",
    "perfil",
    "apresentação",
    "apresentacao",
  ]);
  const summarySection = summaryLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");
  const objectiveLines = getSectionLinesByKeywords(sections, [
    "objective",
    "objetivo",
    "objetivos",
  ]);
  const objectiveSection = objectiveLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");

  return {
    profile: {
      name,
      role: "",
      email,
      phone,
      location,
      url,
      // Dedicated section takes higher precedence over profile summary
      summary: summarySection || objectiveSection || summary,
    },
    // For debugging
    profileScores: {
      name: nameScores,
      email: emailScores,
      phone: phoneScores,
      location: locationScores,
      url: urlScores,
      summary: summaryScores,
    },
  };
};
