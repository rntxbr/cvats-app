"use client";
import testimonialSpiegelSrc from "public/assets/testimonial-spiegel.jpg";
import testimonialSantiSrc from "public/assets/testimonial-santi.jpg";
import testimonialVivianSrc from "public/assets/testimonial-vivian.jpg";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";
import {
  HeartIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

const TESTIMONIALS = [
  {
    src: testimonialSpiegelSrc,
    quote:
      "Estudantes frequentemente cometem erros bobos em seus currículos usando marcadores ou tamanhos de fonte inconsistentes. A formatação automática desta ferramenta é uma grande ajuda para garantir um formato consistente e profissional.",
    name: "Profª. Silva",
    title: "Educadora",
    color: "bg-yellow-300",
    rating: 5,
  },
  {
    src: testimonialSantiSrc,
    quote:
      "Usei esta ferramenta durante minha última busca por emprego e fui convidado para entrevistas em grandes empresas de tecnologia como Google e Amazon graças ao seu design elegante e profissional otimizado para ATS.",
    name: "Santiago",
    title: "Engenheiro de Software",
    color: "bg-blue-300",
    rating: 5,
  },
  {
    src: testimonialVivianSrc,
    quote:
      "Criar um currículo profissional com esta ferramenta é tão suave e fácil! Me economiza muito tempo e dor de cabeça por não ter que lidar com modelos do Google Docs ou Word.",
    name: "Viviane",
    title: "Estudante Universitária",
    color: "bg-green-300",
    rating: 5,
  },
];

const LG_TESTIMONIALS_CLASSNAMES = [
  "z-10",
  "translate-x-44 translate-y-24 opacity-40",
  "translate-x-32 -translate-y-28 opacity-40",
];
const SM_TESTIMONIALS_CLASSNAMES = ["z-10", "opacity-0", "opacity-0"];
const ROTATION_INTERVAL_MS = 8 * 1000; // 8s

export const Testimonials = ({ children }: { children?: React.ReactNode }) => {
  const [testimonialsClassNames, setTestimonialsClassNames] = useState(
    LG_TESTIMONIALS_CLASSNAMES
  );
  const isHoveredOnTestimonial = useRef(false);
  const { isLg } = useTailwindBreakpoints();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHoveredOnTestimonial.current) {
        setTestimonialsClassNames((preClassNames) => {
          return [preClassNames[1], preClassNames[2], preClassNames[0]];
        });
      }
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTestimonialsClassNames(
      isLg ? LG_TESTIMONIALS_CLASSNAMES : SM_TESTIMONIALS_CLASSNAMES
    );
  }, [isLg]);

  return (
    <section className="mx-auto px-4 py-16 lg:py-24">
      {/* Título da Seção */}
      <div className="mb-12 text-center lg:mb-16">
        <div className="mb-4 inline-flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-black bg-red-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <HeartIcon className="h-9 w-9 text-red-600" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
          O que dizem{" "}
          <span className="relative inline-block">
            <span className="relative z-10">nossos usuários</span>
            <span className="absolute bottom-1 left-0 h-4 w-full bg-red-300 -z-0"></span>
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Histórias reais de quem conquistou suas vagas
        </p>
      </div>

      {/* Cards de Depoimentos com animação original */}
      <div className="mx-auto mt-10 h-[280px] max-w-3xl lg:h-[400px] lg:pt-28">
        <div className="relative lg:ml-[-50px]">
          {TESTIMONIALS.map(
            ({ src, quote, name, title, color, rating }, idx) => {
              const className = testimonialsClassNames[idx];
              return (
                <div
                  key={idx}
                  className={`absolute max-w-3xl transition-all duration-1000 ease-linear ${className}`}
                  onMouseEnter={() => {
                    if (className === "z-10") {
                      isHoveredOnTestimonial.current = true;
                    }
                  }}
                  onMouseLeave={() => {
                    if (className === "z-10") {
                      isHoveredOnTestimonial.current = false;
                    }
                  }}
                >
                  {/* Card Neo-Brutal */}
                  <div className="relative">
                    {/* Sombra de fundo offset colorida */}
                    <div
                      className={`absolute -right-2 -top-2 h-full w-full rounded-2xl border-4 border-black ${color}`}
                    ></div>

                    {/* Card principal */}
                    <figure className="relative z-10 flex gap-4 rounded-2xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:gap-6 lg:p-7">
                      {/* Foto com efeito 3D */}
                      <div className="relative hidden flex-shrink-0 lg:block">
                        <div
                          className={`absolute -right-1 -top-1 h-24 w-24 rounded-full border-3 border-black ${color}`}
                        ></div>
                        <Image
                          className="relative z-10 h-24 w-24 select-none rounded-full border-3 border-black object-cover"
                          src={src}
                          alt={`Foto de ${name}`}
                        />
                      </div>

                      <div className="flex-1">
                        {/* Ícone de citação */}
                        <div className="mb-3 inline-flex">
                          <div
                            className={`rounded-lg border-3 border-black ${color} p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                          >
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-900" />
                          </div>
                        </div>

                        {/* Citação */}
                        <blockquote>
                          <p className="text-base leading-relaxed  lg:text-lg">
                            "{quote}"
                          </p>
                        </blockquote>

                        {/* Rating */}
                        <div className="my-3 flex gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                            />
                          ))}
                        </div>

                        {/* Autor */}
                        <figcaption className="mt-3">
                          <div className="hidden gap-2 lg:flex">
                            <div className="font-bold text-gray-900">
                              {name}
                            </div>
                            <div className="select-none " aria-hidden="true">
                              •
                            </div>
                            <div className="font-medium text-gray-600">
                              {title}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 lg:hidden">
                            <div className="relative">
                              <div
                                className={`absolute -right-1 -top-1 h-12 w-12 rounded-full border-2 border-black ${color}`}
                              ></div>
                              <Image
                                className="relative z-10 h-12 w-12 select-none rounded-full border-2 border-black object-cover"
                                src={src}
                                alt={`Foto de ${name}`}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">
                                {name}
                              </div>
                              <div className="text-sm font-medium text-gray-600">
                                {title}
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </div>
                    </figure>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {children}
    </section>
  );
};
