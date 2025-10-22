import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location, github, linkedin } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Nome"
          labelClassName="col-span-full"
          name="name"
          placeholder="João Silva"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objetivo"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Profissional dedicado com experiência em tecnologia e paixão por inovação"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="joao.silva@email.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Telefone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(11) 98765-4321"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-3"
          name="url"
          placeholder="meu portfólio"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Perfil no LinkedIn"
          labelClassName="col-span-3"
          name="linkedin"
          placeholder="linkedin.com/in/joaosilva"
          value={linkedin}
          onChange={handleProfileChange}
        />
        <Input
          label="Github"
          labelClassName="col-span-4"
          name="github"
          placeholder="github.com/profile"
          value={github}
          onChange={handleProfileChange}
        />
        <Input
          label="Localização"
          labelClassName="col-span-2"
          name="location"
          placeholder="São Paulo, SP"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
