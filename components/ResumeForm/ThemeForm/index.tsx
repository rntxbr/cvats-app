import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  type GeneralSetting,
  selectSettings,
} from "@/app/lib/redux/settingsSlice";
import type { FontFamily } from "@/components/fonts/constants";
import { BaseForm } from "@/components/ResumeForm/Form";
import { InputGroupWrapper } from "@/components/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "@/components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "@/components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "@/components/ResumeForm/ThemeForm/Selection";
import { TemplatePicker } from "@/components/ResumeForm/ThemeForm/TemplatePicker";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  return (
    <BaseForm>
      <div className="flex flex-col gap-4">
        <TemplatePicker />
        <div>
          <InlineInput
            label="Cor do Tema"
            name="themeColor"
            value={settings.themeColor}
            placeholder={DEFAULT_THEME_COLOR}
            onChange={handleSettingsChange}
            inputStyle={{ color: themeColor }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_COLORS.map((color, idx) => (
              <button
                type="button"
                aria-label={`Cor ${color}`}
                aria-pressed={settings.themeColor === color}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white"
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingsChange("themeColor", color)}
              >
                {settings.themeColor === color ? "✓" : ""}
              </button>
            ))}
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Fonte" />
          <FontFamilySelectionsCSR
            selectedFontFamily={fontFamily}
            themeColor={themeColor}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InlineInput
            label="Tamanho da Fonte"
            name="fontSize"
            value={fontSize}
            placeholder="11"
            onChange={handleSettingsChange}
          />
          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeColor}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InputGroupWrapper label="Tamanho do Documento" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
