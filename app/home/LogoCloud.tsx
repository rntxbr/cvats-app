import Image from "next/image";

const logoCornellSrc = "/assets/logo-cornell.svg";
const logoColumbiaSrc = "/assets/logo-columbia.svg";
const logoNortheasternSrc = "/assets/logo-northeastern.svg";
const logoDropboxSrc = "/assets/logo-dropbox.svg";
const logoGoogleSrc = "/assets/logo-google.svg";
const logoAmazonSrc = "/assets/logo-amazon.svg";

const LOGOS = [
  { src: logoCornellSrc, alt: "Cornell University logo" },
  { src: logoColumbiaSrc, alt: "Columbia University logo" },
  { src: logoNortheasternSrc, alt: "Northeastern University logo" },
  { src: logoDropboxSrc, alt: "Dropbox logo" },
  { src: logoGoogleSrc, alt: "Google logo" },
  { src: logoAmazonSrc, alt: "Amazon logo" },
];

// LogoCloud is disabled per issue: https://github.com/xitanggg/open-resume/issues/7
export const LogoCloud = () => (
  <section className="mt-14 lg:mt-10">
    <h2 className="text-center font-semibold text-gray-500">
      Trusted by students and employees from top universities and companies
      worldwide
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
