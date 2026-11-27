import { InputProps } from "@/src/types/form";

export const Input = ({
  label,
  name,
  type = "text",
  required,
  onChange,
  value,
  placeholder,
  index
}: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        required={required}
        onChange={(e) => onChange(name, e.target.value, index)}
        className="border rounded min-h-10 px-3"
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
