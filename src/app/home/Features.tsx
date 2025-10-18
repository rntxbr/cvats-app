import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";
import { Link } from "components/documentation";

const FEATURES = [
  {
    src: featureFreeSrc,
    title: "100% Gratuito",
    text: "Acreditamos que todos merecem acesso gratuito a um currículo profissional e moderno que aumente suas chances no mercado de trabalho",
  },
  {
    src: featureUSSrc,
    title: "Otimizado para ATS",
    text: "Compatível com os principais sistemas de rastreamento de candidatos (ATS) como Greenhouse, Lever e Workday. Seu currículo será lido corretamente pelos robôs de recrutamento",
  },
  {
    src: featurePrivacySrc,
    title: "Privacidade Total",
    text: "Seus dados ficam armazenados localmente no seu navegador. Apenas você tem acesso às suas informações, com controle total sobre sua privacidade",
  },
  {
    src: featureOpenSourceSrc,
    title: "Código Aberto",
    text: (
      <>
        Este é um projeto de código aberto e transparente. Você pode visualizar
        o código-fonte completo no{" "}
        <Link href="https://github.com/xitanggg/open-resume">
          repositório GitHub
        </Link>
      </>
    ),
  },
];

export const Features = () => {
  return (
    <section className="py-16 lg:py-36">
      <div className="mx-auto lg:max-w-4xl">
        <dl className="grid grid-cols-1 justify-items-center gap-y-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-16">
          {FEATURES.map(({ src, title, text }) => (
            <div className="px-2" key={title}>
              <div className="relative w-96 self-center pl-16">
                <dt className="text-2xl font-bold">
                  <Image
                    src={src}
                    className="absolute left-0 top-1 h-12 w-12"
                    alt="Feature icon"
                  />
                  {title}
                </dt>
                <dd className="mt-2">{text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
