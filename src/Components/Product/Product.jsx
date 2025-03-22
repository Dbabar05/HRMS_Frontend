import React from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import './product.css';
import Rating from '@mui/material/Rating';  
import  ShoppingCart  from '@mui/icons-material/ShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Fade from '@mui/material/Fade';
import laptop from '../Images/laptop.png'
import { Button } from '@mui/material';

export default function Product({ product }) {
  // Ensure product is not undefined
  // const { id=1, name='unkown Product', category = 'Unknown Category', cost = 0, rating = 3.5, image = 'default-image-path.png' } = product || {};

  
const id = product.id

  return (
    <>
      <div className="productContainer" key={product.id}>
        <div className="img-warpper">
          {/* Dynamically use product image */}
          <img src={laptop} alt={product.name} className='w-100' />

          <div className="overlay">
            <ul className='list list-inline'>
              <li className='list-inline-item' style={{ borderRight: "1px solid rgba(0, 0, 0, 0.77)" }}>
                <Tooltip title="Add To Wishlist" placement="top" arrow
                  slots={{ transition: Fade }}
                  slotProps={{
                    popper: {
                      modifiers: [
                        { name: 'offset', options: { offset: [0, -4] } }
                      ],
                    },
                    transition: { timeout: 300 }
                  }}>
                  <Link><FavoriteBorderIcon /></Link>
                </Tooltip>
              </li>

              <li className='list-inline-item'>
                <Tooltip title="Quick View" placement="top" arrow
                  slots={{ transition: Fade }}
                  slotProps={{
                    popper: {
                      modifiers: [
                        { name: 'offset', options: { offset: [0, -3] } }
                      ],
                    },
                    transition: { timeout: 300 }
                  }}>
                  {/* Dynamically link to product details */}
                  
                  <Link 
                   to={{
                      pathname: "product/detail",
                      search: `?${createSearchParams({
                        id: id
                      })}`
                    }}><RemoveRedEyeOutlinedIcon /></Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>

        <div className="info">
          <span className='d-block category'>{product.categoryName}</span> {/* Fallback for category */}
          <h4 className='title'>{product.name}</h4>
          {/* Dynamically set rating */}
          <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
          <p className='brand'>By <span style={{ color: "blue" }}>{product.brand}</span></p> {/* Fallback for brand */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* Dynamically set price */}
              <span className='price'>Rs {product.price}</span> 
              <span className='oldprice ms-2'>Rs 42000</span> {/* Fallback for old price */}
            </div>
            {/* Dynamically link to product details */}
            <Link className='capTap' 
              to={`/product/detail/${product.id}`}
            >
              <ShoppingCart className="me-2" style={{ fontSize: "17px" }} />View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
