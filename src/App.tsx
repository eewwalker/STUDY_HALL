import './App.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Task } from './types/task';
import TaskDetail from './components/TaskDetail';

/**
 * Component App
 * State: tasksArr [{id: number, title: 'string', time: number}, {}...]
 *        activeTaskId number | null
 * Props: None
 *
 */
export default function App() {
  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  //useRef to avoid making extra fetch to API for data
  const fetched = useRef(false);

  useEffect(()=>{
      async function fetchTasks() {
        try{
          const data = await fetch(`http://localhost:3000/tasks`);
          const jsonData = await data.json();
          setTasksArr(jsonData)
          fetched.current = true;
        }catch(error){
          console.error('Error fetching tasks', error)
        }
      }
      if (!fetched.current) {
        fetchTasks()
      }

  },[])

  const activeTask = tasksArr.find(t => activeTaskId === t.id);

  //Handles updating state when title is changed in input field
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const updatedTitle = e.target.value;
    setTasksArr(prevTasks => prevTasks.map(t => {
      if (t.id === activeTaskId) {
        return { ...t, title: updatedTitle };
      }
      return t;
    }));
  }

  function handleSelectTask(id: number) {
    setActiveTaskId(id);
  }

  return (
    <div className='container mt-7 p-7 mx-auto bg-[#d4dffb]'>
      <h2 className="text-5xl text-[#ec1831] underline decoration-indigo-500/30 text-center">Study Hall</h2>
      <ul className="flex flex-col gap-2 my-3">
        {tasksArr.map(t => (
          <li key={t.id} className='flex m-1 cursor-pointer' onClick={() => handleSelectTask(t.id)}>
            <span className='text-[#2e3192] border-double border-4 border-[#19b5ff]  rounded-l p-2'>{t.title}</span>
            <span className="p-2 ml-3 border-dotted border-2 border-indigo-600 rounded-lg ">{t.time} {t.time === 1 ? 'hr' : 'hrs'}</span>
          </li>
        ))}
      </ul>
      {activeTask &&
        <TaskDetail task={activeTask} titleChange={handleTitleChange} />
      }

    </div>
  );
}
