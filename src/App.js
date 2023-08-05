// App.js

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Main';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import './App.css';
import Inotebook from './components/Inotebook';
import ShowNote from './components/ShowNote';
import UserDetails from './components/UserDetails';

function App(props) {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const location = useLocation();

  // Function to get the background image based on the current route
  const getBackgroundImage = () => {

    const bg_home = 'https://images.unsplash.com/photo-1547043736-b2247cb34b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80';
    const bg_auth = 'https://images.unsplash.com/photo-1688494930045-328d0f95efe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
    const bg_main = 'https://plus.unsplash.com/premium_photo-1661286621197-ba9f83f2fccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
    const bg_abt = 'https://images.unsplash.com/photo-1613202637480-6950934de9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1452&q=80';
    const bg_user = 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'; 

    switch (location.pathname) {
      case '/':
        return bg_home;
      case '/main':
        return bg_main;
      case '/about':
        return bg_abt;
      case '/login':
        return bg_auth;
      case '/signup':
        return bg_auth;
      case '/notedetails':
        return bg_main;
      case '/userdetails':
        return bg_user;
      default:
        return 'none';
    }
  };

  return ( 
    <div className="app-container" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      <NoteState>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Inotebook/>} />
            <Route path="/main" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/notedetails" element={<ShowNote showAlert={showAlert}/>} />
            <Route path="/userdetails" element={<UserDetails showAlert={showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
