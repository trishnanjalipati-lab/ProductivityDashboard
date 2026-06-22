import React, { useContext } from "react";
import { createContext } from "react";

export const NoteContext=createContext({
    notes:[{
        title:"",
        note:""
    }],
    setnotes:()=>{}
})
export const NoteProvider= NoteContext.Provider
export default function useNote(){
    return useContext(NoteContext)
}