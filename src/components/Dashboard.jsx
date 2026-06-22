import React from 'react'
import useTask, { TaskProvider } from '../context/TaskContext'
import Notes from './Notes'
import useNote from '../context/NoteContext'
import useUser from '../context/UserContext'
function Dashboard() {
  const{tasks}=useTask()
  const {notes}=useNote()
  const {user}=useUser()
  const completed=tasks.filter((task)=>(task.completed)).length
  
  return (
  <div className='flex flex-col gap-8 m-10'> 
<h1 className='font-bold text-2xl'>Welcome {user}, </h1>
<div className='flex justify-center  px-16'>
  <div className='flex flex-col justify-center align-middle px-30 py-5 gap-10 bg-blue-200 w-full'>
 <h1 className='font-bold'>Tasks due today: {tasks.length-completed}</h1>
 <h1 className='font-bold'>Completed Tasks:{completed}</h1>
 <h1 className='font-bold'>Notes Created:{notes.length}</h1>
<div><p className='font-bold'>Recent Tasks:</p>{tasks.map((tasks,index)=>(
  <div key={index}>{tasks.text}</div>
))} </div>
<div><p className='font-bold'> Recent Notes:</p> {notes.map((note,index)=>(
  <div key={index}>
  <div className='font-bold'>{note.title}</div>
  <div >{note.note}</div>
  </div>
))}</div>

  </div>
</div>

</div> 

  )
}

export default Dashboard