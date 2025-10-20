import { Fragment } from "react";
import type { Resume } from "lib/redux/types";
import { initialEducation, initialWorkExperience } from "lib/redux/resumeSlice";
import { deepClone } from "lib/deep-clone";
import { cx } from "lib/cx";

const TableRowHeader = ({ children }: { children: React.ReactNode }) => (
  <tr className="divide-x-4 divide-black border-y-4 border-black bg-gradient-to-r from-yellow-300 to-blue-300">
    <th
      className="px-4 py-3 text-left text-base font-bold text-gray-900 lg:text-lg"
      scope="colgroup"
      colSpan={2}
    >
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
}) => (
  <tr
    className={cx(
      "divide-x-4 divide-black border-b-2 border-black hover:bg-blue-50",
      className
    )}
  >
    <th className="px-4 py-3 text-left font-bold text-gray-900" scope="row">
      {label}
    </th>
    <td className="w-full px-4 py-3 ">
      {typeof value === "string"
        ? value
        : value.map((x, idx) => (
            <Fragment key={idx}>
              • {x}
              <br />
            </Fragment>
          ))}
    </td>
  </tr>
);

export const ResumeTable = ({ resume }: { resume: Resume }) => {
  const educations =
    resume.educations.length === 0
      ? [deepClone(initialEducation)]
      : resume.educations;
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
    <div className="relative mt-4">
      <div className="absolute -right-2 -top-2 h-full w-full rounded-xl border-4 border-black bg-purple-300"></div>
      <table className="relative z-10 w-full rounded-xl border-4 border-black bg-white text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:text-base">
        <tbody className="divide-y-2 divide-black text-left align-top">
          <TableRowHeader>Perfil</TableRowHeader>
          <TableRow label="Nome" value={resume.profile.name} />
          <TableRow label="Email" value={resume.profile.email} />
          <TableRow label="Telefone" value={resume.profile.phone} />
          <TableRow label="Localização" value={resume.profile.location} />
          <TableRow label="Link" value={resume.profile.url} />
          <TableRow label="Resumo" value={resume.profile.summary} />
          <TableRowHeader>Educação</TableRowHeader>
          {educations.map((education, idx) => (
            <Fragment key={idx}>
              <TableRow label="Instituição" value={education.school} />
              <TableRow label="Grau" value={education.degree} />
              <TableRow label="Média" value={education.gpa} />
              <TableRow label="Data" value={education.date} />
              <TableRow
                label="Descrições"
                value={education.descriptions}
                className={
                  educations.length - 1 !== 0 &&
                  idx !== educations.length - 1 &&
                  "!border-b-4 !border-black"
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
                label="Descrições"
                value={workExperience.descriptions}
                className={
                  workExperiences.length - 1 !== 0 &&
                  idx !== workExperiences.length - 1 &&
                  "!border-b-4 !border-black"
                }
              />
            </Fragment>
          ))}
          {resume.projects.length > 0 && (
            <TableRowHeader>Projetos</TableRowHeader>
          )}
          {resume.projects.map((project, idx) => (
            <Fragment key={idx}>
              <TableRow label="Projeto" value={project.project} />
              <TableRow label="Data" value={project.date} />
              <TableRow
                label="Descrições"
                value={project.descriptions}
                className={
                  resume.projects.length - 1 !== 0 &&
                  idx !== resume.projects.length - 1 &&
                  "!border-b-4 !border-black"
                }
              />
            </Fragment>
          ))}
          <TableRowHeader>Habilidades</TableRowHeader>
          <TableRow label="Descrições" value={skills} />
        </tbody>
      </table>
    </div>
  );
};
