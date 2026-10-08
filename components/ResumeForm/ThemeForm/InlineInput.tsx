import { useEffect, useId, useState } from "react";

interface InputProps<K extends string, V extends string> {
  label: string;
  labelClassName?: string;
  name: K;
  value?: V;
  placeholder: string;
  inputStyle?: React.CSSProperties;
  onChange: (name: K, value: V) => void;
}

export const InlineInput = <K extends string>({
  label,
  labelClassName,
  name,
  value = "",
  placeholder,
  inputStyle = {},
  onChange,
}: InputProps<K, string>) => {
  const [draft, setDraft] = useState(value);
  const errorId = useId();
  useEffect(() => setDraft(value), [value]);
  const valid =
    name === "fontSize"
      ? Number(draft) >= 8 && Number(draft) <= 18
      : name === "themeColor"
        ? /^(#[a-f\d]{6}|)$/i.test(draft)
        : true;
  return (
    <label
      className={`flex flex-wrap items-center gap-3 text-sm font-medium text-gray-700 ${labelClassName || ""}`}
    >
      <span>{label}</span>
      <input
        type="text"
        name={name}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => {
          const next = e.target.value;
          setDraft(next);
          if (
            name === "fontSize"
              ? Number(next) >= 8 && Number(next) <= 18
              : name === "themeColor"
                ? /^(#[a-f\d]{6}|)$/i.test(next)
                : true
          )
            onChange(name, next);
        }}
        aria-invalid={!valid}
        aria-describedby={!valid ? errorId : undefined}
        className="min-h-9 w-24 rounded-lg border border-gray-300 px-2 text-center text-sm font-normal focus-visible:outline-2 focus-visible:outline-[#28584c]"
        style={inputStyle}
      />
      {!valid && (
        <span id={errorId} className="w-full text-xs text-red-700">
          {name === "fontSize"
            ? "Use um tamanho entre 8 e 18 pontos."
            : "Use uma cor como #28584c ou deixe em branco."}
        </span>
      )}
    </label>
  );
};
