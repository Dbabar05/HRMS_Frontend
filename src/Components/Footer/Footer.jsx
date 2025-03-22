import React from 'react'
import Service from '../Service/Service'

export default function Footer() {

    const hideElements = location.pathname === '/auth/login' || location.pathname === '/auth/register';

  return (
    <>

        {!hideElements && 
        <div className="serviceRow mt-5">
            <Service/>
        </div>
        }
        


        <div className={`footer d-flex justify-content-evenly bg-light mt-5`} >
        <div className="contact-container mt-4">
            <h3>E-Com Shopping Site</h3>
            <p>We offer a range of the finest and most premium products.</p>
            <ul >
                <li className='mb-2'><i className="fa-solid fa-phone me-2"></i>123456789</li>
                <li className='mb-2'><i className="fa-solid fa-paper-plane me-2"></i>ecom@gmail.com</li>
                <li className='mb-2'><i className="fa-solid fa-location-dot dot me-2" ></i>11/99 abc road, Mumbai</li>
            </ul>
        </div>

        <div className="info-container d-flex  w-50 justify-content-around mt-4">
            <div className="show-info">
                <h4>Shop Timing</h4>
                <p className='mt-4'>Monday - Friday:09:00 AM - 09:00 PM</p>
                <p>Saturday:09:00 AM - 07:00PM</p>
                <p>Sunday:Closed</p>
            </div>
           
            <div className="soical-media ">
                <h3 className='mb-4'>Follow Us</h3>
                <i className="fa-brands fa-instagram insta mx-2 fs-2"></i>  
                <i className="fa-brands fa-facebook fb mx-2 fs-2"></i> 
                <i className="fa-brands fa-x-twitter mx-2 fs-2"></i>
                <i className="fa-brands fa-youtube mx-2 fs-2"></i> 
            </div>

        </div>

    </div>
    </>
  )
}
