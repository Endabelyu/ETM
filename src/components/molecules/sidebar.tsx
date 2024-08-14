import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useWorkspaceToggle } from "../organism/baseLayout";
import { Button } from "../ui/button";
import { Link, useSearchParams } from "react-router-dom";

// type navbarProps = {
//   title?: string;
// };
const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [taskActive, setTaskActive] = useState("");
  const { setIsFormOpen, workspaceDatas } = useWorkspaceToggle();
  const [searchParams] = useSearchParams();
  const wspace = searchParams.get("wspace")!;
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUsername(username);
  }, []);

  useEffect(() => {
    if (wspace) setTaskActive(wspace);
    console.log(wspace, "ws");
  }, [wspace]);

  return (
    <div className="min-h-screen w-3/12 border-r-2 py-4">
      <div className="">
        <h1 className="bold text-wrap text-xl">{username}</h1>
        <hr className="my-4 w-full border-2 border-slate-300" />

        <NavigationMenu className={`items-start`}>
          <NavigationMenuList className="h-full w-full flex-col justify-start gap-8 overflow-auto">
            <NavigationMenuItem className="">
              <Link to="/home">
                <h1 className="bold text-left text-lg">Home</h1>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <hr className="my-4 w-full border-2 border-slate-300" />
        <div>
          <span className="flex justify-between gap-8 px-6">
            <p className="">Workspace</p>
            <Button
              className="my-0 flex h-4 flex-col items-center self-center bg-transparent p-0 hover:bg-transparent"
              onClick={() => {
                setIsFormOpen(true);
              }}
            >
              <span>
                <svg
                  className="h-6 w-6 stroke-primary stroke-[6px] hover:stroke-primary hover:stroke-[3px]"
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37 15.4167V58.5833"
                    stroke=""
                    stroke-width=""
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.4167 37H58.5833"
                    stroke=""
                    stroke-width=""
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </Button>
          </span>

          <div className="mt-4 flex max-h-[30rem] flex-col gap-6 overflow-auto">
            {workspaceDatas && workspaceDatas.length > 0 ? (
              workspaceDatas.map(({ id, href, name }, index) => (
                <Link
                  key={`${id}-${index}`}
                  to={href}
                  className={`${href.includes(taskActive) ? "bg-sky-200" : ""} py-4`}
                >
                  {name}
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
