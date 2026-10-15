import ShopList from "@/src/components/shops/ShopList";
import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

const ShopPage = async () => {
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

  console.log("[Shoppage] shop data", data);

  return (
    <>
      <h1 className="mb-5">Shop page</h1>
      <ShopList data={data} />
    </>
  );
};
export default ShopPage;
