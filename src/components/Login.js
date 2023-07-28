import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Footer from './Footer';
// import noteContext from '../context/notes/noteContext';

const Login = (props) => {
    // const context = useContext(noteContext);
    // const { activateLoggedinUsername } = context;
    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();
    // const [login_user, setLoginUser] = useState(null);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
             "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        // console.log(json)
        if(json.success){
            //save the auth token and redirect
            // console.log("1st - " + localStorage.getItem('token'));

            localStorage.setItem('token', json.authtoken);
            const token = localStorage.getItem('token');
            // console.log("2nd - " + token);
            
            if (token) {
                try {
                    const response = await fetch("http://localhost:5000/api/auth/getuser", {
                        method: "POST",
                        headers: {
                            "auth-token": token,
                            "Content-Type": "application/json",
                        },
                    });
                    
                    const user = await response.json();
                    let login_user = (user.name).replace(/\b\w/g, (char) => char.toUpperCase());
                    // activateLoggedinUsername(login_user);
                    localStorage.setItem('login_user', login_user);
                    // setLoginUser(login_user); // Assuming 'name' is one of the properties returned from the server
                    // console.log("3rd - " + token);
                } catch (error) {
                    // Handle error
                  console.error('Error fetching user details:', error);
                }
              }
            // console.log( localStorage.setItem('token', json.authtoken));
            props.showAlert("Logged in Successfully","success")
            navigate('/main', {replace: true});
        }
        else{ 
          props.showAlert("Invalid Credentials","danger") 
        }
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div style={{marginTop:'6rem'}}>
    <div className='container-content'>
        <h2 className='text-light'>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="my-3 ">
                <label htmlFor="email" className="form-label font-weight text-light">Email address</label>
                <input type="email" className="form-control dark-wide-border text-light"
                       style={{backgroundColor:'#0000'}} value={credentials.email} 
                       minLength={5} required onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text custom-font-size text-light">We'll never share your email with anyone else.</div>
            </div>
            <div className="my-3">
                <label htmlFor="password" className="form-label font-weight text-light">Password</label>
                <input type="password" className="form-control dark-wide-border text-light"
                       minLength={5} required
                       style={{backgroundColor:'#0000'}} value={credentials.password} onChange={onChange} id="password" name='password'/>
            </div>
            <button type="submit" className="btn btn-lg custom-button my-3" style={{width:'100%'}}>Log In</button>
            <div className='d-flex justify-content-center'>
                <span className='text-light mx-1'>Don't have an account?</span> <Link className='text-info' to="/signup"> Sign Up</Link>
            </div>
        </form>
    </div>
    <p style={{margin:'20px',opacity:'0'}}>hidden</p>
    <Footer/>
    <p style={{margin:'10px',opacity:'0'}}>hidden</p>
    </div>
  )
}

export default Login
