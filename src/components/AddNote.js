import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();

        // Check if any of the fields are empty
        if (note.title.trim() === "" ) {
            props.showAlert("Title can't be empty", "danger");
            return;
        }
        if (note.description.trim() === "" ) {
            props.showAlert("Description can't be empty", "danger");
            return;
        }
        

        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container text-light">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label font-weight" >Title</label>
                    <input type="text" className="dark-wide-border form-control text-light" style={{backgroundColor:'#0000'}} id="title" name="title" aria-describedby="emailHelp" 
                           value={note.title}  onChange={onChange}
                           minLength={5} required/> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label font-weight">Description</label>
                    <textarea className="dark-wide-border form-control text-light" rows="5"
                              style={{backgroundColor:'#0000'}}
                              id="description" name="description" placeholder="Your notes"
                              minLength={5} required onChange={onChange} value={note.description}></textarea>
                    {/* <input type="text" className="dark-wide-border form-control" id="description" name="description" 
                           value={note.description} minLength={5} required onChange={onChange} /> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label font-weight">Tag</label>
                    <input type="text" className="dark-wide-border form-control text-light" 
                           style={{backgroundColor:'#0000'}} id="tag" name="tag" value={note.tag} 
                           onChange={onChange}/>
                    <span className="custom-placeholder"><i>(Optional)</i></span>
                </div>
               
                <button className="custom-button"  
                        type="submit" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote