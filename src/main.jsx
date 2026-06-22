import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Dashboard from './components/Dashboard.jsx'
import Taskmanager from './components/Taskmanager.jsx'
import Settings from './components/Settings.jsx'
import Notes from './components/Notes.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { NoteProvider } from './context/NoteContext.jsx'
import { useState } from 'react'
import { UserProvider } from './context/UserContext.jsx'

function TaskWrapper(){
  const [tasks,setTasks]=useState(()=>{
    const load=localStorage.getItem("Tasks")
    return load ? JSON.parse(load):[]
  })
  const [notes, setnotes] = useState(() => {
  const saved = localStorage.getItem("Notes");
  return saved ? JSON.parse(saved) : [];
});
  const[user,setUser]=useState(()=>{
    const name=localStorage.getItem("name")
    return name ? JSON.parse(name):"";
  })
  const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='' element={<Dashboard />} />
      <Route path='taskmanager' element={<Taskmanager />} />
      <Route path='notes' element={<Notes />} />
      <Route path='settings' element={<Settings />} />
    </Route>,
  )
)
return(
  <TaskProvider value={{tasks,setTasks}}>
  <NoteProvider value={{ notes, setnotes }}>
  <UserProvider value={{user,setUser}}>
  <RouterProvider router={router}/>
  </UserProvider>
    
  </NoteProvider>  
  </TaskProvider>
)

};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskWrapper />
  </StrictMode>,
)
