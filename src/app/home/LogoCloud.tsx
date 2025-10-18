import logoCornellSrc from "public/assets/logo-cornell.svg";
import logoColumbiaSrc from "public/assets/logo-columbia.svg";
import logoNortheasternSrc from "public/assets/logo-northeastern.svg";
import logoDropboxSrc from "public/assets/logo-dropbox.svg";
import logoGoogleSrc from "public/assets/logo-google.svg";
import logoAmazonSrc from "public/assets/logo-amazon.svg";
import Image from "next/image";

const LOGOS = [
  { src: logoCornellSrc, alt: "Logo da Universidade Cornell" },
  { src: logoColumbiaSrc, alt: "Logo da Universidade Columbia" },
  { src: logoNortheasternSrc, alt: "Logo da Universidade Northeastern" },
  { src: logoDropboxSrc, alt: "Logo do Dropbox" },
  { src: logoGoogleSrc, alt: "Logo do Google" },
  { src: logoAmazonSrc, alt: "Logo da Amazon" },
];

// LogoCloud is disabled per issue: https://github.com/xitanggg/open-resume/issues/7
export const LogoCloud = () => (
  <section className="mt-14 lg:mt-10">
    <h2 className="text-center font-semibold text-gray-500">
      Confiado por estudantes e profissionais das melhores universidades e empresas
      do mundo
    </h2>
    <div className="mt-6 grid grid-cols-6 items-center justify-items-center gap-x-8 gap-y-10">
      {LOGOS.map(({ src, alt }, idx) => (
        <Image
          key={idx}
          className="col-span-3 h-full max-h-10 max-w-[130px] lg:col-span-1 lg:max-w-[160px]"
          src={src}
          alt={alt}
        />
      ))}
    </div>
  </section>
);
