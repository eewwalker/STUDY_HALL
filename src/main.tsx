import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskList from './components/TasksList.tsx';
import TaskDetail from './components/TaskDetail.tsx';
import { NoteProvider } from './context/NoteContext.tsx';
import TaskForm from './components/TaskForm.tsx';

//create router config => [route objs{path: root, children: [{routes}{}..]}]
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      //when root is acessed/rendered navigate directly to dashboard
      {index: true, element: <Navigate replace to='/tasks'/>},
      {path: '/tasks', element: <TaskList/>},
      {path: '/tasks/:id', element: <TaskDetail />},
      {path: '/tasks/create', element: <TaskForm/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NoteProvider>
   <RouterProvider router = {router}/>
    </NoteProvider>
  </React.StrictMode>,
)
