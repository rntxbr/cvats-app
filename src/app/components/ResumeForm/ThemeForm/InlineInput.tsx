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
  return (
    <label
      className={`flex gap-3 text-base font-bold text-gray-900 ${labelClassName}`}
    >
      <span className="w-32">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-[5rem] rounded-lg border-3 border-black px-2 py-1 text-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        style={inputStyle}
      />
    </label>
  );
};
