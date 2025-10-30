import { InformationCircleIcon, RocketLaunchIcon, DocumentTextIcon, CheckCircleIcon, BoltIcon } from "@heroicons/react/24/outline";

export const metadata = {
    title: "Sobre o Projeto | cvats",
    description: "Entenda a proposta do cvats, o problema que resolve e como participar do projeto open-source.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="bg-[#f1eee1] mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12 py-32 lg:py-24">
            <section className="pt-12">
                <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-7 w-7 text-[#28584c]" aria-hidden="true" />
                    <h2 className="mt-0 text-2xl font-bold text-[#28584c]">Sobre o projeto</h2>
                </div>
                <p className="mt-[1.5em] text-lg text-[#28584c]">
                    O <strong>cvats</strong> é um construtor de currículos focado em compatibilidade com ATS (Applicant Tracking Systems). Ele ajuda você a criar currículos limpos, sem ruídos e com estrutura semântica que maximiza a leitura automática por sistemas de triagem.
                </p>
                <p className="mt-[0.8em] text-lg text-[#28584c]">
                    O projeto é <strong>open-source</strong>, gratuito e pensado para ser simples de usar. Você pode montar seu currículo, visualizar em tempo real, exportar em PDF e manter as informações organizadas por perfil, experiências, projetos, educação e habilidades.
                </p>
            </section>

            <section>
                <div className="mt-10 flex items-start gap-3">
                    <BoltIcon className="h-7 w-7 text-[#28584c]" aria-hidden="true" />
                    <h2 className="mt-0 text-xl font-bold text-[#28584c]">Que problema resolvemos</h2>
                </div>
                <p className="mt-[1.5em] text-lg text-[#28584c]">
                    Muitos currículos bonitos falham em processos automatizados. O <strong>cvats</strong> foca em:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-[#28584c]">
                    <li>
                        <span className="font-semibold">Compatibilidade com ATS</span>: layout, tipografia e hierarquia pensados para captura correta por sistemas.
                    </li>
                    <li>
                        <span className="font-semibold">Estrutura clara</span>: seções padronizadas (Perfil, Experiências, Educação, Projetos, Habilidades) com dados consistentes.
                    </li>
                    <li>
                        <span className="font-semibold">Exportação em PDF</span>: geração de PDF limpa, com foco em legibilidade e sem elementos que confundem parsers.
                    </li>
                    <li>
                        <span className="font-semibold">Privacidade</span>: tudo roda no seu navegador; você decide o que salvar/exportar.
                    </li>
                </ul>
            </section>

            <section>
                <div className="mt-10 flex items-start gap-3">
                    <DocumentTextIcon className="h-7 w-7 text-[#28584c]" aria-hidden="true" />
                    <h2 className="mt-0 text-xl font-bold text-[#28584c]">Como participar</h2>
                </div>
                <p className="mt-[1.5em] text-lg text-[#28584c]">
                    Contribuições são muito bem-vindas! Você pode ajudar de várias formas:
                </p>
                <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg text-[#28584c]">
                <li>
                        <span className="font-semibold">Compartilhe</span>: Compartilhe o projeto com seus amigos.
                    </li>
                    <li>
                        <span className="font-semibold">Sugira melhorias</span>: abra uma Issue com ideias, bugs ou dúvidas.
                    </li>
                    <li>
                        <span className="font-semibold">Envie um PR</span>: faça um fork, crie uma branch e abra um Pull Request descrevendo a mudança.
                    </li>
                    <li>
                        <span className="font-semibold">Documente</span>: melhore textos, exemplos e acessibilidade.
                    </li>
                    <li>
                        <span className="font-semibold">Teste</span>: reporte comportamentos inesperados e ajude a cobrir casos de uso.
                    </li>
                </ol>
                <p className="mt-[0.8em] text-lg text-[#28584c]">
                    Repositório no GitHub: <a href="https://github.com/rntxbr/cvats-app" target="_blank" className="underline underline-offset-2 hover:decoration-2">rntxbr/cvats-app</a>
                </p>
            </section>

            <section>
                <div className="mt-10 flex items-start gap-3">
                    <RocketLaunchIcon className="h-7 w-7 text-[#28584c]" aria-hidden="true" />
                    <h2 className="mt-0 text-xl font-bold text-[#28584c]">Estado atual e próximos passos</h2>
                </div>
                <p className="mt-[1.5em] text-lg text-[#28584c]">
                    O projeto está evoluindo de forma incremental. Priorizamos estabilidade, legibilidade e compatibilidade com ATS. Sugestões de temas, componentes e templates são bem-vindas.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-[#28584c]">
                    <li>
                        <CheckCircleIcon className="mr-2 inline h-5 w-5 text-green-600" aria-hidden="true" /> Compatibilidade ATS como prioridade
                    </li>
                    <li>
                        <CheckCircleIcon className="mr-2 inline h-5 w-5 text-green-600" aria-hidden="true" /> Exportação PDF estável
                    </li>
                    <li>
                        <CheckCircleIcon className="mr-2 inline h-5 w-5 text-green-600" aria-hidden="true" /> UI limpa e responsiva
                    </li>
                </ul>
            </section>
        </main>
    )
}