"use client";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { type ShowForm, selectFormsOrder } from "@/app/lib/redux/settingsSlice";
import { CustomForm } from "@/components/ResumeForm/CustomForm";
import { EducationsForm } from "@/components/ResumeForm/EducationsForm";
import { ProfileForm } from "@/components/ResumeForm/ProfileForm";
import { ProjectsForm } from "@/components/ResumeForm/ProjectsForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { WorkExperiencesForm } from "@/components/ResumeForm/WorkExperiencesForm";

const formTypeToComponent: { [type in ShowForm]: () => React.ReactElement } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  const formsOrder = useAppSelector(selectFormsOrder);

  return (
    <div>
      <section className="flex w-full flex-col gap-4 ">
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
      </section>
    </div>
  );
};
