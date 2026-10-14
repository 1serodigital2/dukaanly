import { createClient } from "@/src/lib/supabase/client";
import { ShopCreationData } from "./types";
export const createStore = async (storeData: ShopCreationData) => {
  console.log("[createStore]", storeData);

  const supabase = createClient();

  // Create the shop
  const { data, error } = await supabase
    .from("shops")
    .insert({
      name: storeData.shopName,
      slug: storeData.shopSlug,
      email: storeData.email,
      phone: storeData.phone,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create shop:", error.message);
    return;
  }
  console.log("Shop created successfully:", data);
  return data;
};

export const getStore = async (slug: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("slug", slug);

  if (error) {
    console.error("something went wrong", error);
  }
  return data;
};
