import Link from "next/link";
import { Metadata } from "next";
import { StructuredData } from "@/app/lib/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvats.com.br";

export const metadata: Metadata = {
  title: "Página não encontrada | cvats",
  description: "A página que você está procurando não foi encontrada.",
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
      name: "Página não encontrada",
      item: `${siteUrl}/404`,
    },
  ],
};

export default function NotFound() {
  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      <main className="bg-[#f1eee1] mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12 py-32 lg:py-24">
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
          <h1 className="text-6xl font-bold text-[#28584c] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-[#28584c] mb-4">
            Página não encontrada
          </h2>
          <p className="text-lg text-[#28584c] mb-8 max-w-md">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#28584c] text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#1f473d]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    </>
  );
}

