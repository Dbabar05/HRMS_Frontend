import React, { useState, useEffect } from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import EA from '../Images/device.png';
import fashion from '../Images/fashion.png';
import furniture from '../Images/furniture.png';
import game from '../Images/game.png';
import toy from '../Images/toys.png';
import books from '../Images/books.png';
import beauty from '../Images/beauty.png';
import { getAllCategory } from '../APIService/apiservice';

export default function Category() {
  const [categories, setCategories] = useState([]);

  // Map category names to their respective images
  const categoryImages = {
    Electronics: EA,
    Fashion: fashion,
    Furniture: furniture,
    Beauty: beauty,
    Sports: game,
    Books: books,
    Toys: toy,
    // Add more mappings as needed
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ background: '#f5f0f0' }}>
        <h3 style={{ margin: '0 70px' }}>Featured Categories</h3>
        <div className="container category-container">
          {categories.map((category) => (
            <Link
              to={{
                pathname: 'product/category',
                search: `?${createSearchParams({
                  name: category.name,
                })}`,
              }}
              key={category.id}
            >
              <div className="category-item">
                {/* Dynamically assign the image based on category name */}
                <img
                  src={categoryImages[category.name] || EA} // Default image if no match
                  alt={category.name}
                  className="category-icon"
                />
              </div>
              <p className="category-name">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
