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

export const getStore = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("something went wrong", error);
  }
  return data;
};

export const getStores = async (id: string) => {
  console.log("[getStores] triggered with id", id);

  const supabase = createClient();

  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("created_by", id);
    // .maybeSingle();

  if (error) {
    console.error("something went wrong", error);
  }
  return data;
};

export const updateStore = async (id: number, storeData: string | any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("shops")
    .update(storeData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("[updateStore] has error", error);

    throw error;
  }
  return { success: true, data };
};
