export const dynamic = "force-dynamic";

export const metadata = {
  title: "Importar Currículo (PDF) | cvats",
  description:
    "Importe seu currículo em PDF para editar e otimizar para ATS. Analise e ajuste a estrutura para máxima compatibilidade.",
  alternates: {
    canonical: "/resume-import",
  },
};

import ClientPage from "./page.client";

export default function ImportResume() {
  return <ClientPage />;
}
