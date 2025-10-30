"use client";
import { useState } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "@/app/lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "@/app/lib/redux/settingsSlice";
import { ProfileForm } from "@/components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "@/components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "@/components/ResumeForm/EducationsForm";
import { ProjectsForm } from "@/components/ResumeForm/ProjectsForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ThemeForm } from "@/components/ResumeForm/ThemeForm";
import { CustomForm } from "@/components/ResumeForm/CustomForm";
import { FlexboxSpacer } from "@/components/FlexboxSpacer";
import { cx } from "@/app/lib/cx";

const formTypeToComponent: { [type in ShowForm]: () => React.ReactElement } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);


  return (
    <div>
      <section className="flex w-full flex-col gap-4 ">
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
        <ThemeForm />
        <br />
      </section>
      <FlexboxSpacer maxWidth={50} className="hidden md:block" />
    </div>
  );
};
