import Link from "next/link";

const DashboarPage = () => {
  return (
    <>
      <h1 className="mb-4">Dashboar page</h1>
      <div className="p-3 w-full rounded-xl flex justify-between border items-center">
        <div>Please create a shop to continue</div>
        <Link href="/shop/" className="border rounded px-4 py-1">Create Shop</Link>
      </div>
    </>
  );
};

export default DashboarPage;
