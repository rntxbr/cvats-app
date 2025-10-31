"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTailwindBreakpoints } from "@/app/lib/hooks/useTailwindBreakpoints";

const logoSrc = "/logo.svg";

const menuItems = [
  ["/resume-builder", "Criar Cúrriculo"],
  ["/resume-parser", "Análisar ATS"],
  ["/about", "Sobre o Projeto"],
];

export const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMd } = useTailwindBreakpoints();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      aria-label="Site Header"
      className="fixed top-0 left-0 right-0 z-20 w-full flex justify-center items-center bg-[#f1eee1]"
    >
      <div className="bg-[#28584c] container m-4 rounded-xl px-4 sm:px-6 lg:px-10 py-3 relative">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="sr-only">cvats</span>
              <Image src={logoSrc} alt="cvats Logo" width={80} height={30} priority />
            </Link>
          </div>
          <nav className="justify-self-center flex items-center gap-2 flex-wrap justify-center">
            {menuItems.slice(0, 2).map(([href, text]) => (
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
            style={{ justifySelf: "end" }}
            href="/about"
            className="text-green-200 hover:text-[#6aac9c] bg-[#2a4d44] px-4 py-2 rounded-xl min-w-[120px] sm:min-w-[150px] text-center font-bold tracking-tighter text-xs "
          >
            Sobre o Projeto
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" onClick={closeMenu}>
            <span className="sr-only">cvats</span>
            <Image src={logoSrc} alt="cvats Logo" width={80} height={30} priority />
          </Link>

          <button
            onClick={toggleMenu}
            className="text-green-200 hover:text-[#6aac9c] p-2 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-10"
                onClick={closeMenu}
                aria-hidden="true"
              />
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#28584c] rounded-xl shadow-lg z-20 py-2">
                <nav className="flex flex-col">
                  {menuItems.map(([href, text]) => (
                    <Link
                      key={text}
                      href={href}
                      onClick={closeMenu}
                      className={`text-green-200 hover:text-[#6aac9c] px-4 py-3 text-center font-bold tracking-tighter text-sm transition-colors ${
                        href === "/about" ? "bg-[#2a4d44]" : ""
                      }`}
                    >
                      {text}
                    </Link>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
