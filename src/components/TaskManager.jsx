import React, { useEffect, useRef, useState } from 'react'
import useTask, { TaskProvider } from '../context/TaskContext'

function Taskmanager() {
  const[task,setTask]=useState("")
  const{tasks,setTasks}=useTask()
  const [showInput, setshowInput] = useState(false)
  const order=localStorage.getItem("sortOrder")
  const handleBtn=()=>{
    setshowInput(true)
  }
  const saveInput=()=>{
    if(!task.trim()){  
    alert("enter task")
    setTask("")
    return}
    setTasks(prev=>[...prev,{text:task,completed:false}])
    setTask("")
    setshowInput(false)
  }
  const taskStatus=(index)=>{
    setTasks(tasks.map((task,i)=>(
      i===(tasks.length-1-index)
      ?{...task,completed:!task.completed}:task
    )))}
  
  useEffect(()=>{
    localStorage.setItem("Tasks",JSON.stringify(tasks))
  },[tasks])

  const displayTasks= order==="Latest First"?[...tasks].reverse():tasks

  return (
    
    <div className='flex flex-col bg-emerald-200 m-10 p-2.5  gap-3'>
    <h1 className='font-bold text-3xl'>Tasks</h1>
    {(showInput)&&(
    <div className='flex gap-3'>
    <input
      className='border-black bg-white p-1 text-lg'
      value={task}
      onChange={(e)=> setTask(e.target.value)}
      autoFocus
    />
    <button
    className='border-2 border-black rounded-xl bg-white px-3 py-1.5 cursor-pointer'
     onClick={saveInput}>Save</button>
    </div>
  )}
    <div id='taskContainer' className='flex flex-col gap-1' >
    {displayTasks.map((value,index)=>(
    
      <div className={`flex justify-between bg-amber-400 rounded-lg px-3 py-2 text-xl ${value.completed?"line-through":""}`} key={index} id={index}>
        {value.text}
        <input type='checkbox' checked={value.completed} id={index} onChange={()=>taskStatus(index)}></input>
      </div>
      
   
      )
    )}
    </div>
    <button type='button' onClick={handleBtn} className='font-bold text-3xl rounded-full h-12 w-12 self-end bg-white cursor-pointer'id='button'>+</button>
    </div>
   
  )

}
export default Taskmanager