"use client";
import { Link } from "components/documentation";
import { useState } from "react";
import { ChevronDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const QAS = [
  {
    question:
      "P1. O que é um criador de currículos? Por que é melhor que modelos de documento?",
    answer: (
      <>
        <p>
          Existem duas maneiras de criar um currículo hoje. Uma opção é usar um
          modelo de currículo, como um documento do Word ou Google Docs, e
          personalizá-lo conforme suas necessidades. A outra opção é usar um
          criador de currículos, uma ferramenta online que permite inserir suas
          informações e gera automaticamente um currículo para você.
        </p>
        <p>
          Usar um modelo de currículo exige trabalho manual de formatação, como
          copiar e colar seções de texto e ajustar espaçamentos, o que pode ser
          demorado e propenso a erros. É fácil ter problemas de formatação, como
          usar diferentes marcadores ou estilos de fonte após copiar e colar. Por
          outro lado, um criador de currículos economiza tempo e evita erros de
          formatação ao formatar automaticamente o currículo. Ele também oferece
          a conveniência de alterar facilmente tipos ou tamanhos de fonte com um
          simples clique. Em resumo, um criador de currículos é mais fácil de
          usar em comparação com um modelo de currículo.
        </p>
      </>
    ),
  },
  {
    question:
      "P2. O que torna este criador de currículos único em relação a outros?",
    answer: (
      <>
        <p>
          Existem outros bons criadores de currículos gratuitos por aí, como{" "}
          <Link href="https://rxresu.me/">Reactive Resume</Link> e{" "}
          <Link href="https://flowcv.com/">FlowCV</Link>. No entanto, este se
          destaca com 2 características distintivas:
        </p>{" "}
        <p>
          <span className="font-semibold">
            1. Otimização específica para sistemas ATS (Applicant Tracking System).
          </span>
          <br />
          Diferente de outros criadores que oferecem muitas opções de
          personalização, este foca exclusivamente em recursos que funcionam
          perfeitamente com sistemas de rastreamento de candidatos. Por exemplo,
          não permite adicionar foto de perfil para evitar viés e discriminação.
          Oferece apenas as seções essenciais: perfil, experiência profissional,
          educação e habilidades, omitindo seções desnecessárias como
          referências. Além disso, usa apenas design de coluna única de cima para
          baixo, porque este formato funciona melhor com sistemas ATS e maximiza
          suas chances de aprovação. <br />{" "}
        </p>
        <p>
          <span className="font-semibold">
            2. Foco total em privacidade e segurança.
          </span>{" "}
          <br />
          Enquanto outros criadores de currículos podem exigir cadastro por email
          e armazenar dados de usuários em seus bancos de dados, acreditamos que
          os dados do currículo devem permanecer privados e acessíveis apenas na
          máquina local do usuário. Por isso, não exigimos cadastro para usar o
          aplicativo, e todos os dados inseridos são armazenados no navegador do
          usuário, onde apenas você tem acesso.
        </p>
      </>
    ),
  },
  {
    question: "P3. Por que criar currículos otimizados para ATS é tão importante?",
    answer: (
      <p>
        Mais de 98% das grandes empresas e 66% das empresas em geral utilizam
        sistemas ATS (Applicant Tracking System) para filtrar currículos antes
        mesmo de um recrutador humano ver sua candidatura. Esses sistemas
        automatizados analisam e classificam currículos com base em palavras-chave,
        formatação e estrutura. Um currículo mal formatado ou que não seja
        compatível com ATS pode ser rejeitado automaticamente, mesmo que você
        seja o candidato perfeito para a vaga. Este criador de currículos foi
        desenvolvido especificamente para garantir que seu currículo passe por
        esses filtros automatizados, aumentando drasticamente suas chances de
        ser visto por um recrutador real e conseguir aquela entrevista tão
        desejada. Nossa missão é ajudar qualquer pessoa a criar facilmente um
        currículo profissional e moderno que siga as melhores práticas e
        permitir que todos se candidatem a empregos com confiança.
      </p>
    ),
  },
  {
    question: "P4. Como posso apoiar este projeto?",
    answer: (
      <>
        <p>
          A melhor maneira de apoiar este projeto é compartilhar seus
          pensamentos e feedback conosco para ajudar a melhorá-lo ainda mais.
          Você pode nos enviar um email em{" "}
          <Link href="mailto:hello@open-resume.com">hello@open-resume.com</Link>{" "}
          ou{" "}
          <Link href="https://github.com/xitanggg/open-resume/issues/new">
            abrir uma issue
          </Link>{" "}
          em nosso repositório no Github. Seja você goste ou não, adoraríamos
          ouvir sua opinião.
        </p>
        <p>
          Outra ótima maneira de apoiar é divulgando o projeto. Compartilhe com
          seus amigos, nas redes sociais ou com o centro de carreiras da sua
          faculdade ou universidade. Nosso objetivo é alcançar mais pessoas que
          enfrentam dificuldades ao criar seus currículos, e seu apoio
          boca-a-boca seria muito apreciado. Se você usa Github, também pode
          mostrar seu apoio{" "}
          <Link href="https://github.com/xitanggg/open-resume">
            dando uma estrela ao projeto
          </Link>{" "}
          para ajudar a aumentar sua popularidade e alcance.
        </p>
      </>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-16 lg:py-24">
      {/* Título da Seção */}
      <div className="mb-12 text-center lg:mb-16">
        <div className="mb-4 inline-flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-black bg-orange-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <QuestionMarkCircleIcon className="h-9 w-9 text-gray-900" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
          Perguntas{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Frequentes</span>
            <span className="absolute bottom-1 left-0 h-4 w-full bg-orange-300 -z-0"></span>
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Tudo o que você precisa saber sobre o CVAts
        </p>
      </div>

      {/* Accordions */}
      <div className="mx-auto max-w-3xl">
        <div className="space-y-4 lg:space-y-6">
          {QAS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const colors = [
              "bg-yellow-300",
              "bg-blue-300",
              "bg-green-300",
              "bg-purple-300",
            ];
            const color = colors[index % colors.length];

            return (
              <div
                key={question}
                className="group relative transition-all"
              >
                {/* Sombra de fundo offset */}
                <div className={`absolute -right-2 -top-2 h-full w-full rounded-xl border-4 border-black ${color}`}></div>
                
                {/* Accordion Card */}
                <div className="relative z-10 overflow-hidden rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {/* Header (sempre visível) */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-gray-50 lg:p-8"
                  >
                    <h3 className="flex-grow text-lg font-bold text-gray-900 lg:text-xl">
                      {question}
                    </h3>
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border-3 border-black ${color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDownIcon className="h-6 w-6 text-gray-900" />
                    </div>
                  </button>

                  {/* Content (expansível) */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t-4 border-black bg-gray-50 p-6 lg:p-8">
                      <div className="space-y-4 text-base leading-relaxed text-gray-700 lg:text-lg">
                        {answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge de ajuda */}
      <div className="mt-12 text-center lg:mt-16">
        <div className="inline-block rounded-xl border-4 border-black bg-gradient-to-r from-blue-300 to-purple-300 px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-base font-bold text-gray-900 lg:text-lg">
            Ainda tem dúvidas?{" "}
            <Link
              href="mailto:hello@open-resume.com"
              className="underline decoration-2 underline-offset-4 hover:text-purple-900"
            >
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
