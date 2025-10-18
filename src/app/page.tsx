import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import { Testimonials } from "home/Testimonials";
import { QuestionsAndAnswers } from "home/QuestionsAndAnswers";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.vercel.app";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CVAts",
    description:
      "Criador de currículos gratuito e otimizado para sistemas ATS. Crie seu currículo profissional em minutos.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    featureList: [
      "Criador de currículo otimizado para ATS",
      "Analisador de compatibilidade ATS",
      "Templates profissionais",
      "100% gratuito e código aberto",
      "Privacidade garantida - dados locais",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
        <Hero />
        <Steps />
        <Features />
        <Testimonials />
        <QuestionsAndAnswers />
      </main>
    </>
  );
}
