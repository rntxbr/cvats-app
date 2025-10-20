"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.png";
import {
  DocumentTextIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const NAV_LINKS = [
  {
    href: "/resume-builder",
    label: "Criar novo currículo",
    icon: DocumentTextIcon,
    color: "bg-blue-300",
  },
  {
    href: "/resume-parser",
    label: "Analisar meu Currículo",
    icon: ChartBarIcon,
    color: "bg-green-300",
  },
];

export const TopNavBar = () => {
  const pathName = usePathname();

  return (
    <header
      aria-label="Site Header"
      className="sticky top-0 z-50 w-full border-b-4 border-black bg-white shadow-[0_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="mx-auto container py-3 ">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Brand */}
          <Link href="/" className="group relative flex-shrink-0">
            <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-purple-300"></div>
            <div className="relative z-10 flex items-center gap-3 rounded-lg border-3 border-black bg-gradient-to-r from-yellow-300 to-red-300 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:px-5 lg:py-2.5">
              <Image
                src={logoSrc}
                alt="CVAts Logo"
                className="h-6 w-auto lg:h-7 rounded-lg"
                priority
              />
              <span className="text-xl font-black text-gray-900 lg:text-2xl">
                CVATS.com.br
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav
            aria-label="Site Nav Bar"
            className="flex items-center gap-2 lg:gap-3"
          >
            {NAV_LINKS.map(({ href, label, icon: Icon, color }) => {
              const isActive = pathName === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className="group relative hidden sm:block"
                >
                  <div
                    className={`absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black ${color}`}
                  ></div>
                  <div
                    className={`relative z-10 flex items-center gap-2 rounded-lg border-3 border-black bg-white px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:px-4 lg:py-2.5 ${
                      isActive ? "bg-gray-50" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 text-gray-900 lg:h-5 lg:w-5" />
                    <span className="hidden text-sm font-bold text-gray-900 lg:inline">
                      {label}
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Mobile Nav - Simplified */}
            <div className="flex gap-2 sm:hidden">
              <Link
                href="/resume-builder"
                className="rounded-lg border-3 border-black bg-blue-300 p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <DocumentTextIcon className="h-5 w-5 text-gray-900" />
              </Link>
              <Link
                href="/resume-parser"
                className="rounded-lg border-3 border-black bg-green-300 p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <ChartBarIcon className="h-5 w-5 text-gray-900" />
              </Link>
            </div>

            {/* GitHub Star Button */}
            <Link
              href="https://github.com/rntxbr/cvats-app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden lg:block"
            >
              <div className="absolute -right-1 -top-1 h-full w-full rounded-lg border-3 border-black bg-yellow-300"></div>
              <div className="relative z-10 flex items-center gap-2 rounded-lg border-3 border-black bg-white px-4 py-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <StarIcon className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-bold text-gray-900">Github</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
