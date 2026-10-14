"use client";

import { useState, useEffect } from "react";

import { Input } from "@/src/components/form/Input";

import { useCreateStore } from "@/src/features/shops/queries";

const initialState = {
  shopName: "",
  email: "",
  phone: "",
};
const ShopPage = () => {
  const [inputValues, setInputValues] = useState(initialState);
  const [submitMessage, setSubmitMessage] = useState("");
  const { mutate, isPending, error, isError, isSuccess } = useCreateStore();

  const handleChange = (name: string, value: string) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const shopName = inputValues.shopName.trim();

    if (!shopName) {
      console.error("Shop name is required");
      return;
    }

    const shopSlug = shopName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const storeData = {
      shopName,
      shopSlug,
      email: inputValues.email,
      phone: inputValues.phone,
    };

    mutate(storeData);
  };

  useEffect(() => {
    if (isSuccess) {
      setInputValues(initialState);
      setSubmitMessage("Form Submitted successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (submitMessage) {
      setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }
  }, [submitMessage]);

  return (
    <>
      <h1 className="mb-4">Shop page</h1>
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
      {isError && <p>{error.message}</p>}
      {submitMessage && <p>{submitMessage}</p>}
    </>
  );
};
export default ShopPage;
