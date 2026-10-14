"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

import { Input } from "@/src/components/form/Input";

const initialState = {
  shopName: "",
  email: "",
  phone: "",
};
const ShopPage = () => {
  const [inputValues, setInputValues] = useState(initialState);

  const supabase = createClient();

  const handleChange = (name: string, value: string) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log("input value", inputValues);
  };

  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  // Get the currently authenticated user
  const { data: { user }, error: userError } =
    await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Unable to get current user:", userError);
    return;
  }

  // Create the shop
  const { data, error } = await supabase
    .from("shops")
    .insert({
      name: shopName,
      slug: shopSlug,
      created_by: user.id,
      email: inputValues.email,
      phone: inputValues.phone,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create shop:", error.message);
    return;
  }

  console.log("Shop created successfully:", data);
};


  // const handleSubmit = (e: React.SubmitEvent) => {
  //   e.preventDefault();

  //   const shopSlug = inputValues.shopName
  //     .trim()
  //     .toLowerCase()
  //     .replace(" ", "-");
  //   console.log("slug", shopSlug);

  //   const {data, error} = supabase.from("shops").insert({
  //     name: inputValues.shopName,
  //     slug: shopSlug,
  //     created_by: 
  //     email: inputValues?.email,
  //     phone: inputValues?.phone,
  //   });
  // };

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
        <button className="border px-4 py-2 rounded cursor-pointer mt-5">
          Submit
        </button>
      </form>
    </>
  );
};
export default ShopPage;
