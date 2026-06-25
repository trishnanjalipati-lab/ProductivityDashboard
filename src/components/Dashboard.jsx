import React from 'react'
import useTask, { TaskProvider } from '../context/TaskContext'
import Notes from './Notes'
import useNote from '../context/NoteContext'
import useUser from '../context/UserContext'
function Dashboard() {
  const{tasks}=useTask()
  const {notes}=useNote()
  const {user}=useUser()
  
  const dueTasksList=tasks.filter((task)=>(!task.completed))
  const completed=tasks.filter((task)=>(task.completed)).length
  const dueTasks=tasks.length-completed
  
  return (
  <div className='flex flex-col gap-8 m-10  max-md:m-8 '> 
<h1 className='font-bold text-2xl break-all dark:text-white'>Welcome {user}, </h1>
<div className='flex flex-col gap-5 justify-center  px-16 max-md:px-1'>
  <div className='flex flex-col justify-center align-middle px-30 py-5 gap-10 bg-blue-200 shadow-[5px_5px_10px_#88737378] rounded-lg w-full dark:bg-[#1a1a1a] dark:text-white max-md:px-5'>
 <h1 className='font-bold'>Tasks due today: {tasks.length-completed}</h1>
 <h1 className='font-bold'>Completed Tasks:{completed}</h1>
 <h1 className='font-bold'>Notes Created:{notes.length}</h1>
<div><p className='font-bold'>Recent Tasks:</p>{!tasks.length?"EMPTY": tasks.map((tasks,index)=>(
  <div key={index}>{tasks.text}</div>
))} </div>
<div><p className='font-bold'> Recent Notes:</p> {!notes.length? "EMPTY":notes.map((note,index)=>(
  <div key={index}>
  <div className='font-bold'>{note.title}</div>
  <div >{note.note}</div>
  </div>
))}</div>

  </div>
  {(dueTasks>0) &&(<div className='flex flex-col justify-center align-middle px-30 py-5 bg-blue-200 shadow-[5px_5px_10px_#88737378] rounded-lg w-full dark:bg-[#1a1a1a] dark:text-white max-md:px-5'>
  <h1 className='font-bold'>Tasks due today: </h1>
  {dueTasksList.map((item,index)=>
  <div key={index}>{item.text}</div>)}
  </div>)}
</div>

</div> 

  )
}

export default Dashboard