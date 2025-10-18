import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Footer } from "components/Footer";
import { GoogleAnalytics } from "components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.vercel.app";
const siteName = "CVAts";
const siteTitle = "CVAts - Criador de Currículos Gratuito Otimizado para ATS";
const siteDescription =
  "CVAts é um criador de currículos gratuito, de código aberto e poderoso que permite criar um currículo profissional moderno em 3 passos simples. Otimizado para sistemas ATS (Applicant Tracking System) como Greenhouse, Lever e Workday. Teste a compatibilidade do seu currículo com o analisador ATS integrado.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "currículo",
    "currículo grátis",
    "criador de currículo",
    "currículo ATS",
    "sistema de rastreamento de candidatos",
    "currículo profissional",
    "CV",
    "resume builder",
    "analisador de currículo",
    "otimização de currículo",
    "procurar emprego",
    "candidatura de emprego",
    "currículo moderno",
    "template de currículo",
    "código aberto",
  ],
  authors: [{ name: "CVAts Team" }],
  creator: "CVAts",
  publisher: "CVAts",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CVAts - Criador de Currículos Otimizado para ATS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: "@cvats",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <GoogleAnalytics />
        <TopNavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
