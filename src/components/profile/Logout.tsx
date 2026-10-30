"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      router.replace("/login/");
      router.refresh();
    } catch (error) {
      console.error("[handleLogout]", error);

      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="cursor-pointer"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Logout"}
      </button>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </div>
  );
};

export default LogoutButton;
