import { createClient } from "@/src/lib/supabase/client";

export const getStoreMembers = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("shop_members").select("*");

  if (error) {
    console.error("something went wrong", error);
  }
  console.log("[getStoreMembers] data", data);

  return data;
};
