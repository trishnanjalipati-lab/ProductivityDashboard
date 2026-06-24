import React, { useEffect, useRef, useState } from 'react'
import useTask, { TaskProvider } from '../context/TaskContext'

function Taskmanager() {
  const[task,setTask]=useState("")
  const{tasks,setTasks}=useTask()
  const [showInput, setshowInput] = useState(false)
  const [editTask, seteditTask] = useState("")
  const [editTaskid, seteditTaskid] = useState(null)
  const order=localStorage.getItem("sortOrder")
  const displayTasks= order==="Latest First"?[...tasks].reverse():tasks
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
  return (
    
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
    {displayTasks.map((value,index)=>{
    if (editTaskid===value.id){
      return ( <form className='flex gap-4' onSubmit={updateTask}>
      <input 
      className='bg-white text-black p-3 rounded-lg'
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
      {return <div className={` group flex justify-between bg-white text-black rounded-lg px-3 py-2 text-xl break-all items-center  ${value.completed?"line-through":""}`} key={index} >
        {value.text}
        <div >
        <input type='checkbox' checked={value.completed} id={index} onChange={()=>taskStatus(value.id)}></input>
        <button className='m-3 cursor-pointer' onClick={()=>{setshowInput(false); seteditTaskid(value.id); seteditTask(value.text);}}><img src='src\assets\edit.png' width={24}/></button>
        <button className='hidden group-hover:inline cursor-pointer' onClick={()=>deleteTask(value.id)}><img width={20} src='src\assets\image.png' /></button>
        </div>
      </div>}
    }
    )}
    </div>
    <button type='button' onClick={handleBtn} className='font-bold text-3xl rounded-full h-12 w-12 self-end bg-white text-black cursor-pointer'id='button'>+</button>
    </div>
   
  )

}
export default Taskmanager