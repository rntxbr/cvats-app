import { createContext } from "react";

export const RESUME_TEMPLATES = [
  {
    id: "classic",
    name: "Clássico",
    description: "Títulos com destaque e espaçamento equilibrado.",
  },
  {
    id: "minimal",
    name: "Essencial",
    description: "Tipografia discreta, divisórias finas e mais espaço para conteúdo.",
  },
  {
    id: "executive",
    name: "Executivo",
    description: "Cabeçalho centralizado e títulos com uma linha de destaque.",
  },
] as const;
export const TemplateContext = createContext("classic");
