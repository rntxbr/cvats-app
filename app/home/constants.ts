import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "../lib/redux/resumeSlice";
import type { Resume } from "../lib/redux/types";
import { deepClone } from "../lib/deep-clone";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "João Silva",
    summary:
      "Engenheiro de software focado em criar produtos excepcionais que as pessoas amam",
    email: "joao.silva@example.com",
    phone: "+55 11 91234-5678",
    location: "São Paulo, SP",
    url: "linkedin.com/in/joaosilva",
  },
  workExperiences: [
    {
      company: "Empresa ABC",
      jobTitle: "Engenheiro de Software",
      date: "mai 2023 - atual",
      descriptions: [
        "Liderei um time multidisciplinar de 5 engenheiros no desenvolvimento de uma barra de busca utilizada por milhares de usuários diários em toda a plataforma",
        "Criei animações de demonstração no produto que aumentaram em 20% a taxa de cadastro",
        "Escrevi código limpo e modular, com alta cobertura de testes e fácil manutenção",
      ],
    },
    {
      company: "Organização DEF",
      jobTitle: "Estagiário em Engenharia de Software",
      date: "verão 2022",
      descriptions: [
        "Reestruturei o editor de conteúdo para ser responsivo, aumentando em 10% o engajamento no mobile",
        "Implementei um indicador de progresso que elevou a retenção de usuários em 15%",
        "Identifiquei e corrigi 5 bugs críticos melhorando a experiência do usuário",
      ],
    },
    {
      company: "Universidade XYZ",
      jobTitle: "Assistente de Pesquisa",
      date: "verão 2021",
      descriptions: [
        "Propus um novo algoritmo de PLN para classificação de texto com ganho de 10% em acurácia",
        "Compilei e apresentei resultados de pesquisa para um grupo de 20+ docentes e alunos",
      ],
    },
  ],
  educations: [
    {
      school: "Universidade XYZ",
      degree: "Bacharelado em Ciência da Computação",
      date: "set 2019 - mai 2023",
      gpa: "9.5/10",
      descriptions: [
        "1º lugar no Hackathon de Educação 2022, 2º lugar na Competição Health Tech 2023",
        "Monitor de Programação para Web (2022 - 2023)",
        "Disciplinas: POO, Programação para Web, Computação em Nuvem, Introdução ao ML, Análise de Algoritmos",
      ],
    },
  ],
  projects: [
    {
      project: "cvats",
      date: "primavera 2023",
      descriptions: [
        "Criação e lançamento de app web gratuito para montar currículos compatíveis com ATS e facilitar a conquista de vagas",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "HTML", rating: 4 },
      { skill: "CSS", rating: 4 },
      { skill: "JavaScript/TypeScript", rating: 3 },
      { skill: "TypeScript", rating: 3 },
      { skill: "React", rating: 3 },
      { skill: "C++", rating: 2 },
    ],
    descriptions: [
      "Tecnologias: React Hooks, GraphQL, Node.js, SQL, Postgres, NoSQL, Redis, REST API, Git",
      "Comportamentais: Trabalho em equipe, Resolução criativa de problemas, Comunicação, Aprendizado contínuo, Ágil",
    ],
  },
  custom: {
    descriptions: [],
  },
};

export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  educations: [deepClone(initialEducation)],
  projects: [deepClone(initialProject)],
  skills: {
    featuredSkills: END_HOME_RESUME.skills.featuredSkills.map((item) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};
