import { useAutosizeTextareaHeight } from "@/app/lib/hooks/useAutosizeTextareaHeight";

interface InputProps<K extends string, V extends string | string[]> {
  label: string;
  labelClassName?: string;
  name: K;
  value?: V;
  placeholder: string;
  onChange: (name: K, value: V) => void;
}
export const InputGroupWrapper = ({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children?: React.ReactNode;
}) => (
  <label className={`text-sm font-medium text-gray-900 ${className}`}>
    {label}
    {children}
  </label>
);
export const INPUT_CLASS_NAME =
  "mt-2 py-3 px-4 block w-full bg-zinc-100 rounded-xl font-normal text-sm focus-visible:outline-2 focus-visible:outline-[#28584c]";
export const Input = <K extends string>({
  name,
  value = "",
  placeholder,
  onChange,
  label,
  labelClassName,
}: InputProps<K, string>) => (
  <InputGroupWrapper label={label} className={labelClassName}>
    <input
      type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(name, event.target.value)}
      className={INPUT_CLASS_NAME}
    />
  </InputGroupWrapper>
);
export const Textarea = <K extends string>({
  label,
  labelClassName,
  name,
  value = "",
  placeholder,
  onChange,
  rows = 4,
}: InputProps<K, string> & { rows?: number }) => {
  const ref = useAutosizeTextareaHeight({ value, minRows: rows });
  return (
    <InputGroupWrapper label={label} className={labelClassName}>
      <textarea
        ref={ref}
        rows={rows}
        name={name}
        className={`${INPUT_CLASS_NAME} resize-y`}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </InputGroupWrapper>
  );
};
/** Plain text on all browsers: pasted/imported HTML never becomes executable markup. */
export const BulletListTextarea = <K extends string>({
  value = [],
  showBulletPoints = true,
  ...props
}: InputProps<K, string[]> & { showBulletPoints?: boolean }) => (
  <Textarea
    {...props}
    value={value.join("\n")}
    placeholder={
      props.placeholder === "Bullet points"
        ? "Uma descrição por linha. Use ações e resultados concretos."
        : props.placeholder
    }
    onChange={(name, text) =>
      props.onChange(
        name,
        text
          .replace(/\r\n?/g, "\n")
          .split("\n")
          .map((line) => line.replace(/^\s*[•]\s?/, ""))
      )
    }
  />
);
