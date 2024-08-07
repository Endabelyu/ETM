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
  const [searchValue, setSearchValue] = useState("");
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newId: string = Math.random().toString(36).slice(2, 11).toUpperCase();

    const fullPayload = { ...payloadForm, id: `E-${newId}`, finish: false };
    const columnDestination = localData.find(
      (task) => task.id === fullPayload.status,
    )!;
    columnDestination.tasks = [...columnDestination.tasks, fullPayload];
    const updateData = localData.map((column) =>
      column.id === columnDestination.id ? columnDestination : column,
    );

    localStorage.setItem("taskList", JSON.stringify(updateData));
    // console.log(updateData, "data");
    setTaskData(
      localData.map((column) => {
        if (columnDestination !== undefined) {
          if (column.id === columnDestination.id) {
            return columnDestination;
          }
        }
        return column;
      }),
    );

    // if (!localStorage.getItem("task")) {
    //   setTaskList([...taskList, fullPayload]);
    //   setPayloadForm({} as payloadForms);
    //   setToggleDialog(false);
    // } else {
    //   const currentTaskData = getDataStorage("task");
    //   setTaskList([...taskList, fullPayload]);
    //   currentTaskData.push(fullPayload);
    //   localStorage.setItem("task", JSON.stringify(currentTaskData));
    // }
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
        <BaseLayout setSearchValue={setSearchValue}>
          <div className="flex w-9/12 flex-col">
            <div className="my-4 flex justify-evenly gap-8">
              <DialogForm
                buttonDesc="Create Task"
                titleDialog="Your Journey Begins Here!"
                titleDescription={`Every great achievement begins with a single task. Take the first step towards your dreams today. Let's get started!`}
                functionSubmit={handleSubmit}
                functionChange={handleChange}
                formPayload={payloadForm}
                open={toggleDialog}
                setOpen={setToggleDialog}
              />
            </div>
            <TaskManager
              setOpen={setToggleDialog}
              listTask={taskData}
              setListTask={setTaskData}
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
