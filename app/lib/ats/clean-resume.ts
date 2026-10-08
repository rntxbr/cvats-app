import type { Settings } from "@/app/lib/redux/settingsSlice";
import type { Resume } from "@/app/lib/redux/types";

/** Keep preview, export and live assessment aligned with the visible sections. */
export function cleanResume(resume: Resume, settings: Settings): Resume {
  return {
    ...resume,
    workExperiences: settings.formToShow.workExperiences
      ? resume.workExperiences.filter(
          (item) =>
            item.company.trim() ||
            item.jobTitle.trim() ||
            item.date.trim() ||
            item.descriptions.some((text) => text.trim())
        )
      : [],
    educations: settings.formToShow.educations
      ? resume.educations.filter(
          (item) =>
            item.school.trim() ||
            item.degree.trim() ||
            item.date.trim() ||
            item.descriptions.some((text) => text.trim())
        )
      : [],
    projects: settings.formToShow.projects
      ? resume.projects.filter(
          (item) => item.project.trim() || item.descriptions.some((text) => text.trim())
        )
      : [],
    skills: settings.formToShow.skills ? resume.skills : { featuredSkills: [], descriptions: [] },
    custom: settings.formToShow.custom ? resume.custom : { descriptions: [] },
  };
}
