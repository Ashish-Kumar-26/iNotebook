import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
// import noteContext from '../context/notes/noteContext';


const Navbar = (props) => {
  const loggedInUser = localStorage.getItem('login_user');

  // hello again

  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { userDetails } = context;
 
  const handleLogout = () =>{
     localStorage.removeItem('token');
    //  setLoginUser(null);
     props.showAlert("Logged out Successfully","success")
     navigate('/login');
  }

  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);



  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'#121414'}}>
      <div className="container-fluid">
        <Link className="navbar-brand " to="/"><i className="fa-solid fa-tablet-screen-button"></i> iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/main"?"active":""}`} aria-current="page" to="/main">WORKSPACE</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about" >ABOUT</Link>
            </li>
          </ul>
            
            {/* <a href="/" className="nav-link text-capitalize navbar-dark bg-dark">Hello </a> */}
            {localStorage.getItem('token') ? (
              <div className="d-flex align-items-center">
                    <span className="text-white mx-2">You're welcome !</span>
                    <Link className='d-flex text-d mx-1' to ="/userdetails" title="Show Profile" onClick={()=>{userDetails()}} role="button">
                      <div className='my-1 user-d'>
                        <span className='' style={{color:'#97FEED'}}>{loggedInUser}</span>
                      </div>
                      <div className="user-icon user-d mx-3">
                        <i className="fa-solid fa-user-graduate fa-2x" style={{color :"#A1CCD1"}}></i>
                      </div>
                    </Link>
                    <button className='btn btnnav mx-1' onClick={handleLogout} >Logout</button>
              </div>
                ) : (
                  
                  <form className="d-flex">
                    <Link className="btn btnnav mx-1 " to="/login" role='button'>Login</Link>
                    <Link className="btn btnnav mx-1 " to="/signup" role='button'>Sign Up</Link>
                  </form>
                )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
