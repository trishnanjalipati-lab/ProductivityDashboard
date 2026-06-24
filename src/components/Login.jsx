import React, { useEffect } from 'react'
import useUser from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import usetheme from '../context/Themecontext'
import { ToggleTheme } from "../components/lightswind/toggle-theme";

function Login() {
    const{user,setUser}=useUser()
    const navigate=useNavigate()
    
    useEffect(()=>{
        user?navigate("/dashboard"):navigate("/")
    },[])
    const handleBtn=()=>{
        if(!user.trim()) 
        {alert("Please enter your name"); return};
        localStorage.setItem("name",JSON.stringify(user))
        navigate("/dashboard");
    }
    
  return (
  <div className='flex flex-col h-full'>
    <div className='flex flex-col w-25 justify-between self-end my-1 mx-5'>
     <span className='self-center dark:text-white'>Theme</span>
      <ToggleTheme
  duration={600}
  animationType="swipe-right"
  className="bg-gray-100 dark:bg-gray-700"
/>
     </div>
    <div className='flex flex-col items-center m-25 gap-5'>
        
        <h1 className='font-serif font-extrabold text-4xl dark:text-white'>Productivity Dashboard </h1>
        <form onSubmit={handleBtn}>
        <div className='bg-amber-200 flex flex-col items-center rounded-md p-1.5 gap-5 shadow-[5px_5px_10px_#7a6969bd] dark:bg-[#1a1a1a] dark:text-white'>
            <h1 className='text-2xl font-semibold'>Welcome!!</h1>
            <label className='text-lg'>Enter your name</label>
            <input 
            className='bg-white p-2 dark:text-black '
            onChange={(e)=>setUser(e.target.value)}
            autoFocus
            required >
            </input>
            <button className='cursor-pointer bg-white p-1 rounded-lg dark:text-black' type='submit'>Continue</button>
          </div>
        </form>
    </div>
    </div>
  )
}

export default Login