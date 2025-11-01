import { Hero } from "./home/Hero";
import { StructuredData } from "@/app/lib/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";

export const metadata = {
  title: "cvats - Criador de Currículos compatíveis com ATS",
  description:
    "Crie currículos 100% compatíveis com ATS de forma gratuita e em poucos minutos. Exportação em PDF e foco em legibilidade por sistemas de triagem. Não é necessário cadastro.",
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
      "Crie currículos 100% compatíveis com ATS de forma gratuita e em poucos minutos. Exportação em PDF e foco em legibilidade por sistemas de triagem.",
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
      "Crie currículos 100% compatíveis com ATS de forma gratuita e em poucos minutos.",
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
