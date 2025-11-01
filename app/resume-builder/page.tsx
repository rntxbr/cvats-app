import ClientPage from "./page.client";
import { StructuredData } from "@/app/lib/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";

export const metadata = {
  title: "Criar Currículo | cvats",
  description:
    "Monte seu currículo compatível com ATS. Edite seções, visualize em tempo real e exporte em PDF. Interface intuitiva e sem necessidade de cadastro.",
  keywords: [
    "criar currículo",
    "montar currículo",
    "editor de currículo",
    "currículo ATS",
    "resume builder",
    "criar CV online",
  ],
  alternates: {
    canonical: "/resume-builder",
  },
  openGraph: {
    title: "Criar Currículo | cvats",
    description:
      "Monte seu currículo compatível com ATS. Edite seções, visualize em tempo real e exporte em PDF.",
    url: `${siteUrl}/resume-builder`,
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
      name: "Criar Currículo",
      item: `${siteUrl}/resume-builder`,
    },
  ],
};

export default function Create() {
  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      <ClientPage />
    </>
  );
}
