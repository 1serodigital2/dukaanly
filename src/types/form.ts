export interface InputProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  onChange: (name: string, value: string) => void;
}
