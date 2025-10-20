import { Link } from "components/documentation";
import {
  SparklesIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";

const FEATURES = [
  {
    icon: SparklesIcon,
    title: "100% Gratuito",
    text: "Acreditamos que todos merecem acesso gratuito a um currículo profissional e moderno que aumente suas chances no mercado de trabalho",
    color: "bg-yellow-300",
    borderColor: "border-yellow-400",
  },
  {
    icon: ShieldCheckIcon,
    title: "Otimizado para ATS",
    text: "Compatível com os principais sistemas de rastreamento de candidatos (ATS) como Greenhouse, Lever e Workday. Seu currículo será lido corretamente pelos robôs de recrutamento",
    color: "bg-blue-300",
    borderColor: "border-blue-400",
  },
  {
    icon: LockClosedIcon,
    title: "Privacidade Total",
    text: "Seus dados ficam armazenados localmente no seu navegador. Apenas você tem acesso às suas informações, com controle total sobre sua privacidade",
    color: "bg-green-300",
    borderColor: "border-green-400",
  },
  {
    icon: CodeBracketIcon,
    title: "Código Aberto",
    text: (
      <>
        Este é um projeto de código aberto e transparente. Você pode visualizar
        o código-fonte completo no{" "}
        <Link href="https://github.com/rntxbr/cvats-app">
          repositório GitHub
        </Link>
      </>
    ),
    color: "bg-purple-300",
    borderColor: "border-purple-400",
  },
];

export const Features = () => {
  return (
    <section className="px-4 py-16 lg:py-24">
      {/* Título da Seção */}
      <div className="mb-12 text-center lg:mb-16">
        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
          Por que escolher o{" "}
          <span className="relative inline-block">
            <span className="relative z-10">CVAts</span>
            <span className="absolute bottom-1 left-0 h-4 w-full bg-red-300 -z-0"></span>
          </span>
          ?
        </h2>
        <p className="mt-4 text-xl font-bold ">
          Ferramentas poderosas para criar o currículo perfeito
        </p>
      </div>

      {/* Grid de Features */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {FEATURES.map(({ icon: Icon, title, text, color, borderColor }) => (
            <div
              key={title}
              className="group relative transition-all hover:-translate-y-1"
            >
              {/* Sombra de fundo offset */}
              <div
                className={`absolute -right-3 -top-3 h-full w-full rounded-2xl border-4 border-black ${color}`}
              ></div>

              {/* Card principal */}
              <div className="relative z-10 flex h-full flex-col rounded-2xl border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:p-8">
                {/* Ícone com fundo colorido */}
                <div className="mb-4 inline-flex">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl border-4 border-black ${color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                  >
                    <Icon className="h-9 w-9 text-gray-900" />
                  </div>
                </div>

                {/* Título */}
                <h3 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {title}
                </h3>

                {/* Texto descritivo */}
                <p className="flex-grow text-base leading-relaxed  lg:text-lg">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge de destaque */}
      <div className="mt-12 text-center lg:mt-16">
        <div className="inline-block rounded-xl border-4 border-black bg-gradient-to-r from-yellow-300 to-red-300 px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-base font-bold text-gray-900 lg:text-lg">
            Usado por milhares de profissionais para conquistar suas vagas dos
            sonhos
          </p>
        </div>
      </div>
    </section>
  );
};
