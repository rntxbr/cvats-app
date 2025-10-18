import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.vercel.app";

export const metadata: Metadata = {
  title: "Analisador de Currículo ATS",
  description:
    "Teste gratuitamente a compatibilidade do seu currículo com sistemas ATS (Applicant Tracking System). Nosso analisador verifica se seu currículo será corretamente processado por softwares de recrutamento como Greenhouse, Lever e Workday.",
  keywords: [
    "analisador de currículo",
    "teste ATS",
    "compatibilidade ATS",
    "verificar currículo",
    "ATS checker",
    "análise de currículo grátis",
    "sistema de rastreamento",
    "Greenhouse",
    "Lever",
    "Workday",
  ],
  openGraph: {
    title: "Analisador de Currículo ATS - CVAts",
    description:
      "Teste gratuitamente a compatibilidade do seu currículo com sistemas ATS.",
    url: `${siteUrl}/resume-parser`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CVAts Analisador ATS",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/resume-parser`,
  },
};

export default function ResumeParserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
