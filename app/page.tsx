import { Hero } from "./home/Hero";

export const metadata = {
  title: "cvats - Criador de Currículos compatíveis com ATS",
  description:
    "Crie currículos 100% compatíveis com ATS de forma gratuita e em poucos minutos. Exportação em PDF e foco em legibilidade por sistemas de triagem.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="bg-[#f1eee1] mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
      <Hero />
    </main>
  );
}
