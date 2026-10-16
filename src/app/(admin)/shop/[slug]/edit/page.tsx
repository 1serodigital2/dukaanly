"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
  useCreateStore,
  useGetStore,
  useUpdateStore,
} from "@/src/features/shops/queries";
import ShopForm from "@/src/components/shops/ShopForm";

let initialState = {
  shopName: "",
  email: "",
  phone: "",
};
const ShopEditPage = () => {
  const params = useParams();
  const slug = params.slug;

  const {
    data: storeData,
    isPending: storeIsPending,
    isError: storeIsError,
    error: storeError,
  } = useGetStore(slug as string);

  console.log("Store data", storeData);

  if (storeIsError) {
    console.error("[StorePage] error", storeError);
  }

  if (storeData) {
    initialState = {
      shopName: storeData.name,
      email: storeData.email,
      phone: storeData.phone,
    };
  }

  const [inputValues, setInputValues] = useState(initialState);

  const [submitMessage, setSubmitMessage] = useState("");
  const { mutate, isPending, error, isError, isSuccess } = useUpdateStore(
    storeData.id,
    storeData,
  );

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

  //get store data and populate form
  useEffect(() => {
    if (storeData) {
      setInputValues({
        shopName: storeData.name,
        email: storeData.email,
        phone: storeData.phone,
      });
    }
  }, [storeData]);

  return (
    <>
      <h1 className="mb-4">Shop page</h1>
      {storeIsPending ? (
        <p>Loading form. Please wait...</p>
      ) : (
        <ShopForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          inputValues={inputValues}
          isPending={isPending}
          isError={isError}
          error={error}
          submitMessage={submitMessage}
        />
      )}
    </>
  );
};
export default ShopEditPage;
