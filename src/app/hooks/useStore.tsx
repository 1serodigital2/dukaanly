import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useAuth } from "@/src/context/AuthContext";
import { useStores } from "@/src/features/shops/queries";
import { getCookie } from "@/src/lib/utils/functions";

const useShop = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getAllStores = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
      data: stores,
      error: storesError,
      isPending,
      isError,
    } = useStores(userId ?? "");

    // console.log("[Header] data", stores);

    return {
      stores,
      storesError,
      isPending,
      isError,
      setLoading,
      loading,
      setError,
      error,
    };
  };

  const getActiveStoreId = () => {
    return getCookie("ActiveStore");
  };

  return { getAllStores, getActiveStoreId };
};

export default useShop;
