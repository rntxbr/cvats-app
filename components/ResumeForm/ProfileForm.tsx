import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeProfile, selectProfile } from "@/app/lib/redux/resumeSlice";
import type { ResumeProfile } from "@/app/lib/redux/types";
import { BaseForm } from "@/components/ResumeForm/Form";
import { Input, Textarea } from "@/components/ResumeForm/Form/InputGroup";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, role, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-2">
        <Input
          label="Nome"
          labelClassName="col-span-full"
          name="name"
          placeholder="Renato Khael"
          value={name}
          onChange={handleProfileChange}
        />
        <Input
          label="Cargo"
          labelClassName="col-span-full"
          name="role"
          placeholder="Desenvolvedor Full-Stack"
          value={role}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Resumo"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Descreva seu foco profissional, competências e resultados relevantes para a vaga."
          value={summary}
          onChange={handleProfileChange}
          rows={5}
        />
        <Input
          label="E-mail"
          labelClassName="col-span-full sm:col-span-4"
          name="email"
          placeholder="seuemail@dominio.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Telefone"
          labelClassName="col-span-full sm:col-span-2"
          name="phone"
          placeholder="(11)99999-9999"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="LinkedIn ou portfólio"
          labelClassName="col-span-full sm:col-span-4"
          name="url"
          placeholder="linkedin.com/in/rkhael/"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Localidade"
          labelClassName="col-span-full sm:col-span-2"
          name="location"
          placeholder="São Paulo, SP"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
