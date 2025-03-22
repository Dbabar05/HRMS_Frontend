import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  './login.css';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import { loginUser } from '../../APIService/apiservice';
import { saveToken } from '../../utils/jwt-helper';


export default function Login() {
   
    const [error, setError] = useState(''); 
  
    const navigate = useNavigate();


    const [values, setValues] = useState({

      userName:'',
      password:''
    });


    const handleSubmit = async (e)=>{
      e.preventDefault();
      console.log("Values" ,values)
      
      const response = loginUser(values)
      .then(response=>{
        if(response?.token){
          saveToken(response?.token);
          navigate('/')
        }
        else{
          setError("Something went wrong!");
        }
    }).catch(err=>{
      //To-do Check response status
      setError("Invalid Credentials!");
    }) 

    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
    

    
   
return(

  <div className="container loginWrapper">
      <div className="login-card">
        <div className="left-section">
          <div className="overlay1"></div>
        </div>

        <div className="right-section">
          <h4>E-COM</h4>
          <h2>Welcome Back</h2>
          <p>Please login to your account</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="userName" // Add name attribute
              placeholder="Email address"
              required
              value={values.userName}
              onChange={handleChange} 
              className='w-100 mx-0'// Unified change handler
            />
            <input
              type="password"
              name="password" // Add name attribute
              placeholder="Password"
              required
              value={values.password}
              onChange={handleChange}
              className='w-100 mx-0' // Unified change handler
            />

            <Link to="#" className="forgot-password">Forgot Password?</Link>
            <Button type="submit" className="login">Login</Button>
          </form>

          <div className="signup-link">
            Don't have an account? <Link to="/auth/register">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
  
}
