"use client";

import { useState } from "react";

import { Input } from "@/src/components/form/Input";

const initialState = {
  shopName: "",
};
const ShopPage = () => {
  const [inputValues, setInputValues] = useState(initialState);

  const handleChange = (name: string, value: string) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log("input value", inputValues);
  };

  return (
    <>
      <h1>Shop page</h1>
      <form action="">
        <Input
          label="Shop Name"
          name="shopName"
          required
          onChange={handleChange}
          value={inputValues["shopName"]}
        />
      </form>
    </>
  );
};
export default ShopPage;
