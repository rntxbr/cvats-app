import { BaseForm } from "@/components/ResumeForm/Form";
import { Input, Textarea } from "@/components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeProfile, selectProfile } from "@/app/lib/redux/resumeSlice";
import { ResumeProfile } from "@/app/lib/redux/types";

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
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="E-mail"
          labelClassName="col-span-4"
          name="email"
          placeholder="seuemail@dominio.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Telefone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(11)99999-9999"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Linkedin"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/rkhael/"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Localidade"
          labelClassName="col-span-2"
          name="location"
          placeholder="SP"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
