import { ShopFormProps } from "@/src/features/shops/types";
import { Input } from "../form/Input";

const ShopForm = ({
  handleSubmit,
  handleChange,
  inputValues,
  isPending,
  isError,
  error,
  submitMessage,
}: ShopFormProps) => {
  return (
    <>
      <form action="" className="rounded-xl p-4 border" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <Input
            label="Shop Name"
            name="shopName"
            required
            onChange={handleChange}
            value={inputValues["shopName"]}
          />
          <Input
            label="Contact Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={inputValues["email"]}
          />
          <Input
            label="Mobile Number"
            name="phone"
            type="tel"
            onChange={handleChange}
            value={inputValues["phone"]}
          />
        </div>
        <button
          className="border px-4 py-2 rounded cursor-pointer mt-5"
          disabled={isPending}
        >
          {isPending ? "Submitting" : "Submit"}
        </button>
      </form>
      {isError && <p>{error?.message}</p>}
      {submitMessage && <p>{submitMessage}</p>}
    </>
  );
};

export default ShopForm;
