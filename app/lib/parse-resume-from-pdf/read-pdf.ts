import * as pdfjs from "pdfjs-dist";
import type { TextItems } from "@/app/lib/parse-resume-from-pdf/types";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

/** Read selectable text locally. No file is sent to a server. */
export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  const task = pdfjs.getDocument({ url: fileUrl, fontExtraProperties: true });
  try {
    const pdf = await task.promise;
    if (pdf.numPages > 30) throw new Error("O PDF deve ter no máximo 30 páginas.");
    const items: TextItems = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      await page.getOperatorList();
      for (const item of content.items) {
        if (!("str" in item)) continue;
        const font = page.commonObjs.has(item.fontName) ? page.commonObjs.get(item.fontName) : null;
        items.push({
          text: item.str.replace(/\u00ad/g, ""),
          x: item.transform[4],
          y: item.transform[5],
          width: item.width,
          height: item.height,
          fontName:
            typeof font?.name === "string"
              ? font.name
              : content.styles[item.fontName]?.fontFamily || item.fontName,
          hasEOL: item.hasEOL,
          page: pageNumber,
        });
      }
      if (items.length) items[items.length - 1].hasEOL = true;
      page.cleanup();
    }
    if (!items.some((item) => item.text.trim())) {
      throw new Error(
        "Nenhum texto selecionável encontrado. O PDF pode ser uma imagem; use OCR ou exporte novamente com texto."
      );
    }
    return items;
  } catch (error) {
    if (error instanceof Error && error.name === "PasswordException") {
      throw new Error("O PDF está protegido por senha. Envie uma cópia sem proteção.");
    }
    if (error instanceof Error && error.name === "InvalidPDFException") {
      throw new Error("PDF inválido ou corrompido. Exporte o arquivo novamente.");
    }
    throw error;
  } finally {
    await task.destroy();
  }
};
