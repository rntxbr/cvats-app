import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.png";
import { 
  HeartIcon, 
  CodeBracketIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const FOOTER_LINKS = [
  {
    title: "Produto",
    links: [
      { label: "Criar Currículo", href: "/resume-builder" },
      { label: "Importar Currículo", href: "/resume-import" },
      { label: "Analisador ATS", href: "/resume-parser" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Como Funciona", href: "/#features" },
      { label: "FAQ", href: "/#faq" },
      { label: "GitHub", href: "https://github.com/rntxbr/cvats-app" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t-4 border-black bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Coluna de Branding */}
          <div className="lg:col-span-5">
            {/* Logo/Nome */}
            <Link href="/" className="group relative inline-block">
              <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-purple-300"></div>
              <div className="relative z-10 flex items-center gap-3 rounded-lg border-3 border-black bg-gradient-to-r from-yellow-300 to-red-300 px-5 py-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src={logoSrc}
                  alt="CVAts Logo"
                  className="h-7 w-auto"
                  priority
                />
                <span className="text-2xl font-black text-gray-900">
                  CVAts
                </span>
              </div>
            </Link>

            {/* Descrição */}
            <p className="mt-6 mb-6 text-base leading-relaxed text-gray-700 lg:text-lg">
              Criador de currículos gratuito e otimizado para sistemas ATS. 
              Crie seu currículo profissional em minutos e aumente suas chances 
              de conseguir a vaga dos sonhos.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg border-3 border-black bg-yellow-300 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <HeartIcon className="h-4 w-4 text-red-600" />
                <span className="text-sm font-bold">100% Gratuito</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border-3 border-black bg-green-300 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <CodeBracketIcon className="h-4 w-4 text-gray-900" />
                <span className="text-sm font-bold">Open Source</span>
              </div>
            </div>
          </div>

          {/* Coluna de Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 text-lg font-bold text-gray-900">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-700 transition-colors hover:text-purple-700 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Coluna de Contato/CTA */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-lg font-bold text-gray-900">
              Fique por dentro
            </h4>
            <p className="mb-4 text-sm text-gray-700">
              Contribua com o projeto ou reporte problemas no GitHub
            </p>
            
            {/* Cards de Ação */}
            <div className="space-y-3">
            <Link
              href="https://github.com/rntxbr/cvats-app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
                <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-purple-300"></div>
                <div className="relative z-10 flex items-center gap-3 rounded-lg border-3 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <CodeBracketIcon className="h-5 w-5 flex-shrink-0 text-gray-900" />
                  <span className="text-sm font-bold text-gray-900">
                    Ver no GitHub
                  </span>
                </div>
              </Link>

              <Link
                href="mailto:hello@open-resume.com"
                className="group relative block"
              >
                <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-blue-300"></div>
                <div className="relative z-10 flex items-center gap-3 rounded-lg border-3 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-gray-900" />
                  <span className="text-sm font-bold text-gray-900">
                    Entre em contato
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="my-8 border-t-4 border-black lg:my-12"></div>

        {/* Rodapé Inferior */}
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Copyright */}
          <p className="text-center text-sm font-medium text-gray-700 lg:text-left">
            © {new Date().getFullYear()} CVAts. Feito com{" "}
            <HeartIcon className="inline h-4 w-4 text-red-500" /> para ajudar 
            profissionais a conquistarem suas vagas.
          </p>

          {/* Links Rápidos */}
          <div className="flex items-center gap-4">
            <Link
              href="/resume-builder"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-bold transition-all hover:bg-gray-50"
            >
              <DocumentTextIcon className="h-4 w-4" />
              Criar Currículo
            </Link>
            <Link
              href="/resume-parser"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-bold transition-all hover:bg-gray-50"
            >
              <ChartBarIcon className="h-4 w-4" />
              Testar ATS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

