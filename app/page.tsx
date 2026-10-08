import { StructuredData } from "@/app/lib/seo/structured-data";
import { Hero } from "./home/Hero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";

export const metadata = {
  title: "cvats - Criador de Currículos compatíveis com ATS",
  description:
    "Crie currículos com estrutura amigável a ATS, exporte em PDF e analise a cobertura de palavras-chave da vaga. Gratuito e sem cadastro.",
  keywords: [
    "criar currículo online",
    "currículo grátis",
    "currículo ATS",
    "resume builder",
    "gerador de currículo",
    "curriculum vitae",
    "CV profissional",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "cvats - Criador de Currículos compatíveis com ATS",
    description:
      "Crie currículos com estrutura amigável a ATS. Exportação em PDF e avaliação de conteúdo e palavras-chave da vaga.",
    url: siteUrl,
    siteName: "cvats",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "cvats - Criador de Currículos compatíveis com ATS",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cvats - Criador de Currículos compatíveis com ATS",
    description:
      "Crie e analise currículos com foco em legibilidade por ATS. Gratuito e sem cadastro.",
    images: [`${siteUrl}/og-image.png`],
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
  ],
};

export default function Home() {
  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      <main className="bg-[#f1eee1] mx-auto container">
        <Hero />
      </main>
    </>
  );
}
