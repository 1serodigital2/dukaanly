import Header from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import { ReactNode } from "react";

const ShopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-5">{children}</div>
      </main>
    </div>
  );
};

export default ShopLayout;
