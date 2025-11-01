import { StructuredData } from "@/app/lib/seo/structured-data";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";

export const metadata = {
  title: "Analisar ATS | cvats",
  description:
    "Teste a compatibilidade do seu currículo com ATS. Veja como parsers leem seções, textos e campos. Analise a estrutura do seu currículo e otimize para sistemas de triagem automatizada.",
  keywords: [
    "analisar currículo ATS",
    "testar compatibilidade ATS",
    "parser de currículo",
    "analisador ATS",
    "otimizar currículo",
    "compatibilidade ATS",
  ],
  alternates: {
    canonical: "/resume-parser",
  },
  openGraph: {
    title: "Analisar ATS | cvats",
    description:
      "Teste a compatibilidade do seu currículo com ATS. Veja como parsers leem seções, textos e campos.",
    url: `${siteUrl}/resume-parser`,
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
      name: "Analisar ATS",
      item: `${siteUrl}/resume-parser`,
    },
  ],
};

import ClientPage from "./page.client";

export default function Page() {
  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      <ClientPage />
    </>
  );
}
