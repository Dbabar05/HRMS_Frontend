import React from 'react'
import './SubBanner.css'
import banner1 from '../Images/cms-banner-4.jpg'
import banner2 from '../Images/cms-banner-5.jpg'
import { Button } from '@mui/material'

export default function SubBanner() {
  return (
    <>
        <div className="conatiner banner">
            <div className="item1 ">
                <div className="img-wrapper">
                    <img src={banner1} alt="" />
                </div>
                <div className="info_text1">
                    <p>Save Up To 20% Off</p>
                    <h1 className='mb-2'>Santa Lucia Three<br/>Seater Sofa</h1>
                    <Button>Shop Now</Button>
                </div>
            </div>
            <div className="item2 ">
                 <div className="img-wrapper">
                    <img src={banner2} alt="" />
                </div>
                <div className="info_text2">
                    <p>Save Up To 20% Off</p>
                    <h1 className='mb-2'>Santa Lucia Three<br/>Seater Sofa</h1>
                    <Button>Shop Now</Button>
                </div>
            </div>
        </div>
    
    </>
  )
}
