"use client";
import { useState, useEffect } from "react";
import useShop from "@/src/app/hooks/useStore";
import LogoutButton from "../profile/Logout";
import { getCookie, setCookie } from "@/src/lib/utils/functions";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { getAllStores } = useShop();
  const { error, stores, setLoading, setError, loading } = getAllStores();

  const [activeStoreId, setActiveStoreId] = useState("");

  useEffect(() => {
    const cookieStoreId = getCookie("ActiveStore");
    if (cookieStoreId) setActiveStoreId(cookieStoreId);

    // console.log("cookieStoreId", cookieStoreId);
  }, [activeStoreId]);

  const handleChange = (value: string) => {
    setActiveStoreId(value);
    setCookie("ActiveStore", value, 30);
    router.replace("/shop/" + value);
  };
  return (
    <>
      <header className="flex justify-between px-5 py-3 border-b">
        <div>
          {stores && (
            <select
              name="activeStore"
              id="activeStore"
              value={activeStoreId}
              onChange={(e) => handleChange(e.target.value)}
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <LogoutButton />
      </header>
      {error && <p>{error}</p>}
    </>
  );
};

export default Header;
