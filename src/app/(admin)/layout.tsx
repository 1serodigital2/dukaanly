import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import Header from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import { AuthProvider } from "@/src/context/AuthContext";
// import LogoutButton from "@/src/components/profile/Logout";
import AdminHeader from "@/src/components/layout/AdminHeader";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <AuthProvider initialUser={user}>
      <AdminHeader />
      {children}
    </AuthProvider>
  );
};

export default DashboardLayout;
