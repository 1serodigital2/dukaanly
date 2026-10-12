import { InputProps } from "@/src/types/form";

export const Input = ({ label, name, type, required }: InputProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} disabled={required} />
    </>
  );
};
