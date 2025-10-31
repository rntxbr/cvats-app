import ClientPage from "./page.client";

export const metadata = {
  title: "Criar Currículo | cvats",
  description:
    "Monte seu currículo compatível com ATS. Edite seções, visualize em tempo real e exporte em PDF.",
  alternates: {
    canonical: "/resume-builder",
  },
};

export default function Create() {
  return <ClientPage />;
}
