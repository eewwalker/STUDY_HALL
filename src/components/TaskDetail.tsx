import { ChangeEvent } from "react";
import { Task } from "../types/task";

type Props={
  task?: Task;
  titleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskDetail({task, titleChange}:Props) {
  if (!task) return null;
  return (
    <div>
         <>
      <h2 className='text-3xl text-[#ec1831] mb-2 p-1'>Details</h2>
      <div>
        <span className='text-[#ec1831]'>ID: </span>{task.id}
      </div>
      <div className="space-x-2">
        <span className="text-[#ec1831]">Title:</span>
        <span className="uppercase">{task.title}</span>
      </div>
      <div>
        <div className='flex'>
          <span className='text-[#ec1831]'>Time Commitment:</span>
          <span className='ml-1 mr-1'>{task.time}</span>
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
          value={task.title}
          onChange={titleChange}
        />
           </div>
        </>
    </div>
  )
}
