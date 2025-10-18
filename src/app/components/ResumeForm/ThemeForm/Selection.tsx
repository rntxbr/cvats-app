import type { GeneralSetting } from "lib/redux/settingsSlice";
import { PX_PER_PT } from "lib/constants";
import {
  FONT_FAMILY_TO_STANDARD_SIZE_IN_PT,
  FONT_FAMILY_TO_DISPLAY_NAME,
  type FontFamily,
} from "components/fonts/constants";
import { getAllFontFamiliesToLoad } from "components/fonts/lib";
import dynamic from "next/dynamic";

const Selection = ({
  selectedColor,
  isSelected,
  style = {},
  onClick,
  children,
}: {
  selectedColor: string;
  isSelected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const selectedStyle = {
    color: "white",
    backgroundColor: selectedColor,
    fontWeight: "bold",
    ...style,
  };
  
  const baseStyle = {
    backgroundColor: "white",
    ...style,
  };

  return (
    <div
      className="flex w-[105px] cursor-pointer items-center justify-center rounded-lg border-3 border-black py-2 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
      onClick={onClick}
      style={isSelected ? selectedStyle : baseStyle}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const SelectionsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-2 flex flex-wrap gap-3">{children}</div>;
};

const FontFamilySelections = ({
  selectedFontFamily,
  themeColor,
  handleSettingsChange,
}: {
  selectedFontFamily: string;
  themeColor: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const allFontFamilies = getAllFontFamiliesToLoad();
  return (
    <SelectionsWrapper>
      {allFontFamilies.map((fontFamily, idx) => {
        const isSelected = selectedFontFamily === fontFamily;
        const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${standardSizePt * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontFamily", fontFamily)}
          >
            {FONT_FAMILY_TO_DISPLAY_NAME[fontFamily]}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

/**
 * Load FontFamilySelections client side since it calls getAllFontFamiliesToLoad,
 * which uses navigator object that is only available on client side
 */
export const FontFamilySelectionsCSR = dynamic(
  () => Promise.resolve(FontFamilySelections),
  {
    ssr: false,
  }
);

export const FontSizeSelections = ({
  selectedFontSize,
  fontFamily,
  themeColor,
  handleSettingsChange,
}: {
  fontFamily: FontFamily;
  themeColor: string;
  selectedFontSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
  const compactSizePt = standardSizePt - 1;

  return (
    <SelectionsWrapper>
      {["Compacto", "Padrão", "Grande"].map((type, idx) => {
        const fontSizePt = String(compactSizePt + idx);
        const isSelected = fontSizePt === selectedFontSize;
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${Number(fontSizePt) * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontSize", fontSizePt)}
          >
            {type}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

export const DocumentSizeSelections = ({
  selectedDocumentSize,
  themeColor,
  handleSettingsChange,
}: {
  themeColor: string;
  selectedDocumentSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  return (
    <SelectionsWrapper>
      {["Letter", "A4"].map((type, idx) => {
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={type === selectedDocumentSize}
            onClick={() => handleSettingsChange("documentSize", type)}
          >
            <div className="flex flex-col items-center">
              <div>{type}</div>
              <div className="text-xs font-normal">
                {type === "Letter" ? "(EUA, Canadá)" : "(outros países)"}
              </div>
            </div>
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};
