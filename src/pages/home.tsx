import { useWorkspaceToggle } from "@/components/organism/baseLayout";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/helper/formatter";
import { getGreeting } from "@/lib/helper/greeter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const date = new Date(); // Replace with your date
  const formattedDate = formatDate(date);
  const greeting = getGreeting();
  const [username, setUsername] = useState("");
  const { setIsFormOpen, workspaceDatas, setWorkspaceData } =
    useWorkspaceToggle();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUsername(username);
    const workspaceDatas = JSON.parse(localStorage.getItem("workspace")!);
    setWorkspaceData(workspaceDatas);
  }, []);

  return (
    <div className="flex h-[90%] flex-col rounded-md border-2 border-slate-300 p-4">
      <h1 className="text-md mb-2">{formattedDate}</h1>
      <h2 className="mb-10 text-2xl font-semibold">{`${greeting}, ${username} !`}</h2>
      <section className="flex flex-col gap-2">
        <h3 className="text-start text-xl">Workspace</h3>
        <hr className="my-4 w-full border-2 border-slate-300" />
        <div className="flex flex-wrap gap-6">
          {workspaceDatas && workspaceDatas.length > 0 ? (
            workspaceDatas.map(({ id, href, name }, index) => (
              <Button
                className="flex flex-col border-2 border-primary bg-transparent p-12"
                onClick={() => {
                  navigate(`${href}`);
                }}
                key={`${id}-${index}`}
              >
                <p className="text-primary dark:text-slate-50">{name}</p>
              </Button>
            ))
          ) : (
            <></>
          )}

          <Button
            className="flex flex-col border-2 border-primary bg-transparent p-12"
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            <span>
              <svg
                className="h-8 w-8 stroke-primary stroke-[6px] hover:stroke-primary hover:stroke-[3px]"
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

            <p className="text-primary dark:text-slate-50">Add Workspace</p>
          </Button>
        </div>
      </section>
      {/* <section className="flex flex-col gap-2">
        <h2 className="text-start text-xl">Workspace</h2>
        <hr className="w-full border-2 border-slate-300" />
      </section> */}
    </div>
  );
};

export default Home;
