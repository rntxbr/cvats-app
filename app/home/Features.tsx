import Image from "next/image";
import { Link } from "@/components/documentation/Link";

const featureFreeSrc = "/assets/feature-free.svg";
const featureUSSrc = "/assets/feature-us.svg";
const featurePrivacySrc = "/assets/feature-privacy.svg";
const featureOpenSourceSrc = "/assets/feature-open-source.svg";

const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Free Forever",
    text: "cvats is created with the belief that everyone should have free and easy access to a modern professional resume design",
  },
  {
    src: featureUSSrc,
    title: "U.S. Best Practices",
    text: "cvats has built-in best practices for the U.S. job market and works well with top ATS platforms such as Greenhouse and Lever",
  },
  {
    src: featurePrivacySrc,
    title: "Privacy Focus",
    text: "cvats stores data locally in your browser so only you have access to your data and with complete control",
  },
  {
    src: featureOpenSourceSrc,
    title: "Open-Source",
    text: (
      <>
        cvats is an open-source project, and its source code can be viewed
        by anyone on its{" "}
        <Link href="https://github.com/xitanggg/open-resume">
          GitHub repository
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
                    width={48}
                    height={48}
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
