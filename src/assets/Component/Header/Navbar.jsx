import React from 'react'
import './navbar.css'
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import addFrnd from "../../Images/add-friend.png"
import { useLocation } from 'react-router-dom';



export default function Navbar({variant="default"}) {

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: 7,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
          backgroundColor:"red"
          
        },
      }));

      const location = useLocation();
      const hideElement =  location.pathname ==="/" || location.pathname === "/register" || location.pathname === "/reset-password" || location.pathname === "/verify" || location.pathname === "/NewPassword";
  return (
    <>

    {variant=== "default" &&  !hideElement && (
        <div className="container-fluid header">
                  
        <div className="search-box">
            <input type="text" placeholder="Search for Employee......"/>
            <span>
                <SearchIcon className="search-icon" />
            </span>
        </div>
        {/* <div className="notification">
            <NotificationsNoneIcon className="bell-icon" />
        </div> */}

        <div className="user-profile">
            <div className="notification mx-4">

            <StyledBadge badgeContent=" " >
                <NotificationsNoneIcon className="bell-icon" />
            </StyledBadge>
            </div>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Profile" />
           
           
           
            <div className="user-info mt-3">
                <p className='username ms-2'>UserName</p>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item status-indicator'></li>
                    <li className='list-inline-item status'>Online</li>
                    <li className='list-inline-item'><ExpandMoreIcon/></li>
                </ul>
            </div>
        </div>    
    </div>


    )}

      {/* Side-bar */}

      {variant=== "default" &&  !hideElement && (
            <div className="sidebar">
            <h1> HRMS </h1>
            <div className="menu mt-3">
                <p className='menu-title ms-2 my-3'>MAIN</p>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><HomeIcon/></li>
                    <li className='list-inline-item dash'>Dashboard</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>

                <p className='menu-title ms-2 my-3'>HRM</p>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><PeopleIcon/></li>
                    <li className='list-inline-item dash'>Employee</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><img src={addFrnd} alt="" /></li>
                    <li className='list-inline-item dash'>Attendance</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><AssignmentIcon/></li>
                    <li className='list-inline-item dash'>Training</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><SchoolIcon/></li>
                    <li className='list-inline-item dash'>Performance</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><AccountBalanceWalletIcon/></li>
                    <li className='list-inline-item dash'>Payroll</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><DocumentScannerIcon/></li>
                    <li className='list-inline-item dash'>Documents</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>

                <p className='menu-title ms-2 my-3'>ADMINISTRATION</p>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><HeadphonesIcon/></li>
                    <li className='list-inline-item dash'>Help & Support</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><ManageAccountsIcon/></li>
                    <li className='list-inline-item dash'>User Management</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
                <ul className='list list-inline ms-2'>
                    <li className='list-inline-item'><ManageAccountsIcon/></li>
                    <li className='list-inline-item dash'>Reports</li>
                    <li className='list-inline-item exI'><ExpandMoreIcon/></li>
                </ul>
            </div>

            </div>

      )}
      
     

    </>
  )
}