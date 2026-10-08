import { CheckIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeSettings, selectSettings } from "@/app/lib/redux/settingsSlice";
import { RESUME_TEMPLATES } from "@/components/Resume/ResumePDF/templates";
import { Tooltip } from "@/components/Tooltip";

export function TemplatePicker() {
  const { template, themeColor } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium">Modelo</legend>
      <div className="grid grid-cols-3 gap-3">
        {RESUME_TEMPLATES.map(({ id, name, description }) => (
          <Tooltip key={id} text={description}>
            <button
              type="button"
              aria-label={`Modelo ${name}`}
              aria-pressed={template === id}
              onClick={() => dispatch(changeSettings({ field: "template", value: id }))}
              className={`relative w-full rounded-xl border p-2 transition-colors hover:border-[#28584c] ${template === id ? "border-[#28584c] bg-[#f1eee1] ring-1 ring-[#28584c]" : "border-[#28584c]/15 bg-white"}`}
            >
              <div
                aria-hidden="true"
                className={`mx-auto aspect-[1/1.25] max-w-24 space-y-2 rounded-sm bg-white p-3 shadow-sm ${id === "executive" ? "text-center" : "text-left"}`}
              >
                <div
                  style={{ backgroundColor: themeColor }}
                  className={`h-1.5 w-3/4 rounded-sm ${id === "executive" ? "mx-auto" : ""}`}
                />
                <div className={`h-1 w-1/2 bg-gray-200 ${id === "executive" ? "mx-auto" : ""}`} />
                {[0, 1, 2].map((section) => (
                  <div key={section} className="space-y-1 pt-1">
                    <div
                      className={id === "classic" ? "flex items-center gap-1" : "border-b pb-1"}
                      style={{ borderColor: themeColor }}
                    >
                      {id === "classic" && (
                        <div className="h-0.5 w-2" style={{ backgroundColor: themeColor }} />
                      )}
                      <div className="h-1 w-1/2 bg-gray-400" />
                    </div>
                    <div className="h-0.5 w-full bg-gray-200" />
                    <div className="h-0.5 w-4/5 bg-gray-200" />
                  </div>
                ))}
              </div>
              <span className="mt-2 block text-xs font-medium text-[#28584c]">{name}</span>
              {template === id && (
                <CheckIcon className="absolute right-1 top-1 h-4 w-4 rounded-full bg-[#28584c] p-0.5 text-white" />
              )}
            </button>
          </Tooltip>
        ))}
      </div>
    </fieldset>
  );
}
