import ShopList from "@/src/components/shops/ShopList";
import { getStores } from "@/src/features/shops/server-api";

const ShopPage = async () => {
  const data = await getStores();

  return (
    <>
      <h1 className="mb-5">Shop page</h1>
      <ShopList data={data || []} />
    </>
  );
};
export default ShopPage;
