import Link from "next/link";
import { LottieWorkflow } from "./LottieWorkflow";
import { FaArrowRight } from "react-icons/fa";


export const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 mt-16 min-h-[70vh]">
      
      <div className="w-full flex flex-col items-center lg:items-start justify-center text-center lg:text-left mt-10">
        <span className="text-xs sm:text-sm bg-[#28584c36] text-[#28584c] px-6 sm:px-8 py-1.5 sm:py-2 rounded-full font-bold inline-block ">Seu futuro profissional começa aqui.</span>
        <h1 className="text-[#28584c] pb-2 text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl mt-6">
        Pare de ser Ignorado.<br /> 
        Crie. Otimize. Desbloqueie seu currículo.
        </h1>
        <p className="mt-3 text-base sm:text-lg lg:mt-5 lg:text-xl max-w-xl tracking-tight">
        Gere currículos 100% compatíveis com ATS. <br />  De graça e em poucos minutos.  
        </p>
        <div className="flex items-center gap-2">
        <Link href="/resume-import" className="inline-flex justify-center items-center gap-2 bg-[#28584c] text-white px-8 sm:px-10 py-4 rounded-xl font-bold mt-6 w-full sm:w-auto transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#1f473d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#28584c]">
          Criar currículo <FaArrowRight />
        </Link>
        <Link href="/resume-parser" className="inline-flex justify-center items-center gap-2 bg-[#28584c36] text-[#28584c] px-8 sm:px-10 py-4 rounded-xl font-bold mt-6 w-full sm:w-auto transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#28584c26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#28584c]">
         Análisar Currículo <FaArrowRight />
        </Link>
        </div>
        <p className="mt-3 text-sm text-[#28584c] font-bold lg:ml-2">Não é necessário cadastro</p>
      </div>
      <div className="relative overflow-visible mt-10">
      <div className="absolute right-0 h-64 w-64 bg-[#28584c36] rounded-3xl"></div>
      <div className="absolute left-0 bottom-0 h-64 w-64 bg-[#28584c36] rounded-3xl"></div>
        <div className="w-full overflow-visible ">
          <LottieWorkflow /> 
        </div>
      </div>
    </section>
  );
};
