import "./globals.css";
import { Sora } from "next/font/google";
import { FooterBar } from "@/components/FooterBar";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { TopNavBar } from "@/components/TopNavBar";
import { StructuredData } from "@/app/lib/seo/structured-data";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";
const siteName = "cvats";
const siteTitle = "cvats - criador de currículos gratuito otimizado para ATS";
const siteDescription =
  "CVAts é um criador de currículos gratuito, de código aberto e poderoso que permite criar um currículo profissional moderno em 3 passos simples. Otimizado para sistemas ATS (Applicant Tracking System) como Greenhouse, Lever e Workday. Teste a compatibilidade do seu currículo com o analisador ATS integrado.";

export const metadata = {
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
    "currículo compatível com ATS",
    "ATS friendly resume",
    "criar currículo online",
    "gerador de currículo",
  ],
  authors: [{ name: "Renato Khael", url: "https://github.com/rntxbr" }],
  creator: "Renato Khael",
  publisher: "Renato Khael",
  category: "Produtividade",
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
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
        alt: "cvats - criador de currículos otimizado para ATS",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: "@rntxbr",
    site: "@rntxbr",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
    languages: {
      "pt-BR": siteUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

const organizationSchema = {
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: siteDescription,
  sameAs: ["https://github.com/rntxbr/cvats-app"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Support",
    url: `${siteUrl}/about`,
  },
};

const softwareApplicationSchema = {
  name: siteName,
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1",
  },
  description: siteDescription,
  url: siteUrl,
  downloadUrl: siteUrl,
  screenshot: `${siteUrl}/og-image.png`,
  author: {
    "@type": "Person",
    name: "Renato Khael",
    url: "https://github.com/rntxbr",
  },
};

const webSiteSchema = {
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/resume-parser?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body className="bg-[#f1eee1]">
        <StructuredData type="Organization" data={organizationSchema} />
        <StructuredData type="SoftwareApplication" data={softwareApplicationSchema} />
        <StructuredData type="WebSite" data={webSiteSchema} />
        <GoogleAnalytics />
        <TopNavBar />
        <main>{children}</main>
        <FooterBar />
      </body>
    </html>
  );
}
