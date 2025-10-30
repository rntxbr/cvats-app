import type { ResumeWorkExperience } from "@/app/lib/redux/types";
import type {
  TextItem,
  FeatureSet,
  ResumeSectionToLines,
} from "@/app/lib/parse-resume-from-pdf/types";
import { getSectionLinesByKeywords } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import {
  DATE_FEATURE_SETS,
  hasNumber,
  getHasText,
  isBold,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { divideSectionIntoSubsections } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/subsections";
import { getTextWithHighestFeatureScore } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";

// prettier-ignore
const WORK_EXPERIENCE_KEYWORDS = [
  'work',
  'experience',
  'employment',
  'history',
  'job',
  'experiencia',
  'experiência',
  'profissional',
  'carreira',
  'trajetoria',
  'trajetória',
  'atuação',
  'atuacao',
];
// prettier-ignore
const JOB_TITLES = [
  'Accountant',
  'Administrator',
  'Advisor',
  'Agent',
  'Analyst',
  'Apprentice',
  'Architect',
  'Assistant',
  'Associate',
  'Auditor',
  'Bartender',
  'Biologist',
  'Bookkeeper',
  'Buyer',
  'Carpenter',
  'Cashier',
  'CEO',
  'Clerk',
  'Co-op',
  'Co-Founder',
  'Consultant',
  'Coordinator',
  'CTO',
  'Developer',
  'Designer',
  'Director',
  'Driver',
  'Editor',
  'Electrician',
  'Engineer',
  'Extern',
  'Founder',
  'Freelancer',
  'Head',
  'Intern',
  'Janitor',
  'Journalist',
  'Laborer',
  'Lawyer',
  'Lead',
  'Manager',
  'Mechanic',
  'Member',
  'Nurse',
  'Officer',
  'Operator',
  'Operation',
  'Photographer',
  'President',
  'Producer',
  'Recruiter',
  'Representative',
  'Researcher',
  'Sales',
  'Server',
  'Scientist',
  'Specialist',
  'Supervisor',
  'Teacher',
  'Technician',
  'Trader',
  'Trainee',
  'Treasurer',
  'Tutor',
  'Vice',
  'VP',
  'Volunteer',
  'Webmaster',
  'Worker',
  'Analista',
  'Assistente',
  'Coordenador',
  'Coordenadora',
  'Coordenador(a)',
  'Diretor',
  'Diretora',
  'Diretor(a)',
  'Engenheiro',
  'Engenheira',
  'Engenheiro(a)',
  'Especialista',
  'Estagiario',
  'Estagiário',
  'Estagiaria',
  'Estagiária',
  'Estagiario(a)',
  'Gerente',
  'Lider',
  'Líder',
  'Supervisor',
  'Supervisora',
  'Supervisor(a)',
  'Professor',
  'Professora',
  'Professor(a)',
  'Pesquisador',
  'Pesquisadora',
  'Consultor',
  'Consultora',
  'Consultor(a)',
];

const NORMALIZED_JOB_TITLES = JOB_TITLES.map((title) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
);
const hasJobTitle = (item: TextItem) => {
  const words = item.text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .split(/[\s,.;:()\/-]+/)
    .filter(Boolean);
  return NORMALIZED_JOB_TITLES.some((jobTitle) => words.includes(jobTitle));
};
const hasMoreThan5Words = (item: TextItem) => item.text.split(/\s/).length > 5;
const JOB_TITLE_FEATURE_SET: FeatureSet[] = [
  [hasJobTitle, 4],
  [hasNumber, -4],
  [hasMoreThan5Words, -2],
];

export const extractWorkExperience = (sections: ResumeSectionToLines) => {
  const workExperiences: ResumeWorkExperience[] = [];
  const workExperiencesScores = [];
  const lines = getSectionLinesByKeywords(
    sections,
    WORK_EXPERIENCE_KEYWORDS
  );
  const subsections = divideSectionIntoSubsections(lines);

  for (const subsectionLines of subsections) {
    const descriptionsLineIdx = getDescriptionsLineIdx(subsectionLines) ?? 2;

    const subsectionInfoTextItems = subsectionLines
      .slice(0, descriptionsLineIdx)
      .flat();
    const [date, dateScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItems,
      DATE_FEATURE_SETS
    );
    const [jobTitle, jobTitleScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItems,
      JOB_TITLE_FEATURE_SET
    );
    const COMPANY_FEATURE_SET: FeatureSet[] = [
      [isBold, 2],
      [getHasText(date), -4],
      [getHasText(jobTitle), -4],
    ];
    const [company, companyScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItems,
      COMPANY_FEATURE_SET,
      false
    );

    const subsectionDescriptionsLines =
      subsectionLines.slice(descriptionsLineIdx);
    const descriptions = getBulletPointsFromLines(subsectionDescriptionsLines);

    workExperiences.push({ company, jobTitle, date, descriptions });
    workExperiencesScores.push({
      companyScores,
      jobTitleScores,
      dateScores,
    });
  }
  return { workExperiences, workExperiencesScores };
};
