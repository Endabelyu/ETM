import { workspaceData } from "@/components/organism/baseLayout";
import { TaskList } from "@/models/task";

export function getDataStorage(key: string) {
  const data = JSON.parse(localStorage.getItem(key) || "[]");
  return data;
}

export const getWorkspaces = (): workspaceData[] => {
  const workspaces = localStorage.getItem("workspaces");
  return workspaces ? JSON.parse(workspaces) : [];
};

export const getTasksForWorkspace = (workspaceId: string): TaskList[] => {
  const tasks = localStorage.getItem(workspaceId);
  return tasks ? JSON.parse(tasks) : [];
};
