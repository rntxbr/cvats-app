export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Analisar ATS | cvats",
  description:
    "Teste a compatibilidade do seu currículo com ATS. Veja como parsers leem seções, textos e campos.",
  alternates: {
    canonical: "/resume-parser",
  },
};

import ClientPage from "./page.client";

export default function Page() {
  return <ClientPage />;
}
