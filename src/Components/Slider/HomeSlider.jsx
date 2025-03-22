import React from 'react'
import './slider.css'
import Slider from 'react-slick'
import banner1 from '../Images/sub-banner-1.jpg'
import banner2 from '../Images/sub-banner-2.jpg'
import sample1 from '../Images/sample-1.jpg'
import sample2 from '../Images/sample-2.jpg'
import Currency from '@mui/icons-material/CurrencyRupeeOutlined';


export default function HomeSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade:true,
    autoplay:true,
    autoplaySpeed:2000
  };
  return (
    <> 
        <div className="homeslider">
            <div className="container-fluid slidercontainer d-flex">
              <div className="sliderbox mt-2">
                <Slider {...settings} className='home_slider_main'>
                  <div className='item'>
                    <img src={sample1} alt="sample1" className='w-100' />
                    <div className="info_text1">
                      <h1 className='mb-4' style={{fontSize:"42px"}}>Women Solid Round <br/> Green T-Shirt</h1>
                      <p style={{fontSize:"20px"}}>Starting At Only<span style={{fontSize:"35px" , color:"red", fontWeight:"600"}} className='ms-1' ><Currency/>59.00</span></p>
                    </div>
                  </div>
                  <div className='item'>
                    <img src={sample2} alt="sample2" className='w-100' />
                    <div className="info_text1">
                      <h1 className='mb-4' style={{fontSize:"42px"}}>Buy Modern Chair In<br/> Black Color</h1>
                      <p style={{fontSize:"20px"}}>Starting At Only<span style={{fontSize:"35px" , color:"red", fontWeight:"600"}} className='ms-1' ><Currency/>129.00</span></p>
                    </div>
                  </div>
                 
                
                </Slider>
              </div>

              <div className="norbox">
                  <div className="box mt-2">
                    <div className="imagewapper">
                      <img src={banner1} alt="" />
                    </div>
                    <div className="info_text2">
                      <h1 className='mb-2' style={{fontSize:"25px"}}>Samsung Gear<br/>VR Camera</h1>
                      <p style={{fontSize:"25px" , color:"red", fontWeight:"600"}}><Currency/>129.00</p>
                    </div>
                  </div>

                  <div className="box my-3">
                  <div className="imagewapper">
                      <img src={banner2} alt="" />
                    </div>
                    <div className="info_text3">
                      <h1 className='mb-2' style={{fontSize:"25px", fontWeight:"600"}}>Marcel Dining<br/>Room Chair</h1>
                      <p style={{fontSize:"25px" , color:"red", fontWeight:"600"}}><Currency/>129.00</p>
                    </div>
                  </div>
              </div>
            
            </div>
        </div>
    </>
  )
}
