# CVAts

CVAts é um poderoso criador e analisador de currículos de código aberto.

O objetivo do CVAts é fornecer a todos acesso gratuito a um design de currículo profissional moderno e permitir que qualquer pessoa se candidate a empregos com confiança.

Site oficial: [https://cvats.com.br](https://cvats.com.br)

![CVAts Screenshot](print.png)

## ⚒️ Criador de Currículos

O criador de currículos do CVAts permite que o usuário crie um currículo profissional moderno facilmente.

Possui 5 Funcionalidades Principais:
| <div style="width:285px">**Funcionalidade**</div> | **Descrição** |
|---|---|
| **1. Atualização em Tempo Real** | O PDF do currículo é atualizado em tempo real conforme você insere suas informações, para que você possa visualizar facilmente o resultado final. |
| **2. Design Profissional Moderno** | O PDF do currículo possui um design profissional moderno que adere às melhores práticas e é compatível com os principais sistemas ATS, como Greenhouse, Lever e Workday. Formata automaticamente fontes, tamanhos, margens e marcadores para garantir consistência e evitar erros humanos. |
| **3. Foco em Privacidade** | O aplicativo roda apenas localmente no seu navegador, o que significa que nenhum cadastro é necessário e nenhum dado sai do seu navegador, garantindo total segurança dos seus dados pessoais. (Curiosidade: Rodar apenas localmente significa que o aplicativo ainda funciona mesmo se você desconectar a internet.) |
| **4. Importação de PDF Existente** | Se você já tem um currículo em PDF, tem a opção de importá-lo diretamente, podendo atualizar o design do seu currículo para um design profissional moderno em literalmente alguns segundos. |
| **5. Histórico de Sucesso Comprovado** | Usuários do CVAts conseguiram entrevistas e ofertas de grandes empresas, como Dropbox, Google e Meta, entre outras. Foi comprovado que funciona e é aprovado por recrutadores e gerentes de contratação. |

## 🔍 Analisador de Currículos

O segundo componente do CVAts é o analisador de currículos. Para aqueles que já têm um currículo existente, o analisador pode ajudar a testar e confirmar sua compatibilidade com sistemas ATS.

Você pode aprender mais sobre o algoritmo do analisador na [seção "Mergulho Profundo no Algoritmo do Analisador"](https://cvats.com.br/resume-parser).

## 📚 Stack Tecnológica

| <div style="width:140px">**Categoria**</div> | <div style="width:100px">**Escolha**</div>                  | **Descrição**                                                                                                                                              |
| -------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Linguagem**                                | [TypeScript](https://github.com/microsoft/TypeScript)       | TypeScript é JavaScript com verificação de tipo estática e ajuda a detectar muitos bugs bobos em tempo de código.                                          |
| **Biblioteca de UI**                         | [React](https://github.com/facebook/react)                  | A sintaxe declarativa e arquitetura baseada em componentes do React torna simples desenvolver componentes reutilizáveis e reativos.                        |
| **Gerenciamento de Estado**                  | [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)   | Redux toolkit reduz o código repetitivo para configurar e atualizar uma store redux central, que é usada no gerenciamento do estado complexo do currículo. |
| **Framework CSS**                            | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Tailwind acelera o desenvolvimento fornecendo utilitários CSS úteis e removendo a necessidade de alternar contexto entre arquivos tsx e css.               |
| **Framework Web**                            | [NextJS 13](https://github.com/vercel/next.js)              | Next.js suporta geração de sites estáticos e ajuda a construir páginas React eficientes que suportam SEO.                                                  |
| **Leitor de PDF**                            | [PDF.js](https://github.com/mozilla/pdf.js)                 | PDF.js lê conteúdo de arquivos PDF e é usado pelo analisador de currículos em sua primeira etapa para ler o conteúdo de um PDF de currículo.               |
| **Renderizador de PDF**                      | [React-pdf](https://github.com/diegomura/react-pdf)         | React-pdf cria arquivos PDF e é usado pelo criador de currículos para criar um arquivo PDF para download.                                                  |

## 📁 Estrutura do Projeto

O CVAts é criado com o framework web NextJS e segue sua estrutura de projeto. O código-fonte pode ser encontrado em `src/app`. Há um total de 4 rotas de página, conforme mostrado na tabela abaixo. (O caminho do código é relativo a `src/app`)

| <div style="width:115px">**Rota da Página**</div> | **Caminho do Código**    | **Descrição**                                                                                                                                                                                    |
| ------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /                                                 | /page.tsx                | Página inicial que contém hero, currículo com digitação automática, passos, depoimentos, nuvem de logos, etc                                                                                     |
| /resume-import                                    | /resume-import/page.tsx  | Página de importação de currículo, onde você pode escolher importar dados de um PDF de currículo existente. O componente principal usado é `ResumeDropzone` (`/components/ResumeDropzone.tsx`)   |
| /resume-builder                                   | /resume-builder/page.tsx | Página do criador de currículos para construir e baixar um PDF de currículo. Os componentes principais usados são `ResumeForm` (`/components/ResumeForm`) e `Resume` (`/components/Resume`)      |
| /resume-parser                                    | /resume-parser/page.tsx  | Página do analisador de currículos para testar a compatibilidade do currículo com sistemas ATS. O utilitário de biblioteca principal usado é `parseResumeFromPdf` (`/lib/parse-resume-from-pdf`) |

## 💻 Desenvolvimento Local

### Método 1: npm

1. Baixe o repositório `git clone https://github.com/rntxbr/cvats-app.git`
2. Mude para o diretório `cd cvats-app`
3. Instale as dependências `npm install`
4. Inicie um servidor de desenvolvimento `npm run dev`
5. Abra seu navegador e visite [http://localhost:3000](http://localhost:3000) para ver o CVAts em ação

### Método 2: Docker

1. Baixe o repositório `git clone https://github.com/rntxbr/cvats-app.git`
2. Mude para o diretório `cd cvats-app`
3. Construa o container `docker build -t cvats .`
4. Inicie o container `docker run -p 3000:3000 cvats`
5. Abra seu navegador e visite [http://localhost:3000](http://localhost:3000) para ver o CVAts em ação
