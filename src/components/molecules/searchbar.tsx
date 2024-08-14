import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

import React, { useEffect, useState } from "react";
import { workspaceData } from "../organism/baseLayout";
import { getTasksForWorkspace, getWorkspaces } from "@/lib/helper/storage";
import { Task } from "@/models/task";

interface IFilteredTask {
  task: Task;
  workspaceName: string;
  href: string;
}
const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredTasks, setFilteredTasks] = useState<IFilteredTask[]>([]);
  const [setWorkspaces] = useState<workspaceData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedWorkspaces = getWorkspaces();
    setWorkspaces(storedWorkspaces);
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workspaces: workspaceData[] = JSON.parse(
      localStorage.getItem("workspace")!,
    );
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 0) {
      const results = workspaces.flatMap((workspace) => {
        console.log(workspaces, "wspc");
        const taskLists = getTasksForWorkspace(workspace.id);
        console.log(taskLists, "task");

        if (taskLists.length === 0) return [];
        return taskLists.flatMap((taskList) =>
          (taskList.tasks || [])
            .filter((task) =>
              task.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((task) => ({
              task,
              workspaceName: workspace.name,
              href: workspace.href,
            })),
        );
      });
      console.log(results, "results");
      setFilteredTasks(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <Input
        type="text"
        id="search"
        name="search"
        className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {showSuggestions && (
        <ul className="light:bg-white absolute z-10 mt-1 w-full rounded-md border border-primary shadow-lg dark:bg-[#020817]">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(({ task, href, workspaceName }) => (
              <li
                key={task.id}
                className="cursor-pointer rounded-md border-0 bg-slate-100 p-2 hover:bg-gray-100"
                onClick={() => {
                  navigate(href);
                  setSearchTerm("");
                  setShowSuggestions(false);
                }}
              >
                <Link to={href}>
                  <p>{`Workspace : ${workspaceName}`}</p>
                  <p>{`Title : ${task.name}`}</p>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
