// "use client";

import { getStore } from "@/src/features/shops/api";
// import { useGetStore } from "@/src/features/shops/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}
const StorePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log("[StorePage]", slug);

  // const { data, isPending, isError, error } = useGetStore(slug);
  const data = getStore(slug);

  console.log("[StorePage] data", data);
  return (
    <>
      <h1>Store page {slug}</h1>
    </>
  );
};

export default StorePage;
