"use client";
import Link from "next/link";
import Image from "next/image";

const logoSrc = "/logo.svg";

export const TopNavBar = () => {

  return (
    <header
      aria-label="Site Header"
      className="fixed top-0 left-0 right-0 z-20 w-full flex justify-center items-center bg-[#f1eee1]"
    >
      <div className="bg-[#28584c] container m-4 rounded-xl px-4 sm:px-6 lg:px-10 py-3 grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="sr-only">cvats</span>
            <Image
              src={logoSrc}
              alt="cvats Logo"
              width={80}
              height={30}
              priority
            />
          </Link>
        </div>
        <nav className="justify-self-center flex items-center gap-2 flex-wrap justify-center">
          {[
            ["/resume-builder", "Criar Cúrriculo"],
            ["/resume-parser", "Análisar ATS"],

          ].map(([href, text]) => (
            <Link
              key={text}
              className="text-green-200 hover:text-[#6aac9c] px-4 py-2 rounded-xl min-w-[120px] sm:min-w-[150px] text-center font-bold tracking-tighter text-sm "
              href={href}
            >
              {text}
            </Link>
          ))}
        </nav>
        <Link
          style={{justifySelf: 'end'}}
          href="/about"
          className="text-green-200 hover:text-[#6aac9c] bg-[#2a4d44] px-4 py-2 rounded-xl min-w-[120px] sm:min-w-[150px] text-center font-bold tracking-tighter text-xs "
        >
          Sobre o Projeto
        </Link>
      </div>
    </header>
  );
};
