import Navbar from "@/components/molecules/navbar";
import Sidebar from "../molecules/sidebar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../theme-provider";
import { createContext, useContext, useState } from "react";
import { DialogUsername } from "../molecules/dialog-username";
// type baseLayoutProps = {
//   children: React.ReactNode;
//   setSearchValue?: (search: string) => void;
// };
export type workspaceData = {
  id: string;
  name: string;
  href: string;
};

interface WorkspaceContextType {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
  setWorkspaceData: (value: workspaceData[]) => void;
  setIdWorkspace?: (value: string) => void;
  idWorkspace?: string;
  workspaceDatas: workspaceData[];
}
const WorkspaceToggleContext = createContext<WorkspaceContextType>({
  isFormOpen: false,
  setIsFormOpen: () => {},
  setWorkspaceData: () => {},
  workspaceDatas: [],
  idWorkspace: "",
  setIdWorkspace: () => {},
});

export function useWorkspaceToggle() {
  return useContext(WorkspaceToggleContext);
}
const BaseLayout = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [workspaceDatas, setWorkspaceData] = useState<workspaceData[]>([]);
  const [idWorkspace, setIdWorkspace] = useState<string>("");

  return (
    <ThemeProvider defaultTheme={"light"} storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex gap-8">
          <WorkspaceToggleContext.Provider
            value={{
              isFormOpen,
              setIsFormOpen,
              workspaceDatas,
              setWorkspaceData,
              idWorkspace,
              setIdWorkspace,
            }}
          >
            <Sidebar />
            <div className="min-h-screen w-9/12 py-8">
              <Outlet />
            </div>
            <DialogUsername />
          </WorkspaceToggleContext.Provider>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default BaseLayout;
