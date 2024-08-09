import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import BaseLayout from "@/components/organism/baseLayout";

import { DialogForm } from "@/components/molecules/dialog-form";
import React, { useEffect, useState } from "react";
import TaskManager from "./components/molecules/task-manager";
import { TaskList, initialData, payloadForms } from "./models/task";

function App() {
  const [payloadForm, setPayloadForm] = useState({} as payloadForms);
  const [taskData, setTaskData] = useState<TaskList[]>(initialData);
  const localData: TaskList[] = JSON.parse(localStorage.getItem("taskList")!);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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
    if ("taskList" in localStorage) {
      const localData = JSON.parse(localStorage.getItem("taskList")!);
      setTaskData(localData);
    } else {
      localStorage.setItem("taskList", JSON.stringify(initialData));
    }
  }, []);

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

          localStorage.setItem("taskList", JSON.stringify(updateData));
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

        localStorage.setItem("taskList", JSON.stringify(updateData));
        setTaskData(updateData);
      }
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
    <>
      <ThemeProvider defaultTheme={"light"} storageKey="vite-ui-theme">
        <BaseLayout>
          <div className="flex w-9/12 flex-col">
            <div className="my-4 flex justify-evenly gap-8">
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
        </BaseLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
