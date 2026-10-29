import ShopList from "@/src/components/shops/ShopList";
import { getStores } from "@/src/features/shops/server-api";
import { redirect } from "next/navigation";

const ShopPage = async () => {
  const data = await getStores();

  if (data == undefined || data?.length <= 0) {
    redirect("/shop/add/");
  }

  return (
    <>
      <h1 className="mb-5">Shop page</h1>
      <ShopList data={data || []} />
    </>
  );
};
export default ShopPage;
