import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import Header from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import { AuthProvider } from "@/src/context/AuthContext";

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
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <div className="p-5">{children}</div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;
