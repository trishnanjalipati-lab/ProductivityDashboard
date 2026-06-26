import React, { useEffect, useRef, useState } from 'react'
import useUser from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import usetheme from '../context/Themecontext'

function Settings() {
  const{user,setUser}=useUser()
  const userref=useRef(null)
  const selectref=useRef(null)
  const {mode,lightmode,darkmode}=usetheme()
  const navigate=useNavigate()
  const[sortTask,setsortTask]=useState(()=>{return localStorage.getItem("taskorder")||"Latest First"})
  const [sortNotes,setsortNotes]=useState(()=>{return localStorage.getItem("noteorder")||"Latest First"})
  
  useEffect(()=>{
    function handleClick(event){
      if(userref.current && !userref.current.contains(event.target))
        (localStorage.setItem("name",JSON.stringify(user)))
    }
    document.addEventListener("mousedown",handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
  }
  },[])

  const changemode=()=>{
    if (mode==="dark")
      {lightmode(); 
      localStorage.setItem("mode", "light");
      return}
     {darkmode()}
      localStorage.setItem("mode","dark")
  }

  const logout=()=>{
    localStorage.removeItem("name")
    navigate("/")
    setUser("")
  }

  return (
    <div className='bg-[#C9C3BD] shadow-[5px_5px_10px_#7a6969bd] rounded-lg flex flex-col m-10 p-2.5 gap-3 dark:bg-[#1a1a1a] dark:text-white '>
    <h1 className='font-bold text-3xl'>Settings</h1>
     <div>
     <form className='flex gap-1 items-center w-full'
     onSubmit={(e) => {
    
    localStorage.setItem("name", JSON.stringify(user));
  }}>
     <span >Name:</span>
     
     <input 
      className=' p-0.5 flex-1 min-w-0'
      value={user}
      ref={userref}
      onChange={(e)=>setUser(e.target.value)}
     
     ></input>
     </form>
     </div>
     <div>
     <span>Sort tasks:</span>
     <select 
     className='mx-1 p-0.5 cursor-pointer dark:bg-[#1a1a1a]' 
     ref={selectref}
     value={sortTask}
     onChange={(e) =>
     {setsortTask(e.target.value) 
     localStorage.setItem("taskorder",e.target.value)}}>
     <option>Latest First</option>
     <option>Oldest First</option>
     </select>
     </div>
     <div>
     <span>Sort notes:</span>
     <select 
     className='mx-1 p-0.5 cursor-pointer dark:bg-[#1a1a1a]' 
     ref={selectref}
     value={sortNotes}
     onChange={(e) =>
     {setsortNotes(e.target.value) 
     localStorage.setItem("noteorder",e.target.value)}}>
     <option>Latest First</option>
     <option>Oldest First</option>
     </select>
     </div>
     <div className='flex w-28 justify-between'>
     <span>Theme:</span>
      <label className="relative cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={changemode}
                checked={mode==='dark'}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            
        </label>
     </div>
      <button className='bg-white p-1 rounded-md my-2 cursor-pointer dark:text-black' onClick={logout}>Logout</button>
    </div>
  )
}

export default Settings