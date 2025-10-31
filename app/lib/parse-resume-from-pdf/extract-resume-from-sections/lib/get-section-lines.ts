import type { ResumeSectionToLines } from "@/app/lib/parse-resume-from-pdf/types";

/**
 * Return section lines that contain any of the keywords.
 */
export const getSectionLinesByKeywords = (
  sections: ResumeSectionToLines,
  keywords: string[]
) => {
  const normalizeForSearch = (value: string) =>
    value
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase();
  const normalizedKeywords = keywords.map((keyword) =>
    normalizeForSearch(keyword)
  );
  for (const sectionName in sections) {
    const normalizedSectionName = normalizeForSearch(sectionName);
    const hasKeyWord = normalizedKeywords.some((keyword) =>
      normalizedSectionName.includes(keyword)
    );
    if (hasKeyWord) {
      return sections[sectionName];
    }
  }
  return [];
};
