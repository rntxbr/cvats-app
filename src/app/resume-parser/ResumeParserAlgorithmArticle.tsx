import { isBold } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import {
  Badge,
  Heading,
  Link,
  Paragraph,
  Table,
} from "components/documentation";
import type {
  Line,
  Lines,
  ResumeSectionToLines,
  TextItem,
  TextItems,
  TextScores,
} from "lib/parse-resume-from-pdf/types";
import { extractProfile } from "lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";

export const ResumeParserAlgorithmArticle = ({
  textItems,
  lines,
  sections,
}: {
  textItems: TextItems;
  lines: Lines;
  sections: ResumeSectionToLines;
}) => {
  const getBadgeContent = (item: TextItem) => {
    const X1 = Math.round(item.x);
    const X2 = Math.round(item.x + item.width);
    const Y = Math.round(item.y);
    let content = `X₁=${X1} X₂=${X2} Y=${Y}`;
    if (X1 === X2) {
      content = `X=${X2} Y=${Y}`;
    }
    if (isBold(item)) {
      content = `${content} Bold`;
    }
    if (item.hasEOL) {
      content = `${content} NewLine`;
    }
    return content;
  };
  const step1TextItemsTable = [
    ["#", "Conteúdo de Texto", "Metadados"],
    ...textItems.map((item, idx) => [
      idx + 1,
      item.text,
      <Badge key={idx}>{getBadgeContent(item)}</Badge>,
    ]),
  ];

  const step2LinesTable = [
    ["Linhas", "Conteúdo da Linha"],
    ...lines.map((line, idx) => [
      idx + 1,
      line.map((item, idx) => (
        <span key={idx}>
          {item.text}
          {idx !== line.length - 1 && (
            <span className="select-none font-extrabold text-sky-400">
              &nbsp;&nbsp;{"|"}&nbsp;&nbsp;
            </span>
          )}
        </span>
      )),
    ]),
  ];

  const { profile, profileScores } = extractProfile(sections);
  const Scores = ({ scores }: { scores: TextScores }) => {
    return (
      <>
        {scores
          .sort((a, b) => b.score - a.score)
          .map((item, idx) => (
            <span key={idx} className="break-all">
              <Badge>{item.score}</Badge> {item.text}
              <br />
            </span>
          ))}
      </>
    );
  };
  const step4ProfileFeatureScoresTable = [
    [
      "Atributo de Currículo",
      "Texto (Maior Pontuação de Recurso)",
      "Pontuações de Recursos de Outros Textos",
    ],
    ["Nome", profile.name, <Scores key={"Name"} scores={profileScores.name} />],
    [
      "Email",
      profile.email,
      <Scores key={"Email"} scores={profileScores.email} />,
    ],
    [
      "Telefone",
      profile.phone,
      <Scores key={"Phone"} scores={profileScores.phone} />,
    ],
  ];

  return (
    <article className="mt-10">
      <Heading className="text-primary !mt-0 border-t-4 border-black pt-8">
        Mergulho Profundo no Algoritmo do Analisador
      </Heading>
      <Paragraph smallMarginTop={true}>
        Para os curiosos técnicos, esta seção mergulha no algoritmo do analisador
        CVAts e percorre os 4 passos de como ele funciona. (Note que o algoritmo
        foi projetado para analisar currículos de coluna única em português e inglês)
      </Paragraph>
      {/* Passo 1. Ler os itens de texto de um arquivo PDF */}
      <Heading level={2}>Passo 1. Ler os itens de texto de um arquivo PDF</Heading>
      <Paragraph smallMarginTop={true}>
        Um arquivo PDF é um formato de arquivo padronizado definido pela{" "}
        <Link href="https://www.iso.org/standard/51502.html">
          especificação ISO 32000
        </Link>
        . Quando você abre um arquivo PDF usando um editor de texto, notará que
        o conteúdo bruto parece codificado e é difícil de ler. Para exibi-lo em
        um formato legível, você precisaria de um leitor de PDF para decodificar
        e visualizar o arquivo. Da mesma forma, o analisador de currículos
        primeiro precisa decodificar o arquivo PDF para extrair seu conteúdo de texto.
      </Paragraph>
      <Paragraph>
        Embora seja possível escrever uma função personalizada de leitura de PDF
        seguindo a especificação ISO 32000, é muito mais simples aproveitar uma
        biblioteca existente. Neste caso, o analisador de currículos usa a
        biblioteca de código aberto{" "}
        <Link href="https://github.com/mozilla/pdf.js">pdf.js</Link> da Mozilla
        para primeiro extrair todos os itens de texto no arquivo.
      </Paragraph>
      <Paragraph>
        A tabela abaixo lista {textItems.length} itens de texto que são extraídos
        do PDF do currículo adicionado. Um item de texto contém o conteúdo de texto
        e também alguns metadados sobre o conteúdo, por exemplo, suas posições x, y
        no documento, se a fonte está em negrito ou se inicia uma nova linha.
        (Note que a posição x,y é relativa ao canto inferior esquerdo da página,
        que é a origem 0,0)
      </Paragraph>
      <div className="mt-4 max-h-72 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
        <Table
          table={step1TextItemsTable}
          className="!border-none"
          tdClassNames={["", "", "md:whitespace-nowrap"]}
        />
      </div>
      {/* Passo 2. Agrupar itens de texto em linhas */}
      <Heading level={2}>Passo 2. Agrupar itens de texto em linhas</Heading>
      <Paragraph smallMarginTop={true}>
        Os itens de texto extraídos ainda não estão prontos para usar e têm 2 problemas principais:
      </Paragraph>
      <Paragraph>
        <span className="mt-3 block font-semibold">
          Problema 1: Eles têm alguns ruídos indesejados.
        </span>
        Alguns itens de texto únicos podem ser quebrados em múltiplos, como você
        pode observar na tabela acima, por exemplo, um número de telefone
        "(11) 98765-4321" pode ser quebrado em 3 itens de texto "(11) 98765", "-" e "4321".
      </Paragraph>
      <Paragraph smallMarginTop={true}>
        <span className="font-semibold">Solução:</span> Para resolver este problema,
        o analisador de currículos conecta itens de texto adjacentes em um único
        item de texto se a distância entre eles for menor que a largura média
        típica de caractere, onde
        <span
          dangerouslySetInnerHTML={{
            __html: `<math display="block">
                        <mrow>
                            <mn>Distance </mn>
                            <mo>=</mo>
                            <mn>RightTextItemX₁</mn>
                            <mo>-</mo>
                            <mn>LeftTextItemX₂</mn>
                        </mrow>
                    </math>`,
          }}
          className="my-2 block text-left text-base"
        />
        A largura média típica de caractere é calculada dividindo a soma das
        larguras de todos os itens de texto pelo número total de caracteres dos
        itens de texto (Textos em negrito e elementos de nova linha são excluídos
        para não distorcer os resultados).
      </Paragraph>
      <Paragraph>
        <span className="mt-3 block font-semibold">
          Problema 2: Eles carecem de contextos e associações.
        </span>
        Quando lemos um currículo, escaneamos linha por linha. Nossos cérebros
        podem processar cada seção por meio de pistas visuais como negrito e
        proximidade dos textos, onde podemos rapidamente associar textos mais
        próximos como um grupo relacionado. No entanto, os itens de texto
        extraídos atualmente não têm esses contextos/associações e são apenas
        elementos desconexos.
      </Paragraph>
      <Paragraph smallMarginTop={true}>
        <span className="font-semibold">Solução:</span> Para resolver este problema,
        o analisador de currículos reconstrói esses contextos e associações de
        forma similar a como nosso cérebro leria e processaria o currículo. Primeiro
        agrupa os itens de texto em linhas, já que lemos texto linha por linha.
        Em seguida, agrupa linhas em seções, o que será discutido no próximo passo.
      </Paragraph>
      <Paragraph>
        No final do passo 2, o analisador de currículos extrai {lines.length} linhas
        do PDF do currículo adicionado, conforme mostrado na tabela abaixo. O
        resultado é muito mais legível quando exibido em linhas. (Algumas linhas
        podem ter múltiplos itens de texto, que são separados por um divisor
        vertical azul{" "}
        <span className="select-none font-extrabold text-sky-400">
          &nbsp;{"|"}&nbsp;
        </span>
        )
      </Paragraph>
      <div className="mt-4 max-h-96 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
        <Table table={step2LinesTable} className="!border-none" />
      </div>
      {/* Passo 3. Agrupar linhas em seções */}
      <Heading level={2}>Passo 3. Agrupar linhas em seções</Heading>
      <Paragraph smallMarginTop={true}>
        No passo 2, o analisador de currículos começa a construir contextos e
        associações aos itens de texto agrupando-os primeiro em linhas. O Passo 3
        continua o processo para construir associações adicionais agrupando
        linhas em seções.
      </Paragraph>
      <Paragraph>
        Note que cada seção (exceto a seção de perfil) começa com um título de
        seção que ocupa toda a linha. Este é um padrão comum não apenas em
        currículos, mas também em livros e blogs. O analisador de currículos usa
        este padrão para agrupar linhas no título de seção mais próximo acima
        dessas linhas.
      </Paragraph>
      <Paragraph>
        O analisador de currículos aplica algumas heurísticas para detectar um
        título de seção. A principal heurística para determinar um título de seção
        é verificar se ele preenche todas as 3 seguintes condições: <br />
        1. É o único item de texto na linha <br />
        2. Está em <span className="font-bold">negrito</span> <br />
        3. Suas letras estão todas em MAIÚSCULAS
        <br />
      </Paragraph>
      <Paragraph>
        Em palavras simples, se um item de texto é duplamente enfatizado para estar
        em negrito e maiúsculas, é muito provável que seja um título de seção em um
        currículo. Isso geralmente é verdade para um currículo bem formatado. Pode
        haver exceções, mas provavelmente não é um bom uso de negrito e maiúsculas
        nesses casos.
      </Paragraph>
      <Paragraph>
        O analisador de currículos também tem uma heurística de fallback se a
        heurística principal não se aplicar. A heurística de fallback principalmente
        realiza uma correspondência de palavras-chave contra uma lista de palavras-chave
        comuns de títulos de seção de currículo.
      </Paragraph>
      <Paragraph>
        No final do passo 3, o analisador de currículos identifica as seções do
        currículo e agrupa essas linhas com o título de seção associado, conforme
        mostrado na tabela abaixo. Note que{" "}
        <span className="font-bold">os títulos de seção estão em negrito</span> e{" "}
        <span className="bg-teal-50">
          as linhas associadas à seção são destacadas com as mesmas cores
        </span>
        .
      </Paragraph>
      <Step3SectionsTable sections={sections} />
      {/* Passo 4. Extrair currículo das seções */}
      <Heading level={2}>Passo 4. Extrair currículo das seções</Heading>
      <Paragraph smallMarginTop={true}>
        O Passo 4 é o último passo do processo de análise de currículo e também é
        o núcleo do analisador de currículos, onde ele extrai informações do
        currículo das seções.
      </Paragraph>
      <Heading level={3}>Sistema de Pontuação de Recursos</Heading>
      <Paragraph smallMarginTop={true}>
        A essência do motor de extração é um sistema de pontuação de recursos.
        Cada atributo de currículo a ser extraído tem um conjunto de recursos
        personalizados, onde cada conjunto de recursos consiste em uma função de
        correspondência de recursos e uma pontuação de correspondência de recursos
        se corresponder (a pontuação de correspondência de recursos pode ser um
        número positivo ou negativo). Para calcular a pontuação final de recursos
        de um item de texto para um atributo de currículo específico, ele executaria
        o item de texto através de todos os seus conjuntos de recursos e somaria as
        pontuações de recursos correspondentes. Este processo é realizado para todos
        os itens de texto dentro da seção, e o item de texto com a maior pontuação
        de recursos calculada é identificado como o atributo de currículo extraído.
      </Paragraph>
      <Paragraph>
        Como demonstração, a tabela abaixo mostra 3 atributos de currículo na
        seção de perfil do PDF do currículo adicionado.
      </Paragraph>
      <Table table={step4ProfileFeatureScoresTable} className="mt-4" />
      {(profileScores.name.find((item) => item.text === profile.name)?.score ||
        0) > 0 && (
        <Paragraph smallMarginTop={true}>
          No PDF do currículo adicionado, o atributo de nome do currículo provavelmente é "
          {profile.name}" já que sua pontuação de recursos é{" "}
          {profileScores.name.find((item) => item.text === profile.name)?.score}
          , que é a maior pontuação de recursos de todos os itens de texto na
          seção de perfil. (As pontuações de recursos de alguns itens de texto
          podem ser negativas, indicando que é muito improvável que sejam o
          atributo alvo)
        </Paragraph>
      )}
      <Heading level={3}>Conjuntos de Recursos</Heading>
      <Paragraph smallMarginTop={true}>
        Tendo explicado o sistema de pontuação de recursos, podemos mergulhar mais
        em como os conjuntos de recursos são construídos para um atributo de currículo.
        Ele segue 2 princípios: <br />
        1. Os conjuntos de recursos de um atributo de currículo são projetados em
        relação a todos os outros atributos de currículo dentro da mesma seção. <br />
        2. Os conjuntos de recursos de um atributo de currículo são criados manualmente
        com base em suas características e probabilidade de cada característica.
      </Paragraph>
      <Paragraph>
        A tabela abaixo lista alguns dos conjuntos de recursos para o atributo de
        currículo nome. Ela contém função de recurso que corresponde ao atributo
        nome com pontuação de recurso positiva e também função de recurso que
        corresponde apenas a outros atributos de currículo na seção com pontuação
        de recurso negativa.
      </Paragraph>
      <Table
        table={step4NameFeatureSetsTable}
        title="Conjuntos de Recursos de Nome"
        className="mt-4"
      />
      <Heading level={3}>Função de Recurso Principal</Heading>
      <Paragraph smallMarginTop={true}>
        Cada atributo de currículo tem múltiplos conjuntos de recursos. Eles podem
        ser encontrados no código-fonte na pasta extract-resume-from-sections e não
        vamos listá-los todos aqui. Cada atributo de currículo geralmente tem uma
        função de recurso principal que os identifica amplamente, então vamos listar
        a função de recurso principal abaixo.
      </Paragraph>
      <Table table={step4CoreFeatureFunctionTable} className="mt-4" />
      <Heading level={3}>Caso Especial: Subseções</Heading>
      <Paragraph smallMarginTop={true}>
        A última coisa que vale a pena mencionar são as subseções. Para a seção
        de perfil, podemos passar diretamente todos os itens de texto para os
        sistemas de pontuação de recursos. Mas para outras seções, como educação
        e experiência profissional, temos que primeiro dividir a seção em subseções,
        já que pode haver múltiplas escolas ou experiências de trabalho na seção.
        O sistema de pontuação de recursos então processa cada subseção para
        recuperar os atributos de currículo de cada uma e anexar os resultados.
      </Paragraph>
      <Paragraph smallMarginTop={true}>
        O analisador de currículos aplica algumas heurísticas para detectar uma
        subseção. A principal heurística para determinar uma subseção é verificar
        se o espaço vertical entre 2 linhas é maior que o espaço de linha típico * 1.4,
        já que um currículo bem formatado geralmente cria uma nova quebra de linha
        vazia antes de adicionar a próxima subseção. Também há uma heurística de
        fallback se a heurística principal não se aplicar para verificar se o item
        de texto está em negrito.
      </Paragraph>
      <Paragraph>
        E isso é tudo sobre o algoritmo do analisador CVAts :)
      </Paragraph>
      <Paragraph>
        Escrito por <Link href="https://github.com/xitanggg">Xitang</Link> em
        Junho de 2023
      </Paragraph>
    </article>
  );
};

const step4NameFeatureSetsTable = [
  ["Função de Recurso", "Pontuação de Correspondência"],
  ["Contém apenas letras, espaços ou pontos", "+3"],
  ["Está em negrito", "+2"],
  ["Contém todas as letras maiúsculas", "+2"],
  ["Contém @", "-4 (corresponde email)"],
  ["Contém número", "-4 (corresponde telefone)"],
  ["Contém ,", "-4 (corresponde endereço)"],
  ["Contém /", "-4 (corresponde url)"],
];

const step4CoreFeatureFunctionTable = [
  ["Atributo de Currículo", "Função de Recurso Principal", "Regex"],
  ["Nome", "Contém apenas letras, espaços ou pontos", "/^[a-zA-Z\\s\\.]+$/"],
  [
    "Email",
    <>
      Corresponde formato de email xxx@xxx.xxx
      <br />
      xxx pode ser qualquer coisa que não seja espaço
    </>,
    "/\\S+@\\S+\\.\\S+/",
  ],
  [
    "Telefone",
    <>
      Corresponde formato de telefone (xxx)-xxx-xxxx <br /> () e - são opcionais
    </>,
    "/\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}/",
  ],
  [
    "Localização",
    <>Corresponde formato cidade e estado {"Cidade, UF"}</>,
    "/[A-Z][a-zA-Z\\s]+, [A-Z]{2}/",
  ],
  ["Url", "Corresponde formato de url xxx.xxx/xxx", "/\\S+\\.[a-z]+\\/\\S+/"],
  ["Instituição", "Contém palavra-chave de escola, ex: Faculdade, Universidade, Escola", ""],
  ["Grau", "Contém palavra-chave de grau, ex: Técnico, Graduação, Mestrado", ""],
  ["Média", "Corresponde formato de média x.xx", "/[0-4]\\.\\d{1,2}/"],
  [
    "Data",
    "Contém palavra-chave de data relacionada a ano, mês, estações ou a palavra Presente",
    "Ano: /(?:19|20)\\d{2}/",
  ],
  [
    "Cargo",
    "Contém palavra-chave de cargo, ex: Analista, Engenheiro, Estagiário",
    "",
  ],
  ["Empresa", "Está em negrito ou não corresponde cargo e data", ""],
  ["Projeto", "Está em negrito ou não corresponde data", ""],
];

const Step3SectionsTable = ({
  sections,
}: {
  sections: ResumeSectionToLines;
}) => {
  const table: React.ReactNode[][] = [["Linhas", "Conteúdo da Linha"]];
  const trClassNames = [];
  let lineCounter = 0;
  const BACKGROUND_COLORS = [
    "bg-red-50",
    "bg-yellow-50",
    "bg-orange-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-purple-50",
  ] as const;
  const sectionsEntries = Object.entries(sections);

  const Line = ({ line }: { line: Line }) => {
    return (
      <>
        {line.map((item, idx) => (
          <span key={idx}>
            {item.text}
            {idx !== line.length - 1 && (
              <span className="select-none font-extrabold text-sky-400">
                &nbsp;&nbsp;{"|"}&nbsp;&nbsp;
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  for (let i = 0; i < sectionsEntries.length; i++) {
    const sectionBackgroundColor = BACKGROUND_COLORS[i % 6];
    const [sectionTitle, lines] = sectionsEntries[i];
    table.push([
      sectionTitle === "profile" ? "" : lineCounter,
      sectionTitle === "profile" ? "PERFIL" : sectionTitle,
    ]);
    trClassNames.push(`${sectionBackgroundColor} font-bold`);
    lineCounter += 1;
    for (let j = 0; j < lines.length; j++) {
      table.push([lineCounter, <Line key={lineCounter} line={lines[j]} />]);
      trClassNames.push(sectionBackgroundColor);
      lineCounter += 1;
    }
  }

  return (
    <div className="mt-4 max-h-96 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
      <Table
        table={table}
        className="!border-none"
        trClassNames={trClassNames}
      />
    </div>
  );
};
