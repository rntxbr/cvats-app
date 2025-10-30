import { Form, FormSection } from "@/components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "@/components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "@/components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { selectProjects, changeProjects } from "@/app/lib/redux/resumeSlice";
import type { ResumeProject } from "@/app/lib/redux/types";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  return (
    <Form form="projects" addButtonText="Add Project">
      {projects.map(({ project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete project"}
          >
            <Input
              name="project"
              label="Nome do projeto"
              placeholder="cvats"
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4"
            />
            <Input
              name="date"
              label="Data"
              placeholder="Jul 2025"
              value={date}
              onChange={handleProjectChange}
              labelClassName="col-span-2"
            />
            <BulletListTextarea
              name="descriptions"
              label="Descrição do projeto"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
