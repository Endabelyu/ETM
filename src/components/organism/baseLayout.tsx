import React from "react";
import Navbar from "@/components/molecules/navbar";
import Sidebar from "../molecules/sidebar";
type baseLayoutProps = {
  children: React.ReactNode;
  setSearchValue: (search: string) => void;
};
const BaseLayout = ({
  children,
  setSearchValue: searchValue,
}: baseLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Navbar setSearchValue={searchValue} />
      <div className="flex gap-8">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
