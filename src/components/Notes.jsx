import React, { useEffect, useRef } from 'react'
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
  
  
  // useEffect(() => {
  //   const saved = localStorage.getItem("Notes");  
  //   if (saved) {
  //     setnotes(JSON.parse(saved));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
  function handleClick(event) {
  
    if (
      showNote&&
      noteref.current &&
      !noteref.current.contains(event.target)
    ) {
      if (title.trim() || note.trim()) {
          setnotes((prev)=>[...prev,
            {
              id: Date.now(),
              title,
              note,
            },
          ]);
        }

        settitle("");
        setnote("");
        setshowNote(false);
    }
  }
  document.addEventListener("mousedown", handleClick)
  
  return () => {
    document.removeEventListener("mousedown", handleClick)
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

  return (
    <div className='flex flex-col bg-amber-300 m-10 p-2.5  gap-3'>
    <h1 className='font-bold text-3xl'>Notes</h1>
    {(showNote)&& (
      <div >
    <div className='flex flex-col bg-white border-2 border-black p-1 rounded-lg'  ref={noteref}>
      <textarea placeholder='title' className='text-xl p-1 font-bold  focus:outline-none h-9' value={title} onChange={(e)=>settitle(e.target.value)}></textarea>
      <textarea placeholder='note' className='p-1 focus:outline-none' value={note} onChange={(e)=>setnote(e.target.value)} ></textarea>
    </div>
    </div>
    )}

    {displayedNotes.map((item) => (
       <div key={item.id}  className="flex flex-col bg-white border-2 border-black p-1 rounded-lg" > 
       <textarea
        value={item.title}
        onChange={(e)=>changeTitle(item.id,e.target.value)}
        className="text-xl p-1 font-bold focus:outline-none h-9"
      />
      <textarea
        value={item.note}
        onChange={(e)=>changeNote(item.id,e.target.value)}
        className="p-1 focus:outline-none"
      /> 
       </div> ))}
    <button type='button' onClick={handleBtn} className='font-bold text-3xl rounded-full h-12 w-12 self-end bg-white cursor-pointer'id='button'>+</button>
    </div>
  )
}
export default Notes