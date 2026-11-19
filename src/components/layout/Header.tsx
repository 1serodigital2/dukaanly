"use client";
import { useState, useEffect } from "react";
import useShop from "@/src/app/hooks/useStore";
import LogoutButton from "../profile/Logout";

const Header = () => {
  const { getAllStores } = useShop();
  const { error, stores, setLoading, setError, loading } = getAllStores();

  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      if (cookie.startsWith(name + "=")) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  const [activeStoreId, setActiveStoreId] = useState("");

  useEffect(() => {
    const cookieStoreId = getCookie("ActiveStore");
    if (cookieStoreId) setActiveStoreId(cookieStoreId);

    console.log("cookieStoreId", cookieStoreId);
  }, [activeStoreId]);
  return (
    <>
      <header className="flex justify-between px-5 py-3 border-b">
        <div>
          {stores && (
            <select name="activeStore" id="activeStore" value={activeStoreId}>
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
