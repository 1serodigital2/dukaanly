"use client";
import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        <div></div>
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
