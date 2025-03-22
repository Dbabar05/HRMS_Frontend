import React from 'react'
import './detail.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import InnerImageZoom from 'react-inner-image-zoom'; 
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'; 
import Slider from 'react-slick'
import { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';
import Favorite from '@mui/icons-material/FavoriteBorderOutlined';
import { useSearchParams } from 'react-router-dom';
import Star from '@mui/icons-material/StarPurple500Outlined';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import Product from '../../Product/Product';
import { useEffect } from 'react';

import {getProductsByCategory, getProductsById} from '../../APIService/apiservice'

// import { useCart } from '../Cart/CartContext';




export default function DetailProduct() {

    const { id } = useParams();


    const navigate = useNavigate();
  
    const [products, setProducts] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [ratingValue, setRatingValue] = useState(0);
    const [category, setCategory] = useState("Electronics");
    const [qtyValue, setQtyValue] = useState(1);
    const [tabActive, setTabActive] = useState(0);
    const [activeSpec, setactiveSpec ] = useState(0);
    const [activeTab, setactiveTab ]= useState(0);
    const [productRating , setproductRating] = useState(0);
    const [ProductReviews, setProductReviews] = useState([])

    const token = localStorage.getItem("authToken"); // Check if token exists
    if (!token) {
        console.error("No token found, authentication required!");
        return;
    }
    
    // const categories = [
    //     "Electronics",
    //     "Fashion",
    //     "Furniture",
    //     "Beauty",
    //     "Sports",
    //     "Books",
    //     "Toys",
    //   ];
      
      const specs = {
        Electronics: { label: "RAM", options: ["6 GB", "8 GB", "12 GB"] },
        Fashion: { label: "Size", options: ["S", "M", "L"] },
        Furniture: { label: "Weight", options: ["10kg", "20kg", "30kg"] },
        Beauty: { label: "Colors", options: ["Red", "Blue", "Green"] },
        Sports: { label: "Size", options: ["S", "M", "L"] },
        Books: { label: "Pages", options: ["100", "200", "300"] },
        Toys: { label: "Age Range", options: ["3+", "5+", "10+"] },
      };


  const { pname='unkown Product', pcategory = 'Unknown Category', pcost = 0, prating = 3.5, image = 'default-image-path.png' } = products || {};

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
      };
    

      const pimg = [
        'https://api.spicezgold.com/download/file_1734693615931_lenovo-ideapad-slim-3-intel-core-i5-12450h-15-6-39-6cm-fhd-ips-thin-light-laptop-16gb-512gb-ssd-win-11-office-2021-alex-backlit-keyboard-1-year-warranty-adp-3-month-game-pass-grey-1-62kg-83er008din-produc-Copy.webp',

        'https://api.spicezgold.com/download/file_1734693649180_lenovo-ideapad-slim-3-intel-core-i5-12450h-15-6-39-6cm-fhd-ips-thin-light-laptop-16gb-512gb-ssd-win-11-office-2021-alex-backlit-keyboard-1-year-warranty-adp-3-month-game-pass-grey-1-62kg-83er008din-pro(1).webp',
    ];

    const [zoomImg, setZoomImg] = useState(pimg[0]);



    const goto =(index, pimg)=>{
        // alert(index);
        setZoomImg(pimg)
    }


    const isActive =(index)=>{
        setactiveSpec(index);
    }
     

    const setValue =(number)=>{
        if (number >= 1) {
            setQtyValue(number);
        }
    }

    const changeTab =(index)=>{
        setactiveTab(index)
        setTabActive(index);

    }

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[200],
          ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
          }),
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: '#1a90ff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8',
          }),
        },
      }));


    useEffect (()=>{

    const fetchProduct = async () =>{

        try {

            const data = await getProductsById(id, token);
             console.log(data)
            setProducts(data);
            setproductRating(data.rating)
            setCategory(data.categoryName);
            setProductReviews(data.productReview);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch related products.');
        }
    };

    fetchProduct();

    },[])

  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) return; // Avoid calling API without a valid category

      try {
        const data = await getProductsByCategory(category);
        // console.log(data)
        setRelatedProducts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch related products.');
      }
    };

    fetchRelatedProducts();
  }, [category]);

         
  // Function to add product to cart and save to localStorage
  const handleAddToCart = () => {
    if (!products) return;

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingIndex = cartItems.findIndex((item) => item.id === products.id);

    if (existingIndex !== -1) {
      // If product exists, update the quantity
      cartItems[existingIndex].quantity += qtyValue;
    } else {
      // Otherwise, add a new product to the cart
      cartItems.push({
        id: products.id,
        name: products.name,
        price: products.price,
        category: category,
        quantity: qtyValue,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Product added to cart!");
  };
    
        
  
    
  return (
    <>
        <section className='detailProductView'>
            <div className="breadcrumb-wrapper">
                <div className="container-fluid">
                    <ul className="breadcrumb breadcrumb2">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/">Electronics</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Laptop</li>
                    </ul>
                </div>
            </div>

            <div className="container detailsContainer">
                <div className="row">
                    <div className="col-md-4" style={{marginRight: "60px", width:"480px"}}>      
                         <div className="productZoom">
                             <InnerImageZoom zoomType="hover" zoomScale={1.5} src={zoomImg}/> 
                         </div>  

                         <div className="catSliderSection">
                            <div className="container">
                            <Slider {...sliderSettings} className='zoomSlider'>

                                {pimg.map((pimg,index)=>(
                                    <div key={index} className="catitem">
                                         <img src={pimg} alt=""  onClick={()=>goto(index+1, pimg)}/>
                                    </div>
                                ))

                                }
                            </Slider>
                            </div>
                        </div>
                         

                    </div>
                    <div className="col-md-7 productInfo mt-3">
                        
                        <h1>{products.name}</h1>
                        <h5 className='pt-3'>{products.brand}</h5>

                        <div className="d-flex align-items-center my-4">
                            <Rating name="half-rating-read" value={productRating} precision={0.5} readOnly />
                            <span className='text-secondary'>(32 Reviews)</span>
                        </div>

                        <div className="d-flex align-items-center">
                            <p className='price'>Rs {products.price}</p>
                            <div className="d-flex flex-column ms-3 mb-2">
                                <span className='text-org'>20% Off</span>
                                <span className='oldprice'>Rs 55000</span>
                            </div>
                            
                        </div>
                        
                        <div className="product-desc">
                         <p className=' text-secondary'>{products.description}</p>
                        </div>

                        <div className="productSpec d-flex align-items-center">
                            <span className="fs-4">{specs[category].label}:</span>
                            <ul className="list list-inline ms-3 pt-3">
                            {specs[category].options.map((option, index) => (
                                <li key={index} className="list-inline-item">
                                <Button
                                    className={`specButton ${activeSpec === index ? "specActive" : ""}`}
                                    onClick={() => setactiveSpec(index)}
                                >
                                    {option}
                                </Button>
                                </li>
                            ))}
                            </ul>
                        </div>

                        <div className="d-flex align-items-center mt-4">
                            <div className="quantityDrop d-flex align-itmes-center">
                                <Button onClick={()=>setValue(qtyValue-1)}><RemoveIcon/></Button>
                                <input type="text" value={qtyValue}  readOnly />
                                <Button onClick={()=>setValue(qtyValue+1)}><AddIcon/></Button>

                            </div>

                            <div className="AddTOCart d-flex align-items-center">
                                <Button className='cartButton mx-2' onClick={handleAddToCart} ><ShoppingCart className='mx-2'/>Add To Cart</Button>
                                <Button className='wishButton mx-2'><Favorite/></Button>

                            </div>
                        </div>
                            
                    </div>

                </div>
            </div>

            <div className="card p-5 detailPageTab">
                <div className="customTabs">
                    <ul className='list list-inline'>
                        <li className='list-inline-items'>
                            <Button className={`tabsButtons ${tabActive ==0 ? 'tabActive': ''}`} onClick={()=>changeTab(0)}>Description</Button>
                            <Button className={`tabsButtons ${tabActive ==1 ? 'tabActive': ''}`} onClick={()=>changeTab(1)}>Addition Info</Button>
                            <Button className={`tabsButtons ${tabActive ==2 ? 'tabActive': ''}`} onClick={()=>changeTab(2)}>Reviews</Button>
                        </li>

                    </ul>
                </div>
                    <br />

                    {activeTab ==0 && <div className="tabContent">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolor dolorem autem, corrupti quae recusandae fugit expedita inventore incidunt iusto, rem laborum doloribus ipsum natus sequi omnis eius minus soluta.
                        Laboriosam, consequatur ea cumque ipsum ipsa nam et voluptatibus vero minus numquam inventore rem odit culpa corrupti necessitatibus, quibusdam quis voluptatum? Libero voluptas ipsa maxime facere temporibus ea magnam amet?</p>
                        </div> 
                    }
                
                    {activeTab ==1 &&    
                        <div className="tabContent">
                            <div className="table-resposive">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr class="stand-up">
                                            <th>Stand Up</th>
                                            <td><p>35″L x 24″W x 37-45″H(front to back wheel)</p></td>
                                        </tr>
                                        <tr class="folded-wo-wheels">
                                            <th>Folded (w/o wheels)</th>
                                            <td><p>32.5″L x 18.5″W x 16.5″H</p></td>
                                        </tr>
                                        <tr class="folded-w-wheels">
                                            <th>Folded (w/ wheels)</th>
                                            <td><p>32.5″L x 24″W x 18.5″H</p></td>
                                        </tr>

                                        <tr class="door-pass-through">
                                            <th>Door Pass Through</th>
                                            <td><p>24</p></td>
                                        </tr>

                                        <tr class="frame">
                                            <th>Frame</th>
                                            <td><p>Aluminum</p></td>
                                        </tr>

                                        <tr class="weight-wo-wheels">
                                            <th>Weight (w/o wheels)</th>
                                            <td><p>20 LBS</p></td>
                                        </tr>
                                        
                                        <tr class="weight-capacity">
                                            <th>Weight Capacity</th>
                                            <td><p>60 LBS</p></td>
                                        </tr>
                                        
                                        <tr class="width">
                                            <th>Width</th>
                                            <td><p>24″</p></td>
                                        </tr>
                                        
                                        <tr class="handle-height-ground-to-handle">
                                            <th>Handle height (ground to handle)</th>
                                            <td><p>37-45″</p></td>
                                        </tr>
                                        
                                        <tr class="wheels">
                                            <th>Wheels</th>
                                            <td><p>12″ air / wide track slick tread</p></td>
                                        </tr>
                                        
                                        <tr class="seat-back-height">
                                            <th>Seat back height</th>
                                            <td><p>21.5″</p></td>
                                        </tr>
                                        
                                        <tr class="head-room-inside-canopy">
                                            <th>Head room (inside canopy)</th>
                                            <td><p>25″</p></td>
                                        </tr>
                                        
                                        <tr class="pa_color">
                                            <th>Color</th>
                                            <td><p>Black, Blue, Red, White</p></td>
                                        </tr>
                                        
                                        <tr class="pa_size">
                                            <th>Size</th>
                                            <td><p>M, S</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {activeTab ==2 && <div className="tabContent">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4>Ratings & Reviews</h4>
                                    <br />
                                    <div className="card p-3 reviewCard ">
                                        <div className='reviewBox'>
                                            <p className='ratingbox'>5 <Star/></p>
                                            <p className='ratingtitle'>Mind-blowing purchase</p>
                                        </div>
                                        <p>Top notch quality astonishing purchase very very worth for buying. you can buy it blindly</p>
                                        <p className='customerDetails'><span className='customerName'>Jeevanantham Vanjipalayam</span> Dec, 2021</p>
                                    </div>
                                    {ProductReviews.map((reviews)=>(
                                          <div className="card p-3 reviewCard ">
                                          <div className='reviewBox'>
                                              <p className='ratingbox'>{reviews.rating} <Star/></p>
                                              <p className='ratingtitle'>Mind-blowing purchase</p>
                                          </div>
                                          <p>{reviews.review}</p>
                                          <p className='customerDetails'><span className='customerName'>{reviews.name}</span> {reviews.createdAt}</p>
                                      </div>
                                    ))}
                                   
                                    
                                    <Button className='reviewButton'>All Reviews</Button>

                                    <div className="reviewfrom mt-4">

                                        <h4 className='mb-3'>Add Review</h4>
                                        <form action="">

                                             <Rating name="no-value" value={ratingValue} className='mb-3 ratingValue' onChange={(event, newValue)=>{setRatingValue(newValue);}}/>
                                      
                                            <div className="form-group">
                                                <textarea placeholder='Write a Review' className='form-control'></textarea>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type='text' placeholder='Full Name' className='form-control'></input>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type='text' placeholder='Email Address' className='form-control'></input>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <Button>Submit</Button>
                                        </form>
                                    </div>

                                </div>

                                <div className="col-md-4 mt-5">
                                    <div className="ratingCard border d-flex py-3 px-3">
                                        <div className='TotalRating'>
                                            <p className=' pt-3'>4.7 <Star /></p>
                                            <p style={{fontSize:"12px", fontWeight:"500"}} className='my-1'>17,070 Ratings</p>
                                            <p style={{fontSize:"12px", fontWeight:"500"}} className='my-1'>1,458 Reviews</p>
                                        </div>
                                        <div className="w-75 px-2">
                                            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                                                <span className='text-dark ratingStar'>5 <Star />
                                                    <BorderLinearProgress variant="determinate" value={60} style={{marginLeft:"40px", width:"85%", height:"7px", marginTop:"-15px"}}/>
                                                </span>
                                                <span className='text-dark ratingStar'>4 <Star />
                                                    <BorderLinearProgress variant="determinate" value={50} style={{marginLeft:"40px", width:"85%", height:"7px", marginTop:"-15px"}}/>
                                                </span>
                                                <span className='text-dark ratingStar'>3 <Star />
                                                    <BorderLinearProgress variant="determinate" value={20} style={{marginLeft:"40px", width:"85%", height:"7px", marginTop:"-15px"}}/>
                                                </span>
                                                <span className='text-dark ratingStar'>2 <Star />
                                                    <BorderLinearProgress variant="determinate" value={10} style={{marginLeft:"40px", width:"85%", height:"7px", marginTop:"-15px"}}/>
                                                </span>
                                                <span className='text-dark ratingStar'>1 <Star />
                                                    <BorderLinearProgress variant="determinate" value={25} style={{marginLeft:"40px", width:"85%", height:"7px", marginTop:"-15px"}}/>
                                                </span>
                                                
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                            
                            
                            </div>                            
                        </div> 
                    }
             

            </div>


        </section>
       <div className="relatedProduct-wrapper">
            <h2 className='pt-4 ps-5'>Related Products</h2>
                    <div className="relatedProduct">
                        <Slider {...sliderSettings} className='prodSlider'>
                        {relatedProducts.slice(0 ,7).map((product, index)=>(
                                <div key={index} className="item">
                                    <Product product={product} />  {/* Assuming Product component takes a 'product' prop */}
                                </div>
                            ))}

                        </Slider>
                    </div>
       </div>
                   
          
    </>
  )
}
