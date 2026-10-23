"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
  useCreateStore,
  useStore,
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
  const slug = Number(params.slug);

  const {
    data: storeData,
    isPending: storeIsPending,
    isError: storeIsError,
    error: storeError,
  } = useStore(slug as number);

  console.log("Store data", storeData);

  if (storeIsError) {
    console.error("[StorePage] error", storeError);
  }

  const [inputValues, setInputValues] = useState(initialState);

  useEffect(() => {
    if (!storeData) return;

    setInputValues({
      shopName: storeData.name || "",
      email: storeData.email || "",
      phone: storeData.phone || "",
    });
  }, [storeData]);

  const [submitMessage, setSubmitMessage] = useState("");
  const { mutate, isPending, error, isError, isSuccess } = useUpdateStore(
    storeData?.id,
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

    const updateData = {
      name: shopName,
      slug: shopSlug,
      email: inputValues.email,
      phone: inputValues.phone,
    };
    mutate(updateData);
  };

  useEffect(() => {
    if (isSuccess) {
      // setInputValues(initialState);
      setSubmitMessage("Store updated successfully");
    }
  }, [isSuccess, isError, error]);

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

  if (storeIsPending || !storeData) {
    return <p>Loading form. Please wait...</p>;
  }

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
export default ShopEditPage;
