import React, { useState } from "react";   
import loginImg from "../../Images/login.png"
import './login.css'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Login Attempt:", { username, password, rememberMe });
    };
  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <div className="left-section-login">
          <h1 className="title">HRMS</h1>
          <h2 className="subtitle">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="username"  value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="remember-forgot">
                <div className="remember-me">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className="mt-2">Remember Me</label>
                </div>
                <Link to="/reset-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <Button type="submit" className="login-btn">Log In</Button>
            </form>
            <p className="register-link">Don't have an account? <Link to="/register">Create an account</Link></p>
        </div>
        <div className="right-section-login">
          <img src={loginImg} alt="Illustration" className="login-image" />
        </div>
      </div>
    </div>
    </>
    
  )
}
