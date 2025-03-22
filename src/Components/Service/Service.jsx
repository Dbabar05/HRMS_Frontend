import React from 'react'
import './service.css'
import truck from '../Images/truck.svg'
import wallet from '../Images/waller.svg'
import returnOrder from '../Images/return.svg'  
import gift from '../Images/gift.svg'  
import headphone from '../Images/headphone.svg'

export default function Service() {
  return (
    <>
        <div className="container service">
            <div className="item">
                <div className="img-wrapper">
                    <img src={truck} alt="truck" className='w-75'  style={{transform:"scale(1.3)"}}/>
                </div>
                <div className="info-text">
                    <p>Free Shipping</p>
                    <span>For all Orders Over $100</span>
                </div>
            </div>
            <div className="item">
                <div className="img-wrapper">
                    <img src={returnOrder} alt="returnOrder" className='w-75'/>
                </div>
                <div className="info-text">
                    <p>30 Days Returns</p>
                    <span>For an Exchange Product</span>
                </div>
            </div>
            <div className="item">
                <div className="img-wrapper">
                    <img src={wallet} alt="wallet" className='w-75'/>
                </div>
                <div className="info-text">
                    <p>Secured Payment</p>
                    <span>Payment Cards Accepted</span>
                </div>
            </div>
            <div className="item">
                <div className="img-wrapper">
                    <img src={gift} alt="gift" className='w-75'/>
                </div>
                <div className="info-text">
                    <p>Special Gifts</p>
                    <span>Our First Product Order</span>
                </div>
            </div>
            <div className="item">
                <div className="img-wrapper">
                    <img src={headphone} alt="headphone" className='w-75'/>
                </div>
                <div className="info-text">
                    <p>Support 24/7</p>
                    <span>Contact us Anytime</span>
                </div>
            </div>
        </div>
    </>
  )
}
