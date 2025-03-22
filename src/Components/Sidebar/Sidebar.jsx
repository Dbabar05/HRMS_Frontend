import React, { useState } from 'react'
import './sidebar.css'
import toy from '../Images/toys.png'
import beauty from '../Images/beauty.png'
import book from '../Images/books.png'
import game from '../Images/game.png'
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';




export default function Sidebar({category}) {

    const catImg=[
        "https://api.spicezgold.com/download/file_1734525204708_fash.png",
        "https://api.spicezgold.com/download/file_1734525218436_ele.png",
        "https://api.spicezgold.com/download/file_1734525239704_foot.png",
        "https://api.spicezgold.com/download/file_1734525231018_bag.png",
        toy,
        beauty,
        book,
        game
    ]

    const catTitle=[

        "Fashion",
        "Electronics",
        "Footwear",
        "Bag",
        "Toy",
        "Beauty",
        "Book",
        "Game"
    ]

    const [activeCategroy , setActiveCategroy ] = useState(category);

    // console.log(" categroy "+activeCategroy);

    function valuetext(value) {
        return `${value}°C`;
      }

    const [value, setValue] = React.useState([0, 37000]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };  

  return (
    <>
        <div className="sidebar">
            <div className="card border-0 shadow mb-5">
                    <h3>Category</h3>

                <div className="catList">
                    {Array(catTitle.length)
                        .fill(null)
                        .map((_,index)=>(
                          
                                <div key={index} 
                                className={`catItem d-flex align-items-center`}
                                  onClick={() => setActiveCategroy(catTitle[index])} 
                                  style={{
                                    boxShadow:  activeCategroy === catTitle[index] ?" 5px 5px 15px rgba(0 0 0 / 20%)" : "",
                                    border :  activeCategroy === catTitle[index] ? " 1px solid rgba(0, 0, 0, 0.288)" : "",
                                    backgroundColor : activeCategroy === catTitle[index] ? "#f1f1f1" : ""
                                  }}
                                >
                                    <span className='img'>
                                        <img src={catImg[index]} width={25} alt="fashion" />
                                    </span>
                                    <h4 className='mb-0 ml-auto me-3'
                                   
                                    >{catTitle[index]} </h4>
                                    <span className='d-flex align-items-center justify-content-center rounded-circle' style={{marginLeft:"auto"}}>10</span>
                                </div>
                       
                        ))
                    }
                </div>
            </div>

            <div className="card border-0 shadow">
                <h3>Filter By Price</h3>
                <Slider
                    min={0}
                    step={1}
                    max={60000}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />

                <div className="d-flex align-items-center justify-content-between" style={{fontSize:"13px"}}>
                    <span>From : <strong>Rs : {value[0]}</strong></span>
                    <span>From : <strong>Rs : {value[1]}</strong></span>
                </div>

                <div className="filter mt-3">
                    <h5>Filter By Ratings</h5>
                    <ul className='p-0'>
                        <li><Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly /></li>
                        <li><Rating name="half-rating-read" defaultValue={4} precision={0.5} readOnly /></li>
                        <li><Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly /></li>
                        <li><Rating name="half-rating-read" defaultValue={2} precision={0.5} readOnly /></li>
                        <li><Rating name="half-rating-read" defaultValue={1} precision={0.5} readOnly /></li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}
