import type { ResumeSectionToLines } from "lib/parse-resume-from-pdf/types";

/**
 * Return section lines that contain any of the keywords.
 */
export const getSectionLinesByKeywords = (
  sections: ResumeSectionToLines,
  keywords: string[]
) => {
  const normalizeTextForComparison = (value: string) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const normalizedKeywords = keywords.map((keyword) =>
    normalizeTextForComparison(keyword)
  );
  for (const sectionName in sections) {
    const normalizedSectionName = normalizeTextForComparison(sectionName);
    const hasKeyWord = normalizedKeywords.some((keyword) =>
      normalizedSectionName.includes(keyword)
    );
    if (hasKeyWord) {
      return sections[sectionName];
    }
  }
  return [];
};
