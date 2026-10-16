import { createClient } from "@/src/lib/supabase/server";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}
const StorePage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log("[StorePage]", slug);

  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from("shops")
    .select("*")
    .eq("id", slug);

  if (error) {
    console.error("something went wrong", error);
  }

  console.log("[StorePage] data", data);

  if (data?.length === 0 || !data) return <p>Data not found</p>;

  return (
    <>
      <h1 className="mb-5">Create Store</h1>
      <div className="border rounded-xl p-6 relative">
        <Link href={`${slug}/edit`}>Edit</Link>
        <div className="mb-5">
          <div>
            <small>Logo</small>
          </div>
          <div className="p-3 border-dashed border rounded-xl w-max">
            <img
              src="https://placehold.co/200x200"
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>
        <div>
          <div>
            <small>Shop name</small>
          </div>
          <div className="mb-4">{data[0].name}</div>
          <div>
            <small>email</small>
          </div>
          <div className="mb-4">{data[0].email}</div>
          <div>
            <small>Phone</small>
          </div>
          <div className="mb-4">{data[0].phone}</div>
          <div>
            <small>Shop slug</small>
          </div>
          <div className="mb-4">{data[0].slug}</div>
          <div>
            <small>Shop address</small>
          </div>
          <div className="mb-4">{data[0].address}</div>
        </div>
      </div>
    </>
  );
};

export default StorePage;
