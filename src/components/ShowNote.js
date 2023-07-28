import React, { useContext } from 'react'
import Footer from "./Footer"
import noteContext from '../context/notes/noteContext';

const ShowNote = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;
  return (
    <div>
       <div className="card my-3 dark-wide-border text-light" style={{backgroundColor:'#343a40'}}>
            <div className="card-body">
                <div className='d-flex  justify-content-between'>
                    <h4 className="card-title" style={{color:'#97FEED'}}>{note.title}</h4>
                    <div className='d-flex'>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully","success")}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>           
                <p className="card-text">{note.description}</p>
            </div>
        </div>  
        <Footer/>
    </div>
  )
}

export default ShowNote
