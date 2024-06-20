import { NavLink, Outlet } from 'react-router-dom';
import './App.css';
import Notes from './components/Notes';

//added end to NavLink- will only be highlighted when at /tasks not /tasks/23 etc..
export default function App() {
  return (
    <>
    <nav className='bg-[#e1bf42] p-1 mt-2'>
      <ul className='flex justify-center gap-20 my-3 text-3xl text-[#2e3192] font-semibold uppercase'>
        <li>
          <NavLink to='/tasks' end>Study Hall</NavLink>
        </li>
      </ul>
    </nav>
    <div className='mt-7 p-7 container mx-auto flex justify-between gap-6 text-[#19b5ff] bg-[#d4dffb] text-3xl'>
      <div className='flex-1'>
        {/* renders child routes */}
        <Outlet />
      </div>
      <div className='flex-1'>
       <Notes/>
      </div>
    </div>
    </>

  );
}
