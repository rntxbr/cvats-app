import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Footer } from "components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "CVAts - Criador de Currículos Gratuito Otimizado para ATS",
  description:
    "CVAts é um criador de currículos gratuito, de código aberto e poderoso que permite criar um currículo profissional moderno em 3 passos simples. Otimizado para sistemas ATS (Applicant Tracking System) como Greenhouse, Lever e Workday. Teste a compatibilidade do seu currículo com o analisador ATS integrado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <TopNavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
