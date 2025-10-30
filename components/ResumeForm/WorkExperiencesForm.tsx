import { Form, FormSection } from "@/components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "@/components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "@/components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "@/app/lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "@/app/lib/redux/types";

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const showDelete = workExperiences.length > 1;

  return (
    <Form form="workExperiences" addButtonText="Adicionar Experiência">
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
        ) => {
          // TS doesn't support passing union type to single call signature
          // https://github.com/microsoft/TypeScript/issues/54027
          // any is used here as a workaround
          dispatch(changeWorkExperiences({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== workExperiences.length - 1;

        return (
          <FormSection
            key={idx}
            form="workExperiences"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete job"
          >
            <Input
              label="Empresa"
              labelClassName="col-span-full"
              name="company"
              placeholder="Nubank"
              value={company}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Cargo"
              labelClassName="col-span-4"
              name="jobTitle"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Período"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jan 2025 - Dez 2025"
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <BulletListTextarea
              label="Descrição das atividades"
              labelClassName="col-span-full"
              name="descriptions"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleWorkExperienceChange}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
