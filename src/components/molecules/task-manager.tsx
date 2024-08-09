// TaskManager.tsx
import { payloadForms, TaskList } from "@/models/task";
import { DragEvent, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { priorityDescription, statusDescription } from "@/lib/helper/option";
// types.ts

export type taskProps = {
  listTask: TaskList[];
  setListTask: (listTask: TaskList[]) => void;
  setEdit: (isEdit: boolean) => void;
  setOpen: (toggleDialog: boolean) => void;
  open?: boolean;
  setPayload: (payloadForm: payloadForms) => void;
  formPayload: payloadForms;
};

const TaskManager = ({
  listTask,
  setListTask,
  setEdit,
  setOpen,
  open,

  setPayload,
  formPayload,
}: taskProps) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
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
    // if (sourceSectionId === destinationColumnId && dragOverIndex === null)
    //   return;

    const sourceSection = listTask.find(
      (section) => section.id === sourceSectionId,
    )!;
    const destinationColumn = listTask.find(
      (section) => section.id === destinationColumnId,
    )!;
    const task = sourceSection.tasks.find((task) => task.id === taskId)!;

    sourceSection.tasks = sourceSection.tasks.filter(
      (task) => task.id !== taskId,
    );

    // Determine the destination index
    const destinationIndex =
      dragOverIndex !== null ? dragOverIndex : destinationColumn.tasks.length;

    if (sourceSectionId === destinationColumnId) {
      // Reordering within the same column
      destinationColumn.tasks.splice(destinationIndex, 0, task);
    } else {
      // Moving to a different column
      task.status = destinationColumnId;
      destinationColumn.tasks.splice(destinationIndex, 0, task);
    }
    // destinationColumn.tasks = [...destinationColumn.tasks, task];

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
    setDragOverIndex(null); // Reset dragOverIndex after drop
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    console.log(index);
    setDragOverIndex(index);
  };
  const onDelete = (taskId: string, columnId: string) => {
    const localData: TaskList[] = JSON.parse(localStorage.getItem("taskList")!);
    // if (sourceSectionId === destinationColumnId && dragOverIndex === null)
    //   return;

    const sourceSection = localData.find((section) => section.id === columnId)!;
    const task = sourceSection.tasks.find((task) => task.id !== taskId)!;
    if (task) {
      sourceSection.tasks = [task];
    } else {
      sourceSection.tasks = [];
    }
    const updateData = localData.map((column) =>
      column.id === columnId ? sourceSection : column,
    );
    localStorage.setItem("taskList", JSON.stringify(updateData));
    setListTask(
      listTask.map((column) =>
        column.id === columnId ? sourceSection : column,
      ),
    );
  };
  return (
    <div className="flex h-full justify-between gap-8">
      {listTask && listTask.length > 0 ? (
        listTask.map((column, index) => (
          <div
            key={column.title}
            className={`h-full w-4/12 rounded-md border-2`}
          >
            <div
              className={`mb-6 flex justify-between p-2 ${column.id === "S-1" ? "bg-slate-300" : column.id === "S-2" ? "bg-blue-300" : "bg-green-300"}`}
            >
              <h2 className="text-left text-xl font-semibold text-slate-700">
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
              onDragOver={(event) => onDragOver(event, index)}
              className="flex h-full flex-col gap-4 p-2"
            >
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(event) =>
                    onDragStart(event, task.id, column.id)
                  }
                  className="light:bg-sky-100 flex h-28 cursor-grab flex-col rounded-md border-2 px-4 py-2"
                >
                  <div className="flex justify-end gap-2">
                    <Button
                      className="h-6 w-6 self-end bg-green-400 p-0 hover:bg-green-200"
                      onClick={() => {
                        setOpen(!open);
                        setEdit(true);

                        setPayload({
                          id: task.id,
                          name: task.name,
                          priority: task.priority,
                          status: task.status,
                        });
                        console.log(task.id, column.id);
                      }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-white"
                      >
                        <path d="M3.33331 12.0001H6.15998C6.24772 12.0006 6.33469 11.9838 6.41592 11.9506C6.49714 11.9175 6.57102 11.8686 6.63331 11.8068L11.2466 7.18679L13.14 5.33346C13.2025 5.27148 13.2521 5.19775 13.2859 5.11651C13.3198 5.03527 13.3372 4.94813 13.3372 4.86012C13.3372 4.77211 13.3198 4.68498 13.2859 4.60374C13.2521 4.5225 13.2025 4.44876 13.14 4.38679L10.3133 1.52679C10.2513 1.4643 10.1776 1.41471 10.0964 1.38086C10.0151 1.34702 9.92799 1.32959 9.83998 1.32959C9.75197 1.32959 9.66484 1.34702 9.5836 1.38086C9.50236 1.41471 9.42862 1.4643 9.36665 1.52679L7.48665 3.41346L2.85998 8.03346C2.79819 8.09575 2.74931 8.16963 2.71613 8.25085C2.68296 8.33208 2.66614 8.41905 2.66665 8.50679V11.3335C2.66665 11.5103 2.73688 11.6798 2.86191 11.8049C2.98693 11.9299 3.1565 12.0001 3.33331 12.0001ZM9.83998 2.94012L11.7266 4.82679L10.78 5.77346L8.89331 3.88679L9.83998 2.94012ZM3.99998 8.78012L7.95331 4.82679L9.83998 6.71346L5.88665 10.6668H3.99998V8.78012ZM14 13.3335H1.99998C1.82317 13.3335 1.6536 13.4037 1.52858 13.5287C1.40355 13.6537 1.33331 13.8233 1.33331 14.0001C1.33331 14.1769 1.40355 14.3465 1.52858 14.4715C1.6536 14.5966 1.82317 14.6668 1.99998 14.6668H14C14.1768 14.6668 14.3464 14.5966 14.4714 14.4715C14.5964 14.3465 14.6666 14.1769 14.6666 14.0001C14.6666 13.8233 14.5964 13.6537 14.4714 13.5287C14.3464 13.4037 14.1768 13.3335 14 13.3335Z" />
                      </svg>
                    </Button>
                    <Button
                      className="h-6 w-6 self-end bg-red-400 p-0 hover:bg-red-200"
                      onClick={() => {
                        onDelete(task.id, column.id);
                      }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-white"
                      >
                        <path d="M6.66667 11.9999C6.84348 11.9999 7.01305 11.9297 7.13807 11.8047C7.2631 11.6796 7.33333 11.5101 7.33333 11.3333V7.33325C7.33333 7.15644 7.2631 6.98687 7.13807 6.86185C7.01305 6.73682 6.84348 6.66659 6.66667 6.66659C6.48986 6.66659 6.32029 6.73682 6.19526 6.86185C6.07024 6.98687 6 7.15644 6 7.33325V11.3333C6 11.5101 6.07024 11.6796 6.19526 11.8047C6.32029 11.9297 6.48986 11.9999 6.66667 11.9999ZM13.3333 3.99992H10.6667V3.33325C10.6667 2.80282 10.456 2.29411 10.0809 1.91904C9.70581 1.54397 9.1971 1.33325 8.66667 1.33325H7.33333C6.8029 1.33325 6.29419 1.54397 5.91912 1.91904C5.54405 2.29411 5.33333 2.80282 5.33333 3.33325V3.99992H2.66667C2.48986 3.99992 2.32029 4.07016 2.19526 4.19518C2.07024 4.32021 2 4.48977 2 4.66659C2 4.8434 2.07024 5.01297 2.19526 5.13799C2.32029 5.26301 2.48986 5.33325 2.66667 5.33325H3.33333V12.6666C3.33333 13.197 3.54405 13.7057 3.91912 14.0808C4.29419 14.4559 4.8029 14.6666 5.33333 14.6666H10.6667C11.1971 14.6666 11.7058 14.4559 12.0809 14.0808C12.456 13.7057 12.6667 13.197 12.6667 12.6666V5.33325H13.3333C13.5101 5.33325 13.6797 5.26301 13.8047 5.13799C13.9298 5.01297 14 4.8434 14 4.66659C14 4.48977 13.9298 4.32021 13.8047 4.19518C13.6797 4.07016 13.5101 3.99992 13.3333 3.99992ZM6.66667 3.33325C6.66667 3.15644 6.7369 2.98687 6.86193 2.86185C6.98695 2.73682 7.15652 2.66659 7.33333 2.66659H8.66667C8.84348 2.66659 9.01305 2.73682 9.13807 2.86185C9.2631 2.98687 9.33333 3.15644 9.33333 3.33325V3.99992H6.66667V3.33325ZM11.3333 12.6666C11.3333 12.8434 11.2631 13.013 11.1381 13.138C11.013 13.263 10.8435 13.3333 10.6667 13.3333H5.33333C5.15652 13.3333 4.98695 13.263 4.86193 13.138C4.7369 13.013 4.66667 12.8434 4.66667 12.6666V5.33325H11.3333V12.6666ZM9.33333 11.9999C9.51014 11.9999 9.67971 11.9297 9.80474 11.8047C9.92976 11.6796 10 11.5101 10 11.3333V7.33325C10 7.15644 9.92976 6.98687 9.80474 6.86185C9.67971 6.73682 9.51014 6.66659 9.33333 6.66659C9.15652 6.66659 8.98695 6.73682 8.86193 6.86185C8.7369 6.98687 8.66667 7.15644 8.66667 7.33325V11.3333C8.66667 11.5101 8.7369 11.6796 8.86193 11.8047C8.98695 11.9297 9.15652 11.9999 9.33333 11.9999Z" />
                      </svg>
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
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
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskManager;
