import type { Lines, ResumeSectionToLines } from "@/app/lib/parse-resume-from-pdf/types";
import type { ResumeKey } from "@/app/lib/redux/types";
import { getSectionKind } from "@/app/lib/resume-headings";

export const PROFILE_SECTION: ResumeKey = "profile";

/** Recognize full headings across font fragments; never mistake an employer for a heading. */
export const groupLinesIntoSections = (lines: Lines) => {
  const sections: ResumeSectionToLines = {};
  let sectionName: string = PROFILE_SECTION;
  let sectionLines: Lines = [];
  const flush = () => {
    sections[sectionName] = [...(sections[sectionName] || []), ...sectionLines];
  };
  for (const line of lines) {
    const text = line
      .map((item) => item.text)
      .join(" ")
      .trim();
    if (getSectionKind(text)) {
      flush();
      sectionName = text;
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }
  flush();
  return sections;
};
