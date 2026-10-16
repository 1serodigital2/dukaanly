export interface ShopCreationData {
  shopName: string;
  shopSlug?: string;
  email: string;
  phone: string;
}
export interface ShopData {
  shopName: string;
  shopSlug?: string;
  email: string;
  phone: string;
}

export interface ShopFormProps {
  handleSubmit: (e: React.SubmitEvent) => void;
  handleChange: (name: string, value: string) => void;
  inputValues: ShopCreationData;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  submitMessage: string;
}
