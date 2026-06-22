import React, { useEffect } from 'react'
import useUser from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const{user,setUser}=useUser()
    const navigate=useNavigate()
    useEffect(()=>{
        user?navigate("/dashboard"):navigate("/")
    },[])
    const handleBtn=()=>{
        if(!user.trim()) {alert("Please enter your name");
        return};
        
        navigate("/dashboard");
    }
  return (
    <div className='flex flex-col items-center m-40 gap-5'>
        <h1 className='font-serif font-extrabold text-4xl'>Productivity Dashboard </h1>
        <form onSubmit={handleBtn}>
        <div className='bg-amber-200 flex flex-col items-center rounded-md p-1.5 gap-5'>
            <h1 className='text-2xl font-semibold'>Welcome!!</h1>
            
            <label className='text-lg'>Enter your name</label>
            <input 
            className='bg-white p-2'
            onChange={(e)=>setUser(e.target.value)}
            required >
            </input>
            <button className='cursor-pointer bg-white p-1 rounded-lg' type='submit'>Continue</button>
            
        </div></form>
    </div>
  )
}

export default Login