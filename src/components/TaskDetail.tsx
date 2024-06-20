import { useEffect, useRef, useState } from "react";
import { Task } from "../types/task";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskForm";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * TaskDetail component
 */
export default function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const params = useParams();
  const fetched = useRef(false);

  useEffect(() => {
    async function fetchTaskDetail() {
      try {
        const jsonData = await fetch(`${apiUrl}/tasks/${params.id}`);
        const data = await jsonData.json();
        setTask(data);
        fetched.current = true;

      } catch (error) {
        console.error('Error fetching tasks', error);
      }

    }
    if (!fetched.current) {
      fetchTaskDetail();
    }
  }, [params.id]);
  // useEffect depends on the params.id


  if (!task) return null;




  return (
    <div>
      <div className="flex flex-col p-3 gap-2">
        <div className="space-x-2">
          <span className="text-[#2e3192]">Title:</span>
          <span className="uppercase">{task.title}</span>
        </div>
        <div className='flex items-center '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className='ml-1 mr-1'>{task.time} {task.time > 1 ? 'hrs' : 'hr'}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-5 p-2 border-t">
       <TaskForm task = {task} setTask={setTask}/>
      </div>
    </div>
  );
}
