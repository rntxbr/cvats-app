import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.vercel.app";

export const metadata: Metadata = {
  title: "Importar Currículo",
  description:
    "Importe seu currículo existente em PDF e edite com nosso editor otimizado para ATS. Extraímos automaticamente todas as informações e permitimos que você faça ajustes para melhorar a compatibilidade com sistemas de recrutamento.",
  keywords: [
    "importar currículo",
    "extrair dados de currículo",
    "converter currículo PDF",
    "editar currículo existente",
    "parser de currículo",
    "análise de currículo",
  ],
  openGraph: {
    title: "Importar Currículo - CVAts",
    description:
      "Importe seu currículo existente em PDF e edite com nosso editor otimizado para ATS.",
    url: `${siteUrl}/resume-import`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CVAts Importar Currículo",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/resume-import`,
  },
};

export default function ResumeImportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
