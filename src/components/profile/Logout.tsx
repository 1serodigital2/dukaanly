import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMsg(error?.message || "Something went wrong");
      console.log("[handleLogout]", errorMsg);

      return;
    }
    setLoading(false);
    setErrorMsg("");
    router.replace("/login/");
  };

  return (
    <button
      className="cursor-pointer"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Processing..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
