export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}

export type Task = {
  id: string;
  name: string;
  priority: string;
  status: string;
  finish?: boolean;
};

export type payloadForms = {
  id: string;
  name: string;
  priority: string;
  status: string;
};

export const initialData: TaskList[] = [
  {
    id: "S-1",
    title: "To-do",
    tasks: [],
  },
  {
    id: "S-2",
    title: "Ongoing",
    tasks: [],
  },
  {
    id: "S-3",
    title: "Done",
    tasks: [],
  },
];
