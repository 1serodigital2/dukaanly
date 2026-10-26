"use client";

import useShop from "@/src/app/hooks/useStore";
import Link from "next/link";

const Sidebar = () => {
  const { getAllStores } = useShop();
  const { stores, loading } = getAllStores();

  if (loading) return;

  if (stores == undefined || stores?.length <= 0) return;

  return (
    <aside className="p-5 flex flex-col gap-3 border-r">
      <div className="text-2xl font-semibold">Dukaanly</div>
      <ul className="flex flex-col gap-3">
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Setting</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
