import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Footer from './Footer';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpasswaord:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        const {name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
             "Content-Type": "application/json",
            },
            // body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}) 
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            //save the auth token and redirect
            // localStorage.setItem('token', json.authtoken);
            navigate('/login', {replace: true});
            props.showAlert("Account Created Successfully","success")

        }
        else{
          props.showAlert("Invalid Details","danger")
        }        
        
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div style={{marginTop:'6rem'}}>
        <div className='container-content'>
          <h2 className='my-3 text-light'>Create an account to use iNotebook</h2>
          <form className='my-3' onSubmit={handleSubmit}> 
            <div className="my-3">
                <label htmlFor="name" className="form-label font-weight text-light">Name</label>
                <input type="text" className="form-control dark-wide-border text-light" 
                      style={{backgroundColor:'#0000'}} id="name" onChange={onChange} 
                      minLength={5} required name="name" aria-describedby="emailHelp"/>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label font-weight text-light">Email address</label>
                <input type="email" className="form-control dark-wide-border text-light" id="email" name='email'
                      style={{backgroundColor:'#0000'}} onChange={onChange} aria-describedby="emailHelp"
                      minLength={5} required/>
                <div id="emailHelp" className="form-text custom-font-size text-light">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label font-weight text-light">Password</label>
                <input type="password" className="form-control dark-wide-border text-light" name='password'
                      style={{backgroundColor:'#0000'}} onChange={onChange} id="password" minLength={5} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label font-weight text-light">Confirm Password</label>
                <input type="password" className="form-control dark-wide-border text-light"
                      style={{backgroundColor:'#0000'}} onChange={onChange} id="cpassword" name='cpassword' minLength={5} required/>
              </div>
              
              <button type="submit" className="btn btn-lg custom-button my-3" style={{width:'100%'}}>Sign Up</button>
              <div className='d-flex justify-content-center'>
                <span className='text-light mx-1'>Already have an account? </span> <Link className='text-info' to="/login"> Log in</Link>
              </div>
              <div>
            </div>
          </form>
        </div>
        <Footer/>
      </div>
  )
}

export default Signup
