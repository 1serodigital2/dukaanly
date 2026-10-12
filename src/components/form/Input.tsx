import { InputProps } from "@/src/types/form";

export const Input = ({
  label,
  name,
  type,
  required,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        disabled={required}
        onChange={(e) => onChange(name, e.target.value)}
        className="border rounded"
      />
    </div>
  );
};
