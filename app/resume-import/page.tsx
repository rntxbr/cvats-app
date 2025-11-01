import { StructuredData } from "@/app/lib/seo/structured-data";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";

export const metadata = {
  title: "Importar Currículo (PDF) | cvats",
  description:
    "Importe seu currículo em PDF para editar e otimizar para ATS. Analise e ajuste a estrutura para máxima compatibilidade. Conversão automática de PDF para formato editável.",
  keywords: [
    "importar currículo",
    "converter PDF currículo",
    "editar currículo PDF",
    "importar CV PDF",
    "currículo PDF para editar",
  ],
  alternates: {
    canonical: "/resume-import",
  },
  openGraph: {
    title: "Importar Currículo (PDF) | cvats",
    description:
      "Importe seu currículo em PDF para editar e otimizar para ATS. Analise e ajuste a estrutura para máxima compatibilidade.",
    url: `${siteUrl}/resume-import`,
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const breadcrumbSchema = {
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Importar Currículo",
      item: `${siteUrl}/resume-import`,
    },
  ],
};

import ClientPage from "./page.client";

export default function ImportResume() {
  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      <ClientPage />
    </>
  );
}
