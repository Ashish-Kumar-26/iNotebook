import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [note,setNote] = useState(null);
    // const [login_user,setLoginUser] = useState(null);

    //activating logged in user name
    // const activateLoggedinUsername = (name) =>{
    //     setLoginUser(name);
    // }


     //Get a particular note
     const showNote = async(id) =>{
      // API call
      
        const response = await fetch(`${host}/api/notes/shownote${id}`, {
            method: "GET", 
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()             
        setNote(json)
     }

      //Get all Notes
      const getNotes = async() =>{
       // API call
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            }
          });
        const json = await response.json()             
        setNotes(json)      
      }


      //Add a Note
      const addNote = async(title,description,tag) =>{
        //TODO: API call
        //API call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag})
        });

         const note = await response.json(); 
         setNotes([note].concat(notes));
         console.log("Adding a new note")
         
      }

      //Delete a Note
      const deleteNote = async(id) =>{
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json(); 
        console.log(json)

        const newNotes = notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes);
      }
      //Edit a Note
      const editNote = async(id, title, description, tag) =>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag})
        });
        const json = await response.json();
        console.log(json) 

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let i = 0; i < newNotes.length; i++) {
          const element = newNotes[i];
          if(element._id ===id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          } 
        }
        setNotes(newNotes);
      }

    return(
        <NoteContext.Provider value={
          { note, notes, addNote, deleteNote, editNote, getNotes, showNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;