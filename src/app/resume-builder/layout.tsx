import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.vercel.app";

export const metadata: Metadata = {
  title: "Construtor de Currículos",
  description:
    "Crie seu currículo profissional gratuitamente com nosso editor intuitivo. Otimizado para sistemas ATS, com templates modernos e exportação em PDF. Comece agora e destaque-se no mercado de trabalho.",
  keywords: [
    "construtor de currículo",
    "editor de currículo",
    "criar currículo online",
    "currículo profissional",
    "template de currículo",
    "currículo ATS",
    "exportar currículo PDF",
  ],
  openGraph: {
    title: "Construtor de Currículos - CVAts",
    description:
      "Crie seu currículo profissional gratuitamente com nosso editor intuitivo. Otimizado para ATS.",
    url: `${siteUrl}/resume-builder`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CVAts Construtor de Currículos",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/resume-builder`,
  },
};

export default function ResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
