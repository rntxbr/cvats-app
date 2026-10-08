import { getDocument } from "pdfjs-dist";
import { readPdf } from "@/app/lib/parse-resume-from-pdf/read-pdf";

jest.mock("pdfjs-dist", () => ({ GlobalWorkerOptions: {}, getDocument: jest.fn() }));
const getDocumentMock = jest.mocked(getDocument);
const setup = (items: unknown[], pages = 1) => {
  const destroy = jest.fn().mockResolvedValue(undefined);
  const cleanup = jest.fn();
  getDocumentMock.mockReturnValue({
    promise: Promise.resolve({
      numPages: pages,
      getPage: async () => ({
        getTextContent: async () => ({ items, styles: {} }),
        getOperatorList: async () => {},
        commonObjs: { has: () => false },
        cleanup,
      }),
    }),
    destroy,
  } as never);
  return { destroy, cleanup };
};
test("ignores marked content, tolerates missing fonts and closes resources", async () => {
  const { destroy, cleanup } = setup([
    { type: "beginMarkedContent", id: "x" },
    {
      str: "Maria",
      transform: [1, 0, 0, 1, 10, 20],
      width: 30,
      height: 12,
      fontName: "unknown",
      hasEOL: false,
    },
  ]);
  const items = await readPdf("blob:test");
  expect(items).toEqual([
    {
      text: "Maria",
      x: 10,
      y: 20,
      width: 30,
      height: 12,
      fontName: "unknown",
      hasEOL: true,
      page: 1,
    },
  ]);
  expect(cleanup).toHaveBeenCalled();
  expect(destroy).toHaveBeenCalled();
});
test("rejects scanned documents and always releases the worker", async () => {
  const { destroy } = setup([]);
  await expect(readPdf("blob:test")).rejects.toThrow("Nenhum texto selecionável");
  expect(destroy).toHaveBeenCalled();
});
test("rejects documents over the page limit before extraction", async () => {
  const { destroy, cleanup } = setup([], 31);
  await expect(readPdf("blob:test")).rejects.toThrow("30 páginas");
  expect(cleanup).not.toHaveBeenCalled();
  expect(destroy).toHaveBeenCalled();
});
test("password failures become actionable messages", async () => {
  const destroy = jest.fn().mockResolvedValue(undefined);
  const error = Object.assign(new Error("password"), { name: "PasswordException" });
  getDocumentMock.mockReturnValue({ promise: Promise.reject(error), destroy } as never);
  await expect(readPdf("blob:test")).rejects.toThrow("protegido por senha");
  expect(destroy).toHaveBeenCalled();
});
