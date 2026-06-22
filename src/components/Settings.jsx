import React, { useEffect, useRef, useState } from 'react'
import useUser from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'

function Settings() {
  const{user,setUser}=useUser()
  const userref=useRef(null)
  const selectref=useRef(null)
  const navigate=useNavigate()
  const [sort,setsort]=useState(localStorage.getItem("sortOrder")||"Latest First")
  
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

  const logout=()=>{
    localStorage.removeItem("name")
    navigate("/")
    setUser("")
  }

  return (
    <div className='bg-gray-300 flex flex-col m-10 p-2.5  gap-3'>
    <h1 className='font-bold text-3xl'>Settings</h1>
     <div>
     <form onSubmit={(e)=>setUser(e.target.value)}>
     <span>Name:</span>
     
     <input 
      className='mx-1 p-0.5'
      value={user}
      ref={userref}
      onChange={(e)=>setUser(e.target.value)}
      required
     ></input>
     </form>
     </div>
     <div>
     <span>Sort:</span>
     <select 
     className='mx-1 p-0.5 cursor-pointer' 
     ref={selectref}
     value={sort}
     onChange={(e) =>
     {setsort(e.target.value) 
     localStorage.setItem("sortOrder",e.target.value)}}>
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
               
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            
        </label>
     </div>
      <button className='bg-white p-1 rounded-md my-2 cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Settings