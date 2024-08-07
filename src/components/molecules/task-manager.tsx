// TaskManager.tsx
import { payloadForms, TaskList } from "@/models/task";
import { DragEvent } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
// types.ts

export type taskProps = {
  listTask: TaskList[];
  setListTask: (listTask: TaskList[]) => void;
  setOpen: (toggleDialog: boolean) => void;
  open?: boolean;
  setPayload: (payloadForm: payloadForms) => void;
  formPayload: payloadForms;
};

const TaskManager = ({
  listTask,
  setListTask,
  setOpen,
  open,
  setPayload,
  formPayload,
}: taskProps) => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    taskId: string,
    sourceSectionId: string,
  ) => {
    event.dataTransfer.setData("taskId", taskId.toString());
    event.dataTransfer.setData("sourceSectionId", sourceSectionId);
  };

  const onDrop = (
    event: DragEvent<HTMLDivElement>,
    destinationColumnId: string,
  ) => {
    const localData: TaskList[] = JSON.parse(localStorage.getItem("taskList")!);
    const taskId = event.dataTransfer.getData("taskId");
    const sourceSectionId = event.dataTransfer.getData("sourceSectionId");

    if (sourceSectionId === destinationColumnId) return;

    const sourceSection = listTask.find(
      (section) => section.id === sourceSectionId,
    )!;
    const destinationColumn = listTask.find(
      (section) => section.id === destinationColumnId,
    )!;
    const task = sourceSection.tasks.find((task) => task.id === taskId)!;

    console.log(task, "tasskk");
    sourceSection.tasks = sourceSection.tasks.filter(
      (task) => task.id !== taskId,
    );
    task.status = destinationColumnId;

    destinationColumn.tasks = [...destinationColumn.tasks, task];
    const updateData = localData.map((column) =>
      column.id === sourceSection.id
        ? sourceSection
        : column.id === destinationColumn.id
          ? destinationColumn
          : column,
    );
    localStorage.setItem("taskList", JSON.stringify(updateData));
    setListTask(
      listTask.map((column) =>
        column.id === sourceSection.id
          ? sourceSection
          : column.id === destinationColumn.id
            ? destinationColumn
            : column,
      ),
    );
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  function priorityDescription(priority: string): string {
    switch (priority) {
      case "P-1":
        return "Low";
      case "P-2":
        return "Medium";
      case "P-3":
        return "High";
      default:
        return "None";
    }
  }
  function statusDescription(status: string): string {
    switch (status) {
      case "S-1":
        return "To-Do";
      case "S-2":
        return "Doing";
      case "S-3":
        return "Done";
      default:
        return "None";
    }
  }
  return (
    <div className="flex h-full justify-between gap-8">
      {listTask.map((column) => (
        <div
          key={column.title}
          className="h-full w-4/12 rounded-md border-2 p-2"
        >
          <div className="flex justify-between">
            <h2 className="text-left text-xl font-semibold text-slate-500">
              {column.title}
            </h2>
            <Button
              className="bg-transparent hover:bg-transparent"
              onClick={() => {
                setPayload({ ...formPayload, status: column.id });
                setOpen(!open);
              }}
            >
              <svg
                className="h-8 w-8 stroke-primary stroke-[6px] hover:stroke-[3px]"
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
            </Button>
          </div>

          <div
            key={column.id}
            onDrop={(event) => onDrop(event, column.id)}
            onDragOver={onDragOver}
            className="flex h-full flex-col gap-4 p-2"
          >
            {column.tasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(event) => onDragStart(event, task.id, column.id)}
                className="light:bg-sky-100 flex cursor-grab flex-col gap-4 rounded-md border-2 p-6"
              >
                <p className="text-left">{task.name}</p>

                <span className="flex gap-4 text-left">
                  <Badge
                    variant={
                      task.priority === "P-1"
                        ? "priorityLow"
                        : task.priority === "P-2"
                          ? "priorityMedium"
                          : "priorityHigh"
                    }
                  >
                    {priorityDescription(task.priority)}
                  </Badge>
                  <Badge
                    variant={
                      task.status === "S-1"
                        ? "statusTodo"
                        : task.status === "S-2"
                          ? "statusDoing"
                          : "statusDone"
                    }
                  >
                    {statusDescription(task.status)}
                  </Badge>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskManager;
