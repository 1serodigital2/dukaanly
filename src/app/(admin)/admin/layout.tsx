import AdminHeader from "@/src/components/layout/AdminHeader";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  console.log("[AdminLayout] triggered");

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default AdminLayout;
