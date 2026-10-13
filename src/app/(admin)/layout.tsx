import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import Header from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";

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
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-5">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
