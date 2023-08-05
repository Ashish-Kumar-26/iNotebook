const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET //hard coded ..should be environment variable

//ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login required. Does't require Auth
router.post('/createuser', [
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5})
],async(req,res)=>{
    let success = false;
    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({success, errors: result.array() });
    }

    try{
        //check whether the user with this email exists already 
 
        let user = await User.findOne({email: req.body.email}); 

        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        
        // .then(user => res.json(user))
        //   .catch((err)=> {
        //     console.log(err)
        //     res.json({error:'Please enter a unique value for email',message: err.message})

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        success = true;
        res.json({success, authtoken})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
    });
    // res.send(req.body);

    //ROUTE 2 : Authenticate a user using: POST "/api/auth/login". No login required
    router.post('/login', [
        body('email','Enter a valid email').isEmail(),
        body('password','Password cannot be blank').exists(),
    ],async(req,res)=>{
        let success = false;
        //If there are errors, return bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({success, errors: result.array() });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error:"Please try to login with correct credentials"});
            }

            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({success, error:"Please try to login with correct credentials"});
            }

            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);  
            success = true;
            res.json({success, authtoken})

        } catch(error){
            console.error(error.message)
            res.status(500).send("Internal server error");
        }

    })

    //ROUTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". Login required

    router.post('/getuser',fetchuser,async(req,res)=>{
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch(error){
            console.error(error.message)
            res.status(500).send("Internal server error");
        }
    })

    // Define the route for updating a user
router.put('/updateuser/:id', fetchuser,[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail()
    ], async (req, res) => {

        let success = false;
        //If there are errors, return bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({success, errors: result.array() });
        }
    
    try {
      // Extract the user ID from the URL parameter
      const userId = req.params.id;
      const authenticatedUserId = req.user.id;
  
      // Find the user to be updated
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send("User Not Found");
      }
  
      if (user._id.toString() !== authenticatedUserId) {
        return res.status(401).send("Not Allowed");
      }
  
      // Extract updated user data from the request body
      const { name, email} = req.body;
  
      // Update the user object with the provided data
      if (name) user.name = name;
      if (email) user.email = email;
      
  
      // Save the updated user
      const updatedUser = await user.save();
  
      // Remove the password field from the response
  
      res.json({ updatedUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;