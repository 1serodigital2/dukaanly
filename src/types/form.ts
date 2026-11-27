export interface InputProps {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  onChange: (name: string, value: string, index?: number | undefined) => void;
  value?: string | number;
  placeholder?: string;
  index?: number;
}
