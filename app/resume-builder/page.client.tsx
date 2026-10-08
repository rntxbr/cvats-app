"use client";
import {
  ChartBarIcon,
  EyeIcon,
  PaintBrushIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Provider } from "react-redux";
import { resumeToText } from "@/app/lib/ats/analyze";
import { cleanResume } from "@/app/lib/ats/clean-resume";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "@/app/lib/redux/hooks";
import { selectResume } from "@/app/lib/redux/resumeSlice";
import { selectSettings } from "@/app/lib/redux/settingsSlice";
import { store } from "@/app/lib/redux/store";
import { AtsAnalysis } from "@/components/AtsAnalysis";
import { Resume } from "@/components/Resume";
import { ResumeForm } from "@/components/ResumeForm";
import { ThemeForm } from "@/components/ResumeForm/ThemeForm";
import { ResumeTools } from "@/components/ResumeTools";

const panels = [
  { id: "data", label: "Dados", Icon: PencilSquareIcon },
  { id: "design", label: "Aparência", Icon: PaintBrushIcon },
  { id: "ats", label: "ATS", Icon: ChartBarIcon },
  { id: "preview", label: "Prévia", Icon: EyeIcon },
] as const;

function Editor() {
  useSetInitialStore();
  const saveFailed = useSaveStateToLocalStorageOnChange();
  const [panel, setPanel] = useState<string>("data");
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const text = resumeToText(cleanResume(resume, settings), settings);
  return (
    <main className="mx-auto max-w-[1440px] px-3 pb-8 pt-28 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-[#28584c]">Meu currículo</h1>
        <ResumeTools />
      </div>
      {saveFailed && (
        <p role="alert" className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-800">
          Não foi possível salvar neste navegador. Use o ícone de backup para preservar suas
          alterações.
        </p>
      )}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <nav
            aria-label="Painéis do editor"
            className="sticky top-24 z-10 mb-4 grid grid-cols-4 gap-1 rounded-xl border border-[#28584c]/10 bg-[#f1eee1] p-1 lg:grid-cols-3"
          >
            {panels.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={panel === id}
                onClick={() => setPanel(id)}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[11px] sm:min-h-11 sm:flex-row sm:gap-2 sm:px-2 sm:text-sm transition-colors ${id === "preview" ? "lg:hidden" : ""} ${panel === id ? "bg-[#28584c] text-white" : "text-[#28584c] hover:bg-[#28584c]/10"}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
          <div
            className={
              panel === "data" ? "block" : panel === "preview" ? "hidden lg:block" : "hidden"
            }
          >
            <ResumeForm />
          </div>
          <div hidden={panel !== "design"}>
            <ThemeForm />
          </div>
          <div hidden={panel !== "ats"}>
            <AtsAnalysis text={text} compact />
          </div>
        </div>
        <div
          className={`${panel === "preview" ? "block" : "hidden"} min-w-0 lg:sticky lg:top-28 lg:block`}
        >
          <Resume />
        </div>
      </div>
    </main>
  );
}
export default function ClientPage() {
  return (
    <Provider store={store}>
      <Editor />
    </Provider>
  );
}
