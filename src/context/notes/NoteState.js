import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
    const host = 'https://inotebook-mern-app.onrender.com';  //"http://localhost:5000" //https://inotebook-mern-app.onrender.com
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [note, setNote] = useState(notesInitial);
    const [user, setUser] = useState(notesInitial);

    //get user details...
    const userDetails = async() =>{
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json",
            },
        });
        
        const user = await response.json();
        setUser(user);
  
    } catch (error) {
        // Handle error
      console.error('Error fetching user details:', error);
    }
    }

    const editUser = async (id, name, email) => {
      // API call
      const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ name, email })
      });
      const json = await response.json();
      console.log(json);
      
    };

     //Get a particular note
     const showNote = async (id) => {
      try {
        // API call
        const response = await fetch(`${host}/api/notes/shownote/${id}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
          },
        });
  
       const noteDetails = await response.json();
       setNote(noteDetails);
      } catch (error) {
        console.error("Error fetching note details:", error);
        return null;
      }
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
        const json = await response.json();

        setNotes(json.reverse())      
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
          { user, userDetails, editUser, note, showNote, notes, addNote, deleteNote, editNote, getNotes,}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;