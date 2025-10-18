import { DocumentTextIcon, SparklesIcon, RocketLaunchIcon, BoltIcon } from "@heroicons/react/24/solid";

const STEPS = [
  { 
    title: "Importe seu currículo", 
    text: "ou crie do zero",
    color: "bg-yellow-300",
    icon: DocumentTextIcon
  },
  { 
    title: "Visualize e edite", 
    text: "com formatação profissional",
    color: "bg-blue-300",
    icon: SparklesIcon
  },
  { 
    title: "Baixe e candidate-se", 
    text: "com confiança e segurança",
    color: "bg-green-300",
    icon: RocketLaunchIcon
  },
];

export const Steps = () => {
  return (
    <section className="mx-auto mt-12 px-4 py-16 lg:mt-16 lg:py-20">
      {/* Título com destaque neo-brutal */}
      <div className="text-center">
        <h2 className="inline-block text-4xl font-bold text-gray-900 lg:text-5xl">
          3 Passos{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Simples</span>
            <span className="absolute bottom-1 left-0 h-4 w-full bg-yellow-300 -z-0"></span>
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Do zero ao currículo perfeito em minutos
        </p>
      </div>

      {/* Cards dos Passos */}
      <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:justify-center lg:gap-6">
        {STEPS.map(({ title, text, color, icon: Icon }, idx) => (
          <div
            key={idx}
            className="group relative mx-auto w-full max-w-sm transition-all hover:-translate-y-1"
          >
            {/* Sombra de fundo offset */}
            <div className={`absolute -right-2 -top-2 h-full w-full rounded-xl border-4 border-black ${color}`}></div>
            
            {/* Card principal */}
            <div className="relative z-10 rounded-xl border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:p-8">
              {/* Número do passo - estilo neo-brutal */}
              <div className="mb-4 flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-lg border-4 border-black ${color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                  <span className="text-3xl font-black text-gray-900">
                    {idx + 1}
                  </span>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-8 w-8 text-gray-900" />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">
                  {title}
                </h3>
                <p className="text-base font-medium text-gray-600">
                  {text}
                </p>
              </div>

              {/* Indicador de seta para o próximo passo (desktop) */}
              {idx < STEPS.length - 1 && (
                <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 lg:block">
                  <span className="text-4xl font-bold text-gray-300">→</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to action adicional */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-lg border-3 border-black bg-purple-100 px-6 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <BoltIcon className="h-5 w-5 text-purple-700" />
          <p className="text-sm font-bold text-gray-800">
            Tempo médio: <span className="text-purple-700">5 minutos</span>
          </p>
        </div>
      </div>
    </section>
  );
};
