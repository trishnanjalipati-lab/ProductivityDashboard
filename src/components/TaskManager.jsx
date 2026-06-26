import React, { useEffect, useRef, useState } from 'react'
import useTask, { TaskProvider } from '../context/TaskContext'
import deleteicon from "../assets/image.png"
import editicon from "../assets/edit.png"

function Taskmanager() {
  const[task,setTask]=useState("")
  const{tasks,setTasks}=useTask()
  const [showInput, setshowInput] = useState(false)
  const [editTask, seteditTask] = useState("")
  const [editTaskid, seteditTaskid] = useState(null)
  const [search,setsearch]=useState("")
  const[sort,setsort]=useState(()=>{return localStorage.getItem("taskorder") || "Latest First"})
  const displayTasks= sort==="Latest First"?[...tasks].reverse():tasks
  const handleBtn=()=>{
    setshowInput(true)
}
  const saveInput=()=>{
    if(!task.trim()){  
    alert("enter task")
    setTask("")
    return}
    setTasks(prev=>[...prev,{id: Date.now(),text:task,completed:false}])
    setTask("")
    setshowInput(false)
  }
  const taskStatus=(id)=>{
    setTasks(tasks.map((task,i)=>(
      id===task.id ? {...task,completed:!task.completed}:task
    )))}
  
  useEffect(()=>{
    localStorage.setItem("Tasks",JSON.stringify(tasks))
  },[tasks])

  const updateTask=()=>{
    setTasks(tasks.map((task)=>(
      editTaskid===task.id?{...task,text:editTask}:task
    )))
  }
  const deleteTask=(id)=>{
    setTasks(tasks.filter(task=>id!==task.id))
  }
  const searchedTasks=displayTasks.filter((task)=>
    task.text.toLowerCase().includes(search.trim().toLowerCase())
  )
  return (
    <div>
    <div className='flex justify-between m-10 gap-2 max-md:flex-col max-md:m-3'>
    <input type='search' 
    placeholder='search' 
    value={search}
    className='bg-white text-black min-w-0 gap-1 p-1 rounded-sm border-2 border-black' 
    onChange={(e)=>setsearch(e.target.value)}
    />
    <div className='flex dark:bg-white text-black gap-1 p-1 rounded-sm border-2 border-black'>
    <p>Sort by:</p>
    <select className='cursor-pointer outline-0' value={sort} onChange={(e)=>
    {setsort(e.target.value)
    localStorage.setItem("taskorder",e.target.value)}}>
      <option>Latest First</option>
      <option>Oldest First</option>
    </select>
    </div>
    </div>

    <div className='flex flex-col bg-[#126842] shadow-[5px_5px_10px_#7a6969bd] text-white m-10 p-2.5 overflow-x-hidden rounded-lg gap-3 dark:bg-[#1a1a1a]'>
    <h1 className='font-bold text-3xl'>Tasks</h1>
    {(showInput)&&(
    <div className='flex gap-3'>
    <form onSubmit={saveInput}>
    <input
      className='border-black bg-white p-1 text-black text-lg'
      value={task}
      onChange={(e)=> setTask(e.target.value)}
      autoFocus
    />
    <button
    className='border-2 border-black rounded-xl bg-white text-black px-3 py-1.5 cursor-pointer'
     type='submit'>Save</button>
     </form>
    </div>
  )}
    <div id='taskContainer' className='flex flex-col gap-1' >
    {searchedTasks.map((value,index)=>{
    if (editTaskid===value.id){
      return ( 
      <form className='flex gap-4 w-full max-md:flex-col max-md:gap-1' onSubmit={updateTask}>
      <input 
      className='bg-white text-black p-3 rounded-lg '
      value={editTask}
      onChange={(e)=>seteditTask(e.target.value)}
      autoFocus
      ></input>
      <button
    className='border-2 border-black rounded-xl bg-white text-black px-3 py-1.5 cursor-pointer'
     type='submit'>Save</button>
      </form>)
    }
    else
      {return <div className={` group flex justify-between bg-white text-black rounded-lg px-3 py-2 text-xl break-all items-center gap-1  ${value.completed?"line-through":""}`} key={index} >
        <p className='flex-4'>{value.text}</p>
        <div className='flex-3 text-end'>
        <input type='checkbox' checked={value.completed} id={index} onChange={()=>taskStatus(value.id)}></input>
        <button className='m-3 cursor-pointer' onClick={()=>{setshowInput(false); seteditTaskid(value.id); seteditTask(value.text);}}><img src={editicon} width={24}/></button>
        <button className='md:hidden md:group-hover:inline cursor-pointer ' onClick={()=>deleteTask(value.id)}><img width={20} src={deleteicon} /></button>
        </div>
      </div>}
    }
    )}
    </div>
    <button type='button' onClick={handleBtn} className='font-bold text-3xl rounded-full h-12 w-12 self-end bg-white text-black cursor-pointer'id='button'>+</button>
    </div>
    </div>
   
  )

}
export default Taskmanager