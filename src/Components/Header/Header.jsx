import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import LoginIcon from '@mui/icons-material/Login';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

export default function Header({ variant = "default" }) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Added this to track current path


  const cartCount = localStorage.getItem("cartCount") || 0;


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Converts token to true/false
  }, [location]); // 👈 Re-run effect when location changes
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsOpenDropDown(false);
    alert('You have been signed out.');
    navigate('/auth/login');
  };
  
  const handleLogin = () => {
    navigate('/auth/login');
  };
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 9,
      top: -1,
      color:'white',
      background:'black',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '5px 5px',
      
    },
  }));

  

  // 👇 Hide elements on login or signup page
  const hideElements = location.pathname === '/auth/login' || location.pathname === '/auth/register';

  return (
    <>
      <div className='container-fluid d-flex  header'>
        <div className='logo'>
          <Link to='/' style={{ color: 'black' }}>E-com</Link>
        </div>

        {/* ✅ Conditionally Render Search Bar */}
        {variant === "default" && !hideElements && (
          <div className='searchForm'>
            <form className='d-flex' role='search'>
              <input className='form-control ms-5 form' type='search' placeholder='Search' aria-label='Search' />
              <Button className='searchbutton'>Search</Button>
            </form>
          </div>
        )}

        <div className='col-sm-5 d-flex align-items-center justify-content-end'>
          <ClickAwayListener onClickAway={() => setIsOpenDropDown(false)}>
            <ul className='list list-inline mb-0 mx-3'>
              {/* ✅ Conditionally Render Wishlist & Cart */}
              {!hideElements && (
                <>
                  <li className='list-inline-item mx-3'>
                    <FavoriteBorderIcon />
                    <Link to={'/wishlist'} style={{ color: 'black' }} className='ms-2'>Wishlist</Link>
                  </li>

                  <li className='list-inline-item mx-3'>
                    <Link to={'/cart'} style={{ color: 'black' }}>
                      <StyledBadge  badgeContent={cartCount} >
                        <ShoppingCartOutlinedIcon className='me-2' />
                      </StyledBadge>
                        Cart
                    </Link>

                    {/* <Link to={'/cart'} style={{ color: 'black' }}>
                        {cartItems.length > 0 ? (  
                          <StyledBadge badgeContent={cartItems.length}>
                            <ShoppingCartOutlinedIcon className='me-2' />
                          </StyledBadge>
                        ) : (
                          <ShoppingCartOutlinedIcon className='me-2' />
                        )}
                        Cart
                      </Link> */}
                  </li>
                </>
              )}

              {/* Conditionally Render Login/Sign-in or Account */}
              {hideElements ? (
                <>
                  <div className='registration'>
                    <ul>
                      <li className='list-inline-item mx-5'>
                        <Link to='/auth/login'className='loginButton'>
                          <Button  startIcon={<LoginIcon />}>Login</Button>
                        </Link>
                      </li>
                      <li className='list-inline-item mx-4'>
                        <Link to='/auth/register' className='loginButton'> 
                          <Button >Sign In</Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <li className='list-inline-item mx-3' onClick={() => setIsOpenDropDown(!isOpenDropDown)}>
                  <PersonOutlineOutlinedIcon className='me-2' />
                  <span>Account</span>

                  {isOpenDropDown && (
                    <ul className='dropmenu'>
                      {isLoggedIn ? ( // ✅ Check login status here
                        <>
                          <li><Button><PersonOutlineOutlinedIcon className='me-2' />My Account</Button></li>
                          <li><Button><LocationOnOutlinedIcon className='me-2' />Order Tracking</Button></li>
                          <li><Button><FavoriteBorderIcon className='me-2' />My Wishlist</Button></li>
                          <li><Button><SettingsOutlinedIcon className='me-2' />Settings</Button></li>
                          <li><Button onClick={handleLogout}><LogoutOutlinedIcon className='me-2' />Sign Out</Button></li>
                        </>
                      ) : (
                        <li>
                          <Button onClick={handleLogin}>
                            <LoginIcon className='me-2' />
                            Log In
                          </Button>
                        </li>
                      )}
                    </ul>
                    )}

                </li>
              )}
            </ul>
          </ClickAwayListener>
        </div>
      </div>

      <Navbar variant = "default"/>
    </>
  );
}
