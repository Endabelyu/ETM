import React, { useEffect, useState } from "react";

import { DialogForm } from "@/components/molecules/dialog-form";
import { initialData, payloadForms, TaskList } from "@/models/task";
import { useToast } from "@/components/ui/use-toast";
import TaskManager from "@/components/molecules/task-manager";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const Workspace = () => {
  const [payloadForm, setPayloadForm] = useState({} as payloadForms);
  const [searchParams] = useSearchParams();
  const wspace = searchParams.get("wspace")!;
  const [taskData, setTaskData] = useState<TaskList[]>(initialData);
  const localData: TaskList[] = JSON.parse(localStorage.getItem(wspace)!);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  // const [searchValue, setSearchValue] = useState("");
  // set Tasklist value when page refreshed
  // useEffect(() => {
  //   const taskData = JSON.parse(localStorage.getItem("task") || "[]");
  // }, []);

  // filter tasklist value when searchValue and tasklist data available

  // useEffect(() => {
  //   localStorage.setItem("task", JSON.stringify(taskList));
  // }, [taskList]);

  // useEffect(() => {
  //   if (searchValue && taskData.tas.length > 0) {
  //     const searchData = taskList.filter(
  //       (task) =>
  //         task.name.includes(searchValue) ||
  //         task.priority.includes(searchValue) ||
  //         task.status.includes(searchValue),
  //     );
  //     setFilteredTask(searchData);
  //   } else {
  //     setFilteredTask(taskList);
  //   }
  // }, [searchValue, taskList]);
  useEffect(() => {
    if (wspace in localStorage) {
      const localData = JSON.parse(localStorage.getItem(wspace)!);
      setTaskData(localData);
    } else {
      localStorage.setItem(wspace, JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    if (wspace in localStorage) {
      const localData = JSON.parse(localStorage.getItem(wspace)!);
      setTaskData(localData);
    } else {
      localStorage.setItem(wspace, JSON.stringify(initialData));
    }
  }, [wspace]);
  useEffect(() => {
    if (toggleDialog === false) {
      setPayloadForm({} as payloadForms);
      setIsEdit(false);
    }
  }, [toggleDialog]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { id, status } = payloadForm;

    if (isEdit) {
      const currentColumnId = localData.find((column) =>
        column.tasks.some((task) => task.id === id),
      )?.id;
      // Editing existing task
      if (currentColumnId) {
        const currentColumn = localData.find(
          (column) => column.id === currentColumnId,
        );
        const targetColumn = localData.find((column) => column.id === status);

        if (currentColumn && targetColumn) {
          // Remove task from current column
          currentColumn.tasks = currentColumn.tasks.filter(
            (task) => task.id !== id,
          );

          // Update task data
          const updatedTask = { ...payloadForm, id };
          targetColumn.tasks = [...targetColumn.tasks, updatedTask];

          // Update localData
          const updateData = localData.map((column) =>
            column.id === currentColumnId
              ? currentColumn
              : column.id === status
                ? targetColumn
                : column,
          );

          localStorage.setItem(wspace, JSON.stringify(updateData));
          setTaskData(updateData);
        }
      }
    } else {
      // Adding new task
      const newId: string = Math.random()
        .toString(36)
        .slice(2, 11)
        .toUpperCase();
      const fullPayload = { ...payloadForm, id: `E-${newId}`, finish: false };
      const targetColumn = localData.find((column) => column.id === status);

      if (targetColumn) {
        targetColumn.tasks = [...targetColumn.tasks, fullPayload];
        const updateData = localData.map((column) =>
          column.id === status ? targetColumn : column,
        );

        localStorage.setItem(wspace, JSON.stringify(updateData));
        setTaskData(updateData);
      }
    }
    if (isEdit) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 border-0",
        ),
        variant: "success",
        title: "Task Edited",
        description: "Your current task has been successfully edited.",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 border-0",
        ),
        variant: "success",
        title: "Task Added",
        description: "A new task has been successfully added.",
      });
    }
    // Reset the form and close the dialog
    setPayloadForm({} as payloadForms);
    setToggleDialog(false);
  }

  function handleChange(value: string, name: string) {
    setPayloadForm({
      ...payloadForm,
      [name]: value,
    });
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-evenly gap-8">
        <DialogForm
          buttonDesc="Create Task"
          titleDialog="Your Journey Begins Here!"
          titleDescription={`Every great achievement begins with a single task. Take the first step towards your dreams today. Let's get started!`}
          functionSubmit={handleSubmit}
          functionChange={handleChange}
          formPayload={payloadForm}
          isEdit={isEdit}
          open={toggleDialog}
          setOpen={setToggleDialog}
        />
      </div>
      <TaskManager
        setOpen={setToggleDialog}
        listTask={taskData}
        setListTask={setTaskData}
        setEdit={setIsEdit}
        setPayload={setPayloadForm}
        formPayload={payloadForm}
      />
    </div>
  );
};

export default Workspace;
