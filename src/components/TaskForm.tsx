import { FormEvent } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Task } from "../types/task";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const notify = () => toast('task updated!', {
  style: {
    border: '1px solid #2e3192',
    padding: '16px',
    color: '#2e3192',
  }
});

const notifyNew = () => toast('new task added!', {
  style: {
    border: '1px solid #2e3192',
    padding: '16px',
    color: '#2e3192',
  },
  icon:  '👏',
});

type Props = {
  task?: Task;
  setTask?: (task:Task) => void;
}

export default function TaskForm({task, setTask}: Props) {
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    //if task? update else we will add a new task and go to that endpoint
    const url = task ? `${apiUrl}/tasks/${task.id}` : `${apiUrl}/tasks`;
    const method = task ? 'PUT' : 'POST';

    try {
      const resp = await fetch(url, {
        method,
        body: JSON.stringify({ title: formData.get('title'), time: formData.get('time') })
      });

      if (!resp.ok) throw new Error(`Request failed: ${resp.statusText}`);

      const data = await resp.json();

      if (task && setTask) {
        setTask(data);
        notify();
      }else {
        navigate(`/tasks/${data.id}`);
        notifyNew();
      }


    } catch (error) {
      console.error(error);
    }


  };



  return (
    <div className="mt-3">
      <form onSubmit={onSubmit}>
    <label className='text-2xl text-[#2e3192]'>
      {task ? 'Update Task' : 'Add new Task'}
    </label>
    <div className="flex flex-col gap-3 mt-2">
      <input
        placeholder='title'
        name="title"
        className='border border-[#2e3192] rounded-lg p-1'
        defaultValue={task?.title || ''}
      />
      <input
        placeholder='time commitment'
        name="time"
        className='border border-[#2e3192] rounded-lg p-1'
        defaultValue={task?.time || ''}
      />
      <button type="submit" className="btn">
        {task ? 'Update Task' : 'Add new Task'}
      </button>
      <Toaster position="bottom-center"
              reverseOrder={false} />
    </div>
  </form>
  </div>
  )
}