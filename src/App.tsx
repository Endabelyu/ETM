import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import BaseLayout from '@/components/organism/baseLayout';

import { DialogForm } from '@/components/molecules/dialog-form';
import React, { useEffect, useState } from 'react';
import { getDataStorage } from './lib/helper/storage';
import Tasklist from '@/components/molecules/tasklist';
import Searchbar from './components/molecules/searchbar';

export type Task = {
  id: number;
  name: string;
  priority: string;
  status: string;
};

export type payloadForms = {
  id: number;
  name: string;
  priority: string;
  status: string;
};
function App() {
  const [payloadForm, setPayloadForm] = useState({} as payloadForms);
  const [taskList, setTaskList] = useState<Task[]>([] as Task[]);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredTask, setFilteredTask] = useState<Task[]>(taskList as Task[]);

  // set Tasklist value when page refreshed
  useEffect(() => {
    const taskData = JSON.parse(localStorage.getItem('task') || '[]');
    setTaskList(taskData);
  }, []);

  // filter tasklist value when searchValue and tasklist data available
  useEffect(() => {
    if (searchValue && taskList.length > 0) {
      const searchData = taskList.filter(
        (task) =>
          task.name.includes(searchValue) ||
          task.priority.includes(searchValue) ||
          task.status.includes(searchValue),
      );
      setFilteredTask(searchData);
    } else {
      setFilteredTask(taskList);
    }
  }, [searchValue, taskList]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newId: number = taskList.length + 1;
    const fullPayload = { ...payloadForm, id: newId };
    if (!localStorage.getItem('task')) {
      setTaskList([...taskList, fullPayload]);
      localStorage.setItem('task', JSON.stringify(taskList));
      setPayloadForm({} as payloadForms);
      setToggleDialog(false);
    } else {
      const currentTaskData = getDataStorage('task');
      setTaskList([...taskList, fullPayload]);
      currentTaskData.push(fullPayload);
      localStorage.setItem('task', JSON.stringify(currentTaskData));
      setPayloadForm({} as payloadForms);
      setToggleDialog(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;
    console.log(e, e.target, e.target.value, e.target.name, 'event change');
    setPayloadForm({
      ...payloadForm,
      [name]: value,
    });
  }

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <BaseLayout>
          <div className='tailwind.config.jsmy-4 tailwind.config.jsflex tailwind.config.jsgap-8 tailwind.config.jsjustify-evenly '>
            <Searchbar setSearch={setSearchValue} />
            <DialogForm
              buttonDesc='Create Task'
              titleDialog='Your Journey Begins Here!'
              titleDescription={`Every great achievement begins with a single task. Take the first step towards your dreams today. Let's get started!`}
              functionSubmit={handleSubmit}
              functionChange={handleChange}
              formPayload={payloadForm}
              open={toggleDialog}
              setOpen={setToggleDialog}
            />
          </div>
          <Tasklist taskData={filteredTask} />
        </BaseLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
