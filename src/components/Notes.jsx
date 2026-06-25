import React, { useEffect, useRef } from 'react'
import deleteicon from "../assets/image.png"
import { useState } from 'react'
import useNote from '../context/NoteContext'
function Notes() {
  const [title,settitle]=useState("")
  const [note, setnote] = useState("")
  const { notes, setnotes } = useNote()
  const [showNote,setshowNote]=useState(false) 
  const noteref=useRef(null)
  const order=localStorage.getItem("sortOrder")
  const handleBtn=()=>{
    setshowNote(true)
    }
 

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
  function handleClick(event) {
  
    if (
      showNote&&
      noteref.current &&
      !noteref.current.contains(event.target)
    ) {saveNote()}
  }
  
  document.addEventListener("mousedown", handleClick)
  const saveNote = () => {
  if (title.trim() || note.trim()) {
    setnotes(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        note,
      },
    ]);
  }

  settitle("");
  setnote("");
  setshowNote(false);}
  const handleEnter=(e)=>{
    if(e.code==="Enter"){saveNote()}
  }
  document.addEventListener("keydown",handleEnter)
  return () => {
    document.removeEventListener("mousedown", handleClick)
    document.removeEventListener("keydown",handleEnter)
  }
}, [showNote,title, note])

  const changeTitle=(id,value)=>{
    setnotes(notes.map((item)=>
      item.id === id
        ? { ...item, title: value }
        : item
    ))
  }
  const changeNote=(id,value)=>{
    setnotes(notes.map((item)=>
      item.id === id
        ? { ...item, note: value }
        : item
    ))
  }
  const displayedNotes= order === "Latest First" ? [...notes].reverse(): notes;
  const deleteNote=(id)=>{
    setnotes(notes.filter((notes)=>id!==notes.id))
  }

  return (
    <div className='flex flex-col bg-[#CFB177] shadow-[7px_7px_10px_#7a6969bd] rounded-lg m-10 p-2.5 gap-3 dark:bg-[#1a1a1a] dark:text-white '>
    <h1 className='font-bold text-3xl'>Notes</h1>
    {(showNote)&& (
      <div >
    <div className='flex flex-col bg-white border-2 border-black p-1 rounded-lg dark:text-black' ref={noteref}>
      <textarea placeholder='title' className='text-xl p-1 font-bold  focus:outline-none h-9' value={title} onChange={(e)=>settitle(e.target.value)} autoFocus></textarea>
      <textarea placeholder='note' className='p-1 focus:outline-none' value={note} onChange={(e)=>setnote(e.target.value)} ></textarea>
    </div>
    </div>
    )}

    {displayedNotes.map((item) => (
       <div key={item.id}  className="group flex flex-col bg-white border-2 border-black p-1 rounded-lg dark:text-black " > 
       <div className='flex justify-between'>
       <textarea
        value={item.title}
        placeholder='title'
        onChange={(e)=>changeTitle(item.id,e.target.value)}
        className="text-xl p-1 font-bold focus:outline-none h-9 flex-1 resize-none "
      />
      <button className='md:opacity-0 md:group-hover:opacity-100 md:transition-opacity cursor-pointer' onClick={()=>deleteNote(item.id)}><img width={20} src={deleteicon} /></button>
      </div>
      <textarea
        value={item.note}
        placeholder='note'
        onChange={(e)=>changeNote(item.id,e.target.value)}
        className="p-1 focus:outline-none flex-1 resize-none"
      /> 
       </div> ))}
    <button type='button' onClick={handleBtn} className='font-bold text-3xl rounded-full h-12 w-12 self-end bg-white cursor-pointer dark:text-black 'id='button'>+</button>
    </div>
  )
}
export default Notes