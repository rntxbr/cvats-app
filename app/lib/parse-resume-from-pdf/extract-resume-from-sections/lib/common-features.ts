import type { FeatureSet, TextItem } from "@/app/lib/parse-resume-from-pdf/types";

const isTextItemBold = (fontName: string) => fontName.toLowerCase().includes("bold");
export const isBold = (item: TextItem) => isTextItemBold(item.fontName);
export const hasLetter = (item: TextItem) => /\p{L}/u.test(item.text);
export const hasNumber = (item: TextItem) => /[0-9]/.test(item.text);
export const hasComma = (item: TextItem) => item.text.includes(",");
export const getHasText = (text: string) => (item: TextItem) => item.text.includes(text);
export const hasOnlyLettersSpacesAmpersands = (item: TextItem) =>
  /^[\p{L}\p{M}\s&]+$/u.test(item.text);
export const hasLetterAndIsAllUpperCase = (item: TextItem) =>
  hasLetter(item) && item.text.toUpperCase() === item.text;

// Date Features
const hasYear = (item: TextItem) => /(?:19|20)\d{2}/.test(item.text);
const MONTHS_EN = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "marco",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const hasMonth = (item: TextItem) => {
  const text = item.text.toLowerCase();
  const matchEnglish = MONTHS_EN.some(
    (month) =>
      text.includes(month) || text.includes(month.slice(0, 4)) || text.includes(month.slice(0, 3))
  );
  const matchPortuguese = MONTHS_PT.some((month) => {
    const base = month.normalize("NFD").replace(/\p{M}/gu, "");
    const normalizedText = text.normalize("NFD").replace(/\p{M}/gu, "");
    return (
      normalizedText.includes(base) ||
      normalizedText.includes(base.slice(0, Math.min(4, base.length))) ||
      normalizedText.includes(base.slice(0, Math.min(3, base.length)))
    );
  });
  return matchEnglish || matchPortuguese;
};
const SEASONS_EN = ["summer", "fall", "spring", "winter"];
const SEASONS_PT = ["verão", "verao", "outono", "primavera", "inverno"];
const hasSeason = (item: TextItem) => {
  const text = item.text.toLowerCase();
  const normalizedText = text.normalize("NFD").replace(/\p{M}/gu, "");
  return (
    SEASONS_EN.some((season) => text.includes(season)) ||
    SEASONS_PT.some((season) => {
      const base = season.normalize("NFD").replace(/\p{M}/gu, "");
      return normalizedText.includes(base);
    })
  );
};
const PRESENT_KEYWORDS = [
  "present",
  "current",
  "ongoing",
  "até agora",
  "até o momento",
  "atuais",
  "atual",
  "presente",
];
const hasPresent = (item: TextItem) => {
  const text = item.text.toLowerCase();
  const normalizedText = text.normalize("NFD").replace(/\p{M}/gu, "");
  return PRESENT_KEYWORDS.some((keyword) => {
    const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
    return normalizedText.includes(normalizedKeyword);
  });
};
export const DATE_FEATURE_SETS: FeatureSet[] = [
  [hasYear, 1],
  [hasMonth, 1],
  [hasSeason, 1],
  [hasPresent, 1],
  [hasComma, -1],
];
