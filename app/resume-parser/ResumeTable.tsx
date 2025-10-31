import { Fragment } from "react";
import { cx } from "@/app/lib/cx";
import { deepClone } from "@/app/lib/deep-clone";
import { initialEducation, initialWorkExperience } from "@/app/lib/redux/resumeSlice";
import type { Resume } from "@/app/lib/redux/types";

const TableRowHeader = ({ children }: { children: React.ReactNode }) => (
  <tr className="divide-x bg-gray-50">
    <th className="px-3 py-2 font-semibold" scope="colgroup" colSpan={2}>
      {children}
    </th>
  </tr>
);

const TableRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | string[];
  className?: string | false;
}) => {
  const normalizedValue = typeof value === "string" ? value : Array.isArray(value) ? value : "";

  return (
    <tr className={cx("divide-x", className)}>
      <th className="px-3 py-2 font-medium" scope="row">
        {label}
      </th>
      <td className="w-full px-3 py-2">
        {typeof normalizedValue === "string"
          ? normalizedValue
          : normalizedValue.map((x, idx) => (
              <Fragment key={idx}>
                • {x}
                <br />
              </Fragment>
            ))}
      </td>
    </tr>
  );
};

export const ResumeTable = ({ resume }: { resume: Resume }) => {
  const educations =
    resume.educations.length === 0 ? [deepClone(initialEducation)] : resume.educations;
  const workExperiences =
    resume.workExperiences.length === 0
      ? [deepClone(initialWorkExperience)]
      : resume.workExperiences;
  const skills = [...resume.skills.descriptions];
  const featuredSkills = resume.skills.featuredSkills
    .filter((item) => item.skill.trim())
    .map((item) => item.skill)
    .join(", ")
    .trim();
  if (featuredSkills) {
    skills.unshift(featuredSkills);
  }
  return (
    <table className="mt-2 w-full border text-sm text-gray-900">
      <tbody className="divide-y text-left align-top">
        <TableRowHeader>Dados Pessoais</TableRowHeader>
        <TableRow label="Nome" value={resume.profile.name} />
        <TableRow label="Cargo" value={resume.profile.role || ""} />
        <TableRow label="E-mail" value={resume.profile.email} />
        <TableRow label="Telefone" value={resume.profile.phone} />
        <TableRow label="Localidade" value={resume.profile.location} />
        <TableRow label="Linkedin" value={resume.profile.url} />
        <TableRow label="Resumo" value={resume.profile.summary} />
        <TableRowHeader>Formaçao Academica</TableRowHeader>
        {educations.map((education, idx) => (
          <Fragment key={idx}>
            <TableRow label="Faculdade" value={education.school} />
            <TableRow label="Curso" value={education.degree} />
            <TableRow label="Nota" value={education.gpa} />
            <TableRow label="Data" value={education.date} />
            <TableRow
              label="Descrição"
              value={education.descriptions}
              className={
                educations.length - 1 !== 0 && idx !== educations.length - 1 && "!border-b-4"
              }
            />
          </Fragment>
        ))}
        <TableRowHeader>Experiência Profissional</TableRowHeader>
        {workExperiences.map((workExperience, idx) => (
          <Fragment key={idx}>
            <TableRow label="Empresa" value={workExperience.company} />
            <TableRow label="Cargo" value={workExperience.jobTitle} />
            <TableRow label="Data" value={workExperience.date} />
            <TableRow
              label="Descriçao"
              value={workExperience.descriptions}
              className={
                workExperiences.length - 1 !== 0 &&
                idx !== workExperiences.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        {resume.projects.length > 0 && <TableRowHeader>Projetos</TableRowHeader>}
        {resume.projects.map((project, idx) => (
          <Fragment key={idx}>
            <TableRow label="Nome do Projeto" value={project.project} />
            <TableRow label="Data" value={project.date} />
            <TableRow
              label="Descrição"
              value={project.descriptions}
              className={
                resume.projects.length - 1 !== 0 &&
                idx !== resume.projects.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        <TableRowHeader>Habilidades</TableRowHeader>
        <TableRow label="Descriçao" value={skills} />
      </tbody>
    </table>
  );
};
