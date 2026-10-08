import { Fragment } from "react";
import { cleanResume } from "@/app/lib/ats/clean-resume";
import type { Settings, ShowForm } from "@/app/lib/redux/settingsSlice";
import { DEFAULT_FONT_COLOR } from "@/app/lib/redux/settingsSlice";
import type { Resume } from "@/app/lib/redux/types";
import { Document, Page, PDFMode, View } from "@/components/Resume/ResumePDF/primitives";
import { ResumePDFCustom } from "@/components/Resume/ResumePDF/ResumePDFCustom";
import { ResumePDFEducation } from "@/components/Resume/ResumePDF/ResumePDFEducation";
import { ResumePDFProfile } from "@/components/Resume/ResumePDF/ResumePDFProfile";
import { ResumePDFProject } from "@/components/Resume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "@/components/Resume/ResumePDF/ResumePDFSkills";
import { ResumePDFWorkExperience } from "@/components/Resume/ResumePDF/ResumePDFWorkExperience";
import { styles } from "@/components/Resume/ResumePDF/styles";
import { TemplateContext } from "@/components/Resume/ResumePDF/templates";

/**
 * Share the layout between a lightweight HTML preview and the real PDF renderer.
 * PDFMode maps primitives explicitly, without suppressing console errors.
 */
export const ResumePDF = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } = cleanResume(
    resume,
    settings
  );
  const { name } = profile;
  const {
    fontFamily,
    fontSize,
    documentSize,
    formToHeading,
    formToShow,
    formsOrder,
    showBulletPoints,
  } = settings;
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  const hasContent: Record<ShowForm, boolean> = {
    workExperiences: workExperiences.length > 0,
    educations: educations.length > 0,
    projects: projects.length > 0,
    skills:
      skills.descriptions.length > 0 || skills.featuredSkills.some((item) => item.skill.trim()),
    custom: custom.descriptions.length > 0,
  };
  const showFormsOrder = formsOrder.filter((form) => formToShow[form] && hasContent[form]);

  const formTypeToComponent: { [type in ShowForm]: () => React.ReactNode } = {
    workExperiences: () => (
      <ResumePDFWorkExperience
        heading={formToHeading.workExperiences}
        workExperiences={workExperiences}
        themeColor={themeColor}
      />
    ),
    educations: () => (
      <ResumePDFEducation
        heading={formToHeading.educations}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints.educations}
      />
    ),
    projects: () => (
      <ResumePDFProject
        heading={formToHeading.projects}
        projects={projects}
        themeColor={themeColor}
      />
    ),
    skills: () => (
      <ResumePDFSkills
        heading={formToHeading.skills}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints.skills}
      />
    ),
    custom: () => (
      <ResumePDFCustom
        heading={formToHeading.custom}
        custom={custom}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints.custom}
      />
    ),
  };

  const content = (
    <Document
      title={`${name || "Currículo"} - Currículo`}
      author={name}
      producer="cvats"
      language="pt-BR"
    >
      <Page
        size={documentSize === "A4" ? "A4" : "LETTER"}
        style={{
          ...styles.flexCol,
          color: DEFAULT_FONT_COLOR,
          fontFamily,
          fontSize: `${fontSize}pt`,
          paddingTop: settings.template === "minimal" ? 28 : 24,
          paddingBottom: 36,
          paddingHorizontal: settings.template === "minimal" ? 36 : 40,
        }}
      >
        <View
          style={{
            ...styles.flexCol,
          }}
        >
          <ResumePDFProfile profile={profile} themeColor={themeColor} isPDF={isPDF} />
          {showFormsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            const element = Component();
            return <Fragment key={form}>{element}</Fragment>;
          })}
        </View>
      </Page>
    </Document>
  );

  return (
    <TemplateContext.Provider value={settings.template || "classic"}>
      <PDFMode.Provider value={isPDF}>{content}</PDFMode.Provider>
    </TemplateContext.Provider>
  );
};
