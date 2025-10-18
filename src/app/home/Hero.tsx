import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";

export const Hero = () => {
  return (
    <section className="px-4 py-12 lg:flex lg:min-h-[825px] lg:items-center lg:justify-center lg:py-20">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      
      {/* Conteúdo Principal */}
      <div className="mx-auto max-w-xl lg:mx-0 lg:grow">
        {/* Badge Neo-Brutal */}
        <div className="mb-6 inline-block">
          <span className="inline-block rounded-lg border-2 border-black bg-yellow-300 px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ✨ 100% Gratuito & Otimizado para ATS
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
          Crie um currículo
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">profissional</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-blue-300 -z-0"></span>
          </span>
          <br />
          otimizado para{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-purple-700">ATS</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-purple-300 -z-0"></span>
          </span>
        </h1>

        {/* Descrição */}
        <p className="mt-6 text-lg leading-relaxed text-gray-700 lg:text-xl">
          Aumente suas chances de aprovação com um currículo que{" "}
          <span className="font-bold text-gray-900">passa pelos sistemas de rastreamento</span>{" "}
          das empresas
        </p>

        {/* CTA Principal */}
        <div className="mt-8 lg:mt-12">
          <Link
            href="/resume-import"
            className="inline-block rounded-lg border-4 border-black bg-red-400 px-8 py-4 text-lg font-bold text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Criar Meu Currículo <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-4 text-sm font-medium text-gray-600">
            ✓ Sem cadastro necessário
          </p>
        </div>

        {/* Card de Info Secundária */}
        <div className="mt-8 inline-block p-4  lg:mt-20">
          <p className="text-sm font-medium text-gray-700">
            Já tem um currículo?{" "}
            <Link
              href="/resume-parser"
              className="font-bold text-purple-700 underline decoration-2 underline-offset-4 transition-colors hover:text-purple-900"
            >
              Teste sua compatibilidade com ATS
            </Link>
          </p>
        </div>
      </div>

      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      
      {/* Preview do Currículo */}
      <div className="mt-12 flex justify-center lg:mt-0 lg:block lg:grow">
        <div className="relative">
          {/* Decoração de fundo neo-brutal */}
          <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border-4 border-black bg-purple-200 lg:-right-6 lg:-top-6"></div>
          <div className="relative z-10">
            <AutoTypingResume />
          </div>
        </div>
      </div>
    </section>
  );
};
