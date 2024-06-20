import { useEffect, useRef, useState } from 'react';
import { Task } from '../types/task';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

/**
 * Component TasksList
 * State: tasksArr [{id: number, title: 'string', time: number}, {}...]
 * Props: None
 *
 */

const apiUrl = import.meta.env.VITE_API_URL;
const notify = () => toast('task deleted!', {
  style: {
    border: '1px solid #2e3192',
    padding: '16px',
    color: '#2e3192',
  }
});

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  //useRef to avoid making extra fetch to API for data
  const fetched = useRef(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await fetch(`${apiUrl}/tasks`);
        const jsonData = await data.json();
        setTasks(jsonData);
        fetched.current = true;
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    }
    if (!fetched.current) {
      fetchTasks();
    }

  }, []);

  async function deleteTask(task: Task) {
    try {
      const resp = await fetch(`${apiUrl}/tasks/${task.id}`, {
        method: 'DELETE'
      });

      if (!resp.ok) throw new Error('Request failed' + resp.statusText);
      setTasks(preTasks => preTasks.filter(t => t.id !== task.id));
      notify();

    } catch (error) {
      console.error(`Failed to delete task ${error}`);
    }
  }

  return (
    <div className='container mt-5 p-7 mx-auto bg-[#d4dffb]'>
      <h4 className='text-center mb-6'>WORK FOR : {new Date().toLocaleDateString() + ""}</h4>
      <ul className="flex flex-col gap-2 my-3">
        {tasks.map(t => (
          <Link key={t.id} className='flex m-1 cursor-pointer' to={`/tasks/${t.id}`}>
            <span
              onClick={(e) => {
                e.preventDefault();
                deleteTask(t);
              }}
              className='px-1 mr-2 cursor-pointer mt-3'>
              X
            </span>
            <span className='text-[#2e3192] border-double border-4 border-[#19b5ff]  rounded-l p-2'>{t.title}</span>
            <span className="p-2 ml-3  ">{t.time} {t.time === 1 ? 'hr' : 'hrs'}</span>
          </Link>
        ))}
      </ul>
      <div className="flex gap-3">

        <Link to='/tasks/create' className='btn'> Add new task</Link>
      </div>
      <Toaster position="bottom-center"
        reverseOrder={false} />
    </div>
  );
}