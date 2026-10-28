"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteStore } from "@/src/features/shops/queries";
import { ShopCardData, ShopCardProps } from "@/src/features/shops/types";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";

const ShopList = ({ data }: ShopCardProps) => {
  const router = useRouter();

  // let deleteId = 0;
  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
    variables: deleteId,
  } = useDeleteStore();
  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    console.log("[handleClick] clicked edit");
  };

  const handleDelete = (e: MouseEvent<HTMLLIElement>, id: number) => {
    e.preventDefault();
    console.log("[delete clicked]");
    // deleteId = id;
    mutate(id, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {isError && <p>{error.message}</p>}
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
              <li onClick={(e) => handleDelete(e, store.id)}>
                {isPending && store.id === deleteId ? "Deleting..." : "Delete"}
              </li>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopList;
