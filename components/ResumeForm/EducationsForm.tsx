import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeEducations, selectEducations } from "@/app/lib/redux/resumeSlice";
import { changeShowBulletPoints, selectShowBulletPoints } from "@/app/lib/redux/settingsSlice";
import type { ResumeEducation } from "@/app/lib/redux/types";
import { Form, FormSection } from "@/components/ResumeForm/Form";
import { BulletListIconButton } from "@/components/ResumeForm/Form/IconButton";
import { BulletListTextarea, Input } from "@/components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "@/components/ResumeForm/types";

export const EducationsForm = () => {
  const educations = useAppSelector(selectEducations);
  const dispatch = useAppDispatch();
  const showDelete = educations.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  return (
    <Form form={form} addButtonText="Adicionar Educação">
      {educations.map(({ school, degree, gpa, date, descriptions }, idx) => {
        const handleEducationChange = (
          ...[field, value]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
        ) => {
          dispatch(changeEducations({ idx, field, value } as any));
        };

        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== educations.length - 1;

        return (
          <FormSection
            key={idx}
            form="educations"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Excluir formação"
          >
            <Input
              label="Instituição"
              labelClassName="col-span-full sm:col-span-4"
              name="school"
              placeholder="Universidade de São Paulo"
              value={school}
              onChange={handleEducationChange}
            />
            <Input
              label="Período"
              labelClassName="col-span-full sm:col-span-2"
              name="date"
              placeholder="Mar 2010 - Jul 2014"
              value={date}
              onChange={handleEducationChange}
            />
            <Input
              label="Curso"
              labelClassName="col-span-full sm:col-span-4"
              name="degree"
              placeholder="Bacharelado em Engenharia de Software"
              value={degree}
              onChange={handleEducationChange}
            />
            <Input
              label="Nota"
              labelClassName="col-span-full sm:col-span-2"
              name="gpa"
              placeholder="8.81"
              value={gpa}
              onChange={handleEducationChange}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Informações adicionais"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Atividades, cursos ou prêmios relevantes."
                value={descriptions}
                onChange={handleEducationChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute right-0 -top-1">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
    </Form>
  );
};
