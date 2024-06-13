import './App.css';
import { ChangeEvent, useState } from 'react';
import { Task } from './types/task';
import { TASKS } from './data/tasks';

/**
 * Component App
 * State: tasksArr [{id: number, title: 'string', time: number}, {}...]
 *        activeTaskId number | null
 * Props: None
 *
 */
export default function App() {
  const [tasksArr, setTasksArr] = useState<Task[]>(TASKS);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const activeTask = tasksArr.find(t => activeTaskId === t.id)

  //Handles updating state when title is changed in input field
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const updatedTitle = e.target.value;
    setTasksArr(prevTasks => prevTasks.map(t => {
      if (t.id === activeTaskId) {
        return {...t, title: updatedTitle}
      }
      return t
    }) )
  }

  function handleSelectTask(id: number) {
    setActiveTaskId(id);
  }

  return (
    <div className='container mt-7 p-4 mx-auto bg-[#d4dffb]'>
      <h2 className="text-4xl text-[#ec1831] underline decoration-indigo-500/30">Study Plan</h2>
      <ul className="flex flex-col gap-2 my-3">
        {tasksArr.map(t => (
          <li key={t.id} className='flex m-1 cursor-pointer' onClick={() => handleSelectTask(t.id)}>
            <span className='text-[#2e3192] border-double border-4 border-[#19b5ff]  rounded-l p-2'>{t.title}</span>
            <span className="p-2 ml-3 border-dotted border-2 border-indigo-600 rounded-lg ">{t.time} {t.time === 1 ? 'hr' : 'hrs'}</span>
          </li>
        ))}
      </ul>
      {activeTask &&
      <>
      <h2 className='text-3xl text-[#ec1831] mb-2 p-1'>Details</h2>
      <div>
        <span className='text-[#ec1831]'>ID: </span>{activeTask.id}
      </div>
      <div className="space-x-2">
        <span className="text-[#ec1831]">Title:</span>
        <span className="uppercase">{activeTask.title}</span>
      </div>
      <div>
        <div className='flex'>
          <span className='text-[#ec1831]'>Time Commitment:</span>
          <span className='ml-1 mr-1'>{activeTask.time}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

      </div>
      <div className="flex flex-col gap-2 mt-4 border-t">
        <label className='text-2xl text-[#ec1831]'>Task Title</label>
        <input
          placeholder='title'
          className='border border-[#2e3192] rounded-lg p-2 w-1/4'
          value={activeTask.title}
          onChange={handleTitleChange}
        />
           </div>
        </>
      }




    </div>
  );
}
