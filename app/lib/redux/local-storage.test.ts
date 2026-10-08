import { loadStateFromLocalStorage, saveStateToLocalStorage } from "@/app/lib/redux/local-storage";
import { initialResumeState } from "@/app/lib/redux/resumeSlice";
import { initialSettings } from "@/app/lib/redux/settingsSlice";

const state = { resume: initialResumeState, settings: initialSettings };
afterEach(() => {
  jest.restoreAllMocks();
});
test("invalid stored JSON does not crash startup", () => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { getItem: () => "broken{" },
  });
  expect(loadStateFromLocalStorage()).toBeUndefined();
});
test("storage failure is reported, successful saves are versioned", () => {
  const setItem = jest.fn().mockImplementation(() => {
    throw new Error("Quota exceeded");
  });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { setItem } });
  expect(saveStateToLocalStorage(state)).toBe(false);
  setItem.mockImplementation(() => {});
  expect(saveStateToLocalStorage(state)).toBe(true);
  expect(JSON.parse(setItem.mock.calls[1][1]).version).toBe(1);
});
