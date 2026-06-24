import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Dashboard from './components/Dashboard.jsx'
import Taskmanager from './components/TaskManager.jsx'
import Settings from './components/Settings.jsx'
import Notes from './components/Notes.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { NoteProvider } from './context/NoteContext.jsx'
import { useState } from 'react'
import { UserProvider } from './context/UserContext.jsx'
import Login from './components/Login.jsx'
import { Themeprovider } from './context/Themecontext.jsx'

function TaskWrapper(){
  const [mode,setmode]=useState(()=>{
    const theme=localStorage.getItem("mode")
    return theme?(theme): "light"})
  const lightmode=()=>{
    setmode("light")
  }
  const darkmode=()=>{
    setmode("dark")
  }

  useEffect(()=>{
    document.querySelector("html").classList.remove("light","dark")
    document.querySelector("html").classList.add(mode)
  },[mode])

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
    <>
    <Route path='/' element={<Login />} />
    <Route element={<Root />}>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='taskmanager' element={<Taskmanager />} />
      <Route path='notes' element={<Notes />} />
      <Route path='settings' element={<Settings />} />
    </Route>,
    </>
  )
)
return(
  <Themeprovider value={{mode,lightmode,darkmode}} >
  <TaskProvider value={{tasks,setTasks}}>
  <NoteProvider value={{ notes, setnotes }}>
  <UserProvider value={{user,setUser}}>
  <RouterProvider router={router}/>
  </UserProvider>
    
  </NoteProvider>  
  </TaskProvider>
  </Themeprovider>
)

};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskWrapper />
  </StrictMode>,
)
