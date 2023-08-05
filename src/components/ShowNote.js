import React, { useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { Link,} from 'react-router-dom';

const ShowNote = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote, note, showNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const [title, setTitle] = useState(note ? note.title : '');
  const [desc, setDesc] = useState(note ? note.description : '');
  const [tag, setTag] = useState(note ? note.tag : '');

  const updateNote = (currentNote) =>{
      ref.current.click();
       setTitle(currentNote.title);
       setDesc(currentNote.description);
       setTag(currentNote.tag);
       //   setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description, etag:currentNote.tag})
  }
    const handleClick = async(e) =>{
        // console.log("Updating the note...", note)

         // Check if any of the fields are empty
        if (title.trim() === "" ) {
            props.showAlert("Title can't be empty", "danger");
            return;
        }
        if (desc.trim() === "" ) {
            props.showAlert("Description can't be empty", "danger");
            return;
        }

        await editNote(note._id, title, desc, tag)
        refClose.current.click();
        // setNote(notee);
        showNote(note._id);
        props.showAlert("Updated Successfully","success");
        
    }

  return (
    <div style={{marginTop:'rem'}}> 
       
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
                                   style={{backgroundColor:'#202326'}} id="title" name='title' value={title}
                                aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className=" font-weight form-label">Description</label>
                            <textarea className="dark-wide-border form-control text-light" rows="5" 
                                style={{backgroundColor:'#202326'}}
                                id="description" name="description" placeholder="Your notes"
                                minLength={5} required onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="font-weight form-label">Tag</label>
                            <input type="text" className="dark-wide-border form-control text-light" id="tag"
                                style={{backgroundColor:'#202326'}} 
                                value={tag} name='tag' onChange={(e) => setTag(e.target.value)}/>
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

        <div className='d-flex align-items-center justify-content-center card-custom-min-height' style={{ marginTop:'3rem'}}>
            <div style={{ position: 'absolute', top: '0', left: '0', margin: '7rem' }}>
                <Link to="/main">
                  <i className="fa-solid fa-arrow-left-long fa-2x" style={{ color: '#cacfd8' }}></i>
                </Link>
            </div>
            {/* <div className='card-custom-min-height'> */}
                <div className="card dark-wide-border text-light " style={{ backgroundColor: '#343a40', width: '80%' }}>
                    <div className="card-body">
                    <div className='d-flex'>
                        <h2 className="card-title" style={{ color: '#97FEED' }}>{note?.title}</h2>
                        <div className='d-flex'>
                        </div>
                    </div>
                    <p className="card-text" style={{fontSize: '18px', textAlign: 'justify'}}>{note?.description}</p>
                        <Link className="custom-button" to="/main" title='delete note' role='button'>
                            <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i>
                        </Link>
                        <Link className='custom-button mx-3' title='update note'>
                        <i className="fa-regular fa-pen-to-square" role='button' onClick={() => { updateNote(note) }}></i>
                        </Link>
                    </div>
                </div>
            {/* </div> */}
            
        </div>
    </div>
  );
};

export default ShowNote;
