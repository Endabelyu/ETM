import React from "react";
import Navbar from "@/components/molecules/navbar";
import Sidebar from "../molecules/sidebar";
type baseLayoutProps = {
  children: React.ReactNode;
  setSearchValue?: (search: string) => void;
};
const BaseLayout = ({
  children,
  // setSearchValue: searchValue,
}: baseLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        <div className="w-9/12 py-8">{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
