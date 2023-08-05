import React, { useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

function UserDetails(props) {
  const context = useContext(noteContext);
  let { user, userDetails, editUser} = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userDetails();
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userDetails]);

  const [isModalOpen, setModalOpen] = useState(false);
//   const [user1,setUser1] = useState({id:"", ename:"", eemail:""});
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const modalRef = useRef(null);

//   const ref = useRef(null);
//   const refClose = useRef(null);

  const handleEditUser = () => {
    setModalOpen(true);
   
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

//   const updateNote = (currUser) =>{
//     ref.current.click();
//     setNote({id:currUser._id, etitle:currUser.title,edescription:currUser.description, etag:currUser.tag})   
//   }

  const handleUpdateUser = async () => {
    
    // Call the editUser function here to update user data
    try {

        // Check if the fields are empty
      if (name.trim() === '') {
          props.showAlert("Name can't be empty", "danger");
          return;
      }

      if (email.trim() === '') {
          props.showAlert("Email can't be empty", "danger");
          return;
      }

      await editUser(user._id, name, email);
      // The API call is successful, update the local user state
      
      let login_user = (name).replace(/\b\w/g, (char) => char.toUpperCase());
      localStorage.setItem('login_user', login_user);
      
      userDetails(); // Fetch updated user data from the backend and update the context
      // setJson(json);
      
      if (!email.includes('@')) {
        props.showAlert("Invalid email, provide with @", "danger");
        return;
      }
      else{
        props.showAlert("Profile updated successfully", "success");
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user data:', error);
      props.showAlert("Error Updating user data", "danger");
      // Handle the error if needed (e.g., show an error message)
    }
  };
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {user && (
        <div
          style={{
            width: '520px',
            height: '480px',
            borderRadius: '10%',
            display: 'flex',
            flexDirection: 'column', // Arrange the elements in a column
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the boxShadow as needed
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Move the "User Profile" to the top */}
          <div className='d-flex'>
            <h1 className='text-light text-center mx-4'>User Profile</h1>
            <span >
               <i className='fa-regular fa-pen-to-square text-light' onClick={handleEditUser} title='edit user details'></i>
            </span>
          </div>
          <i className="fa-solid fa-user-shield fa-5x my-2" style={{color: '#e7e8e9'}}></i>
          <div className='container-fluid text-center text-light'>
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <p>UserId: {user._id}</p>
            {/* Add other user information here */}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div
            style={{
              width: '420px',
              height: '350px',
              borderRadius: '10px',
              backgroundColor: '#202326',
              color:'#fff',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            //   alignItems: 'center',
            }}
          >
            <h2 className='text-center mb-2'>Edit User Profile</h2>
            <label className='form-label mt-2'>Username</label>
            <input
              id="ename" name='ename'
              className='text-light dark-wide-border form-control mb-3'
              style={{backgroundColor:'#202326'}}
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              minLength={5} required
            />
            <label className='form-label mt-1'>Email</label>
            <input
              id="email" name='email'
              className='text-light dark-wide-border form-control mb-2'
              style={{backgroundColor:'#202326'}}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              minLength={5}
              required
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center'}}>
              <button className='custom-button' onClick={handleUpdateUser}>Update User</button>
              <button className='custom-button' onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;