"use client";

import { ShopCardData, ShopCardProps } from "@/src/features/shops/types";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";

const ShopList = ({ data }: ShopCardProps) => {
  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    console.log("[handleClick] clicked edit");
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {data.map((store: ShopCardData) => (
        <Link
          href={`/shop/${store.id}`}
          className="border rounded-xl p-4 relative"
          key={store.id}
        >
          <h3>{store.name}</h3>
          <ul>
            <li>{store.phone}</li>
            <li>{store.email}</li>
          </ul>
          <div className="absolute right-3 top-3">
            <button>
              <EllipsisVertical />
            </button>
            <ul className="border px-4 py-1 rounded flex flex-col gap-2">
              <li onClick={handleClick}>Edit</li>
              <li>Delete</li>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopList;
