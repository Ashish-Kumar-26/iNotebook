import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

 
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const {notes, getNotes, editNote } = context;  //const {notes, getNotes, editNote } = context; 
  useEffect(() => {
    if(localStorage.getItem('token')){
        getNotes()
    }
    else{
        navigate('/login',{replace: true})
    }
    // eslint-disable-next-line
},[])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})

  const updateNote = (currentNote) =>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description, etag:currentNote.tag})   
  }
    const handleClick = (e) =>{
        // console.log("Updating the note...", note)

         // Check if any of the fields are empty
        if (note.etitle.trim() === "" ) {
            props.showAlert("Title can't be empty", "danger");
            return;
        }
        if (note.edescription.trim() === "" ) {
            props.showAlert("Description can't be empty", "danger");
            return;
        }

        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
        
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" 
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{backgroundColor:'#202326', color:'#fff'}}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body ">
                    <form className='my-3 '>
                        <div className="mb-3">
                            <label htmlFor="title" className=" font-weight form-label">Title</label>
                            <input type="text" className="dark-wide-border form-control text-light"
                                   style={{backgroundColor:'#202326'}} id="etitle" name='etitle' value={note.etitle}
                                aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className=" font-weight form-label">Description</label>
                            <textarea className="dark-wide-border form-control text-light" rows="5" 
                                style={{backgroundColor:'#202326'}}
                                id="edescription" name="edescription" placeholder="Your notes"
                                minLength={5} required onChange={onChange} value={note.edescription}></textarea>
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="font-weight form-label">Tag</label>
                            <input type="text" className="dark-wide-border form-control text-light" id="etag"
                                style={{backgroundColor:'#202326'}} 
                                value={note.etag} name='etag' onChange={onChange}/>
                            <span className="custom-placeholder"><i>(Optional)</i></span>
                        </div>
                        
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn custom-button" data-bs-dismiss="modal">Close</button>
                    <button className="btn btn-primary custom-button" 
                            onClick={handleClick} type="button">Update Note</button>
                </div>
                </div>
            </div>
        </div>
        {/* disable = (notes.length === 0)?true:false */}
        <div className='container row'>
            <div className='d-flex' style={{color:'#fff'}}>
                <h2 style={{color:'#fff'}}>Your Notes</h2>   
                <ScrollLink className='mx-3' to="section1" smooth>
                    <div style={{ display: "inline-block", cursor: "pointer" }}>
                        <img src="Animation.gif" style={{ width: "40px", height: "40px", pointerEvents: "none" }} alt="GIF" />
                        <button className='mx-2 custom-button'>Add a note</button>
                    </div>
                </ScrollLink>      
            </div>
            <div className='container text-light'>
               {notes.length === 0 && "You haven't any notes to display. Make a new one."}
            </div>
            {notes.map((note) =>{
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
            })}
        </div>
        <section id="section1">
            <div className='container'>
            <AddNote showAlert={props.showAlert}/>
            </div>
        </section>

    </>
    
  )
}

export default Notes
