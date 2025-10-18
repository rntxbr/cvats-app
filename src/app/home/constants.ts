import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "João Silva",
    summary:
      "Engenheiro de software apaixonado por criar produtos excepcionais que as pessoas amam",
    email: "contato@exemplo.com",
    phone: "(11) 98765-4321",
    location: "São Paulo, SP",
    url: "linkedin.com/in/joao-silva",
  },
  workExperiences: [
    {
      company: "Tech Brasil LTDA",
      jobTitle: "Engenheiro de Software",
      date: "Mai 2023 - Atual",
      descriptions: [
        "Liderou equipe multifuncional de 5 engenheiros no desenvolvimento de barra de pesquisa, possibilitando que milhares de usuários ativos diários pesquisem conteúdo em toda a plataforma",
        "Criou animações impressionantes de demonstração de produto na página inicial que aumentaram a taxa de cadastro em 20%",
        "Desenvolveu código limpo, modular e fácil de manter, garantindo 100% de cobertura de testes",
      ],
    },
    {
      company: "Innovation Corp",
      jobTitle: "Estagiário em Engenharia de Software",
      date: "Verão 2022",
      descriptions: [
        "Rearquitetou o editor de conteúdo existente para ser responsivo em dispositivos móveis, resultando em aumento de 10% no engajamento de usuários mobile",
        "Criou barra de progresso para ajudar usuários a acompanhar progresso, aumentando a retenção de usuários em 15%",
        "Descobriu e corrigiu 5 bugs na base de código existente para melhorar a experiência do usuário",
      ],
    },
    {
      company: "Universidade XYZ",
      jobTitle: "Assistente de Pesquisa",
      date: "Verão 2021",
      descriptions: [
        "Desenvolveu novo algoritmo de PLN em classificação de texto que resultou em aumento de 10% na precisão",
        "Compilou e apresentou resultados de pesquisa para grupo de mais de 20 professores e estudantes",
      ],
    },
  ],
  educations: [
    {
      school: "Universidade XYZ",
      degree: "Bacharelado em Ciência da Computação",
      date: "Set 2019 - Mai 2023",
      gpa: "9.5",
      descriptions: [
        "Vencedor do 1º lugar no Hackathon de Educação 2022, 2º lugar na Competição de Tecnologia em Saúde 2023",
        "Monitor de Programação para Web (2022 - 2023)",
        "Disciplinas: Programação Orientada a Objetos (A+), Programação para Web (A+), Computação em Nuvem (A), Introdução ao Aprendizado de Máquina (A-), Análise de Algoritmos (A-)",
      ],
    },
  ],
  projects: [
    {
      project: "Criador de Currículos ATS",
      date: "Primavera 2023",
      descriptions: [
        "Criou e lançou aplicação web gratuita para criação de currículos que permite que milhares de usuários criem currículos profissionais facilmente e conquistem seus empregos dos sonhos",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "HTML", rating: 4 },
      { skill: "CSS", rating: 4 },
      { skill: "Python", rating: 3 },
      { skill: "TypeScript", rating: 3 },
      { skill: "React", rating: 3 },
      { skill: "C++", rating: 2 },
    ],
    descriptions: [
      "Técnicas: React Hooks, GraphQL, Node.js, SQL, Postgres, NoSql, Redis, REST API, Git",
      "Comportamentais: Trabalho em Equipe, Resolução Criativa de Problemas, Comunicação, Mentalidade de Aprendizado, Metodologias Ágeis",
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
