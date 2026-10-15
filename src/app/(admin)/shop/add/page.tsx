"use client";

import { useState, useEffect } from "react";

import { Input } from "@/src/components/form/Input";

import { useCreateStore } from "@/src/features/shops/queries";
import ShopForm from "@/src/components/shops/ShopForm";

const initialState = {
  shopName: "",
  email: "",
  phone: "",
};
const StoreCreationPage = () => {
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
      <ShopForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValues={inputValues}
        isPending={isPending}
        isError={isError}
        error={error}
        submitMessage={submitMessage}
      />
    </>
  );
};
export default StoreCreationPage;
