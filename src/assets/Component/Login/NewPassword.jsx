import React from 'react'
import { useNavigate } from "react-router-dom";
import "./NewPassword.css"; // Ensure this file is created for styling
import bg from "../../Images/reset-pwd2.png"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


export default function NewPassword() {

  const navigate = useNavigate();
    const handleResetSuccess = () => {
        setTimeout(() => {
          navigate("/");
        }, 500);
      };
  return (
    <>
    <div className="password-container">
      <div className="password-box">
        {/* Left Section */}
        <div className="password-left">
          <h1 className="password-title">HRMS</h1>

          <div className="lock-icon">
          <div className="d-flex justify-content-center align-items-center"> 
            <div
            className="profile-icon d-flex justify-content-center align-items-center mb-4" >
            <div
                className="inner-circle d-flex justify-content-center align-items-center"
                style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: "white",
                }}
            >
                <PersonOutlineIcon className="logo" color="black" />
            </div>
            </div>
          </div>
          </div>
          <h2 className="password-heading">Reset Password</h2>
          <div className="container mt-3">
          <hr
            style={{
              borderTop: "2px dashed gray",
              width: "100%",
            }}
          />
        </div>

          <div className="input-group">
            <label>New Password</label>
            <input type="password" placeholder="enter new password" />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="confirm password" />
          </div>

          <button className="password-btn" onClick={handleResetSuccess}>
            Reset Password
          </button>
        </div>

        {/* Right Section */}
        <div className="password-right">
          <div className="image-placeholder"></div>
          <img src={bg} alt="Illustration" className="resetpwd-image" />
        </div>
      </div>
    </div>
    </>
  )
}
