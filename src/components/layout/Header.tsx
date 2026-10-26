"use client";
import { useContext, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { useStore, useStores } from "@/src/features/shops/queries";
import useShop from "@/src/app/hooks/useStore";

const Header = () => {
  const { getAllStores } = useShop();
  const { error, stores, setLoading, setError, loading } = getAllStores();

  console.log("[Header] data", stores);
  console.log("[Header] error", error);

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error?.message || "Something went wrong");
      setLoading(false);
      return;
    }
    setLoading(false);
    setError("");
    router.replace("/login/");
  };

  return (
    <>
      <header className="flex justify-between px-5 py-3 border-b">
        <div>
          {stores && (
            <select name="" id="">
              {stores.map((store) => (
                <option key={store.id}>{store.name}</option>
              ))}
            </select>
          )}
        </div>
        <button
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Logout"}
        </button>
      </header>
      {error && <p>{error}</p>}
    </>
  );
};

export default Header;
