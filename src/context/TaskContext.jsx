import React, { useContext } from "react";
import { createContext } from "react";

export const TaskContext=createContext({
    tasks:[{
        text:"",
        completed:false
    }],
    setTasks:(e)=>{tasks.text=e.target.value}
})
export const TaskProvider= TaskContext.Provider
export default function useTask(){
    return useContext(TaskContext)
}