import { deepClone } from "@/app/lib/deep-clone";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";
import { getSectionLinesByKeywords } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import type { ResumeSectionToLines } from "@/app/lib/parse-resume-from-pdf/types";
import { initialFeaturedSkills } from "@/app/lib/redux/resumeSlice";
import type { ResumeSkills } from "@/app/lib/redux/types";

export const extractSkills = (sections: ResumeSectionToLines) => {
  const lines = getSectionLinesByKeywords(sections, [
    "skill",
    "skills",
    "habilidade",
    "habilidades",
    "competencia",
    "competências",
    "competencias",
    "competência",
    "tecnologia",
    "tecnologias",
  ]);
  const descriptionsLineIdx = getDescriptionsLineIdx(lines) ?? 0;
  const descriptionsLines = lines.slice(descriptionsLineIdx);
  const descriptions = getBulletPointsFromLines(descriptionsLines);

  const featuredSkills = deepClone(initialFeaturedSkills);
  if (descriptionsLineIdx !== 0) {
    const featuredSkillsLines = lines.slice(0, descriptionsLineIdx);
    const featuredSkillsTextItems = featuredSkillsLines
      .flat()
      .filter((item) => item.text.trim())
      .slice(0, 6);
    for (let i = 0; i < featuredSkillsTextItems.length; i++) {
      featuredSkills[i].skill = featuredSkillsTextItems[i].text;
    }
  }

  const skills: ResumeSkills = {
    featuredSkills,
    descriptions,
  };

  return { skills };
};
