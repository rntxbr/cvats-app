import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeSkills, selectSkills } from "@/app/lib/redux/resumeSlice";
import { changeShowBulletPoints, selectShowBulletPoints } from "@/app/lib/redux/settingsSlice";
import { Form } from "@/components/ResumeForm/Form";
import { BulletListIconButton } from "@/components/ResumeForm/Form/IconButton";
import {
  BulletListTextarea,
  Input,
  InputGroupWrapper,
} from "@/components/ResumeForm/Form/InputGroup";

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (idx: number, skill: string, rating: number) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Habilidades"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute right-0 -top-1">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
        <InputGroupWrapper
          label="Habilidades em destaque (opcional)"
          className="col-span-full"
        ></InputGroupWrapper>

        {featuredSkills.map(({ skill, rating }, idx) => (
          <Input
            key={idx}
            labelClassName="col-span-full sm:col-span-3"
            name={`skill-${idx}`}
            label={`Habilidade ${idx + 1}`}
            value={skill}
            onChange={(_, newSkill) => handleFeaturedSkillsChange(idx, newSkill, rating)}
            placeholder="Ex.: Excel avançado"
          />
        ))}
      </div>
    </Form>
  );
};
