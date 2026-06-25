import React from 'react'
import { Link, NavLink } from 'react-router-dom'
function Header() {
  return (
    <header className='flex items-center bg-[#F48B9A] text-black p-3 w-full h-16 dark:bg-[#1d1f1f] dark:text-white dark:shadow-2xl gap-4
    '>
    <NavLink to="/dashboard">
    <img src='https://i.pinimg.com/736x/d6/f1/8d/d6f18dcdfc48ef9c283fa8e68a5c7a9e.jpg' alt='logo' width={40} />
    </NavLink>
    <ul className='flex justify-center gap-15 mx-auto text-lg text-center max-md:gap-4 max-md:text-sm'>
    <li>
    <NavLink to="/dashboard"
    className={({isActive})=>`${isActive? "text-blue-500" :"" } cursor-pointer`}>
      Dashboard
    </NavLink> 
    </li>
    <li>
    <NavLink to="/taskmanager"
    className={({isActive})=>`${isActive? "text-blue-500" :"" } cursor-pointer`}>
      Task Manager
    </NavLink>    
    </li>
    <li>
    <NavLink to="/notes"
    className={({isActive})=>`${isActive? "text-blue-500" :"" } cursor-pointer`}>
      Notes
    </NavLink>
    </li>
    <li>
    <NavLink to="/settings"
    className={({isActive})=>`${isActive? "text-blue-500" :"" } cursor-pointer`}>
      Settings
    </NavLink>
    </li>
    </ul>
   </header>
  )
}

export default Header