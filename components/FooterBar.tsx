"use client";
import Link from "next/link";
import Image from "next/image";

const logoSrc = "/logo.svg";

export const FooterBar = () => {

    return (
        <footer
            aria-label="Site Footer"
            className="fixed bottom-0 left-0 right-0 w-full flex justify-center items-center bg-[#28584c] z-10"
        >
            <div className="bg-[#28584c] container px-4 sm:px-6 lg:px-10 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-2 justify-between rounded-t-xl">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <span className="sr-only">cvats</span>
                        <Image
                            src={logoSrc}
                            alt="cvats Logo"
                            width={100}
                            height={32}
                            priority
                        />
                    </Link>
                </div>
                <nav className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="text-green-200 text-sm">
                    Projeto Open Source
                    <Link
                        key=""
                        className="text-green-200 hover:text-[#6aac9c] ml-2 py-2 rounded-xl min-w-[120px] sm:min-w-[150px] text-center font-bold tracking-tighter text-sm "
                        href="https://github.com/rntxbr/cvats-app"
                    >
                        Contribua aqui
                    </Link>
                    </span> 
                   
                </nav>
                <button
                    className="text-green-200 hover:text-[#6aac9c] bg-[#2a4d44] px-4 py-2 rounded-xl text-center font-bold tracking-tighter text-xs "
                >
                    Versão 1.0.0
                </button>
            </div>
        </footer>
    );
};
