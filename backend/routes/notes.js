const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2 : Add a new Note using: POST "/api/notes/addnotes". Login required
router.post("/addnotes", fetchuser,[
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({ min: 5}),
  ], async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return bad request and the errors
      const result = validationResult(req);
      if (!result.isEmpty()) {
        // res.send({ errors: result.array() });
        return res.status(400).json({ result: result.array() });
      }

      const note = new Notes({
        title, description, tag, user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3 : Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title,description,tag} = req.body;
    try {
                
        //Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it 
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  })

//ROUTE 4 : Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
                
        //Find the note to be deleted and delete it 
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}

        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
  })


  //ROUTE 5 : Get particular Note using: GET "/api/notes/shownote". Login required
router.get("/shownote/:id", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.id);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
