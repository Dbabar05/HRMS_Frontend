import axios from 'axios';
import React from 'react'
import './signin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import Facebook from '@mui/icons-material/FacebookOutlined';
import { Button } from '@mui/material';
import { registerUser } from '../../APIService/apiservice';
import VerifyUser from './VerifyUser';
import { Divider } from '@mui/material';


export default function SignIn() {
   
  const [error,setError] =useState('');
  const [values,setValues] =useState({
    email:'',
    password: '',
    firstName: "",
    lastName: "",
    phoneNumber:'',
  });

  const [enableVerify,setEnableVerify] =useState(false);
    
    const navigate = useNavigate();

    
     const handleSubmit = async (e)=>{
          e.preventDefault();
          console.log("Values" ,values)

           const response = registerUser(values)
              .then(response=>{
                if(response?.code === 200){
                  setEnableVerify(true);
                }
               
            }).catch(err=>{
              setError("Invalid or Email already exist!")
            })
    
        }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    
  return (
    <>
    <div className="container signinWrapper">
    <div className="signin-card">

      {!enableVerify &&  
      <div className="right-box">
        <h4>E-COM</h4>
        <h2>Welcome</h2>
        <p>Please Create an Account</p>

        <form onSubmit={handleSubmit} className='d-flex justify-conten-between flex-wrap'>

            <input
              type="text"
              name="firstName" // Add name attribute
              placeholder="Enter Your First Name"
              required
              value={values.firstName}
              onChange={handleChange} // Unified change handler
            />
            <input
              type="text"
              name="lastName" // Add name attribute
              placeholder="Enter Your Last Name"
              required
              value={values.lastName}
              onChange={handleChange} // Unified change handler
            />
              <input
              type="email"
              name="email" // Add name attribute
              placeholder="Email address"
              required
              value={values.email}
              onChange={handleChange} 
              style={{width:'95%'}}
            />
            <input
              type="password"
              name="password" // Add name attribute
              placeholder="Password"
              required
              value={values.password}
              onChange={handleChange} // Unified change handler
            />
            <input
              type="number"
              name="phoneNumber" // Add name attribute
              placeholder="Enter your Phone Number"
              required
              value={values.phoneNumber}
              onChange={handleChange} // Unified change handler
            />
          
          <Button type="submit" className="signin mt-3">Sign In</Button>
        </form>

        {error && <p className='text-danger mt-3 pb-0'>{error}</p>}

        <Divider textAlign="center" style={{ margin: '20px 0', color: '#555' }}>
          Or Sign In With
        </Divider>

        <div className="social-buttons d-flex">
          <Button className="google-btn"><GoogleIcon className='social-icon'/>Google</Button>
          <Button className="facebook-btn"><Facebook className='social-icon'/>Facebook</Button>
        </div>

        <div className="signup-link"> Already have an  account?<Link to="/auth/login"> Log In</Link>
        </div>
      </div>
      
      }


    {enableVerify && <VerifyUser email={values.email}/>  }
     
     
    <div className="left-box">
      <div className="overlay2"></div>
    </div>

    </div>
  </div>
    </>
  )

}
