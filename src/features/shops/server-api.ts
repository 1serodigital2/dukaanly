import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export const getStores = async () => {
  const supabase = await createClient();

  // 2. Fetch the authenticated user securely from Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 3. Handle unauthorized state or grab the UUID
  if (error || !user) {
    redirect("/login");
  }

  console.log("ShopPage user data", user);

  const { data, error: shopError } = await supabase
    .from("shops")
    .select("*")
    .eq("created_by", user.id);

  if (shopError) {
    console.error("[getStores] error", error);
  }
  console.log("[Shoppage] shop data", data);
  return data;
};
