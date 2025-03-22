import React, { useEffect, useState } from 'react'
import './navbar.css'
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { createSearchParams, Link, useLocation } from 'react-router-dom';
import {getAllCategory} from '../APIService/apiservice';


export default function Navbar({ variant = "default" }) {

const [categories ,setCategories] = useState([]);
const [categoryId ,setCategoryId] = useState(null);
const [categoryTypeId ,setCategoryTypeId] = useState(null);

const location = useLocation(); 

    useEffect (()=>{
        const fetchCategory=async()=>{

            try {
                const data= await getAllCategory();
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchCategory();
    },[])


   

   const handleClick =(CatId, typeId)=>{
  
    setCategoryId(CatId);
    setCategoryTypeId(typeId);
   }

   const hideElements = location.pathname === '/auth/login' || location.pathname === '/auth/register';


  return (
    <>
     {variant === "default" && !hideElements && (
         <div className="nav">
         <div className="container-fluid px-5">
             <div className="row">
                 <div className="col-sm-3 part1 ">
                      {/* <Button >Sort By Categories</Button> */}
                      <Button  className='capTab'><GridViewOutlinedIcon/> &nbsp; Shop By Categories<KeyboardArrowRightIcon/></Button>
                 </div>
                 <div className="col-sm-7 part2">
                     
                     <nav>
                         <ul className='list list-inline mb-0'>

                         <li className='list-inline-item'><Button><Link to='/'>Home</Link></Button></li> 

                         {categories.map((category) => (
                             
                             <li className='list-inline-item mx-2' key={category.id}>
                                     <Button >
                                         {category.name}<KeyboardArrowDownIcon className='ms-2'/>
                                     </Button>

                                 <div className="dropdown_menu">
                                     <ul className='p-0'>

                                     {category.categoryTypes.map((type) => (

                                         <li key={type.id}>
                                            
                                             <Link 
                                                 to={{
                                                     pathname: "product/category",
                                                     search: `?${createSearchParams({
                                                     categoryId:category.id,
                                                     typeId: type.id
                                                     })}`,
                                                 }} 
                                                 className='FS'>
                                                     
                                                     <Button className='px-3' onClick={()=>handleClick(category.id,type.id)}>{type.name}</Button>
                                             </Link>
                                             
                                         </li>
                                     ))}
                                     
                                     </ul>
                                 </div>                                   
                         </li>
                             
                         ))}
                 
                           
                         </ul>
                     </nav>
                 </div>
                 <div className="col-sm-2 part3">

                 </div>

             </div>
         </div>

     </div>

     )}
       
    </>
  )
}
