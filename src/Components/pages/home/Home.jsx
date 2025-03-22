import React, { useState, useEffect } from "react";
import Category from "../../Content/Category";
import HomeSlider from "../../Slider/HomeSlider";
import "./home.css";
import Product from "../../Product/Product";
import SubBanner from "../../Sub-Banner/SubBanner";
import { getProductsByCategory } from "../../APIService/apiservice";
import { createSearchParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Button data
  const buttons = [
    "Electronics",
    "Fashion",
    "Furniture",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
  ];

  const [searchParams] = useSearchParams();
  const category = searchParams.get("name") || "Electronics"; // Default to Electronics if no param

  // Fetch products based on the selected category
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductsByCategory(category);
        setProducts(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch products");
        // Dummy data for fallback
        const dummyData = [
          {
            id: 1,
            name: "Dummy Product 1",
            desc: "This is a dummy product description for 1.",
            category,
            rating: 3,
            cost: 100,
            qty: 10,
            brand: "Dummy Brand",
            imageUrl: "https://via.placeholder.com/200",
          },
          {
            id: 2,
            name: "Dummy Product 2",
            desc: "This is a dummy product description.",
            category,
            rating: 4,
            cost: 100,
            qty: 10,
            brand: "Dummy Brand",
            imageUrl: "https://via.placeholder.com/200",
          },
        ];
        setProducts(dummyData);
      }
    };
    fetchProduct();
  }, [category]);

  // Handle tab click and navigation
  const handleTabClick = (button) => {
    if (button === "Electronics") {
      navigate(""); // No search params for default category
    } else {
      navigate({
        pathname: "",
        search: `?${createSearchParams({ name: button })}`,
      });
    }
  };

  return (
    <>
      <HomeSlider />
      <Category />
      <section className="homeProduct">
        <div className="container-fluid">
          <div className="d-flex align-items-center mx-5">
            <h2>Popular Products</h2>
            <ul
              className="list list-inline filterTab"
              style={{ listStyle: "none", padding: 0 }}
            >
              {buttons.map((button, index) => (
                <li
                  key={index}
                  className="list-inline-item"
                  style={{ display: "inline-block" }}
                >
                  <Button
                    onClick={() => handleTabClick(button)}
                    style={{
                      padding: "10px 20px",
                      border: "none",
                      color: "black",
                      textTransform: "capitalize",
                      background: "transparent",
                      fontWeight: "400",
                      borderBottom:
                        category === button
                          ? "2px solid blue"
                          : "2px solid transparent",
                      cursor: "pointer",
                      fontSize: "19px",
                      transition: "border 0.6s",
                      borderRadius: "0",
                    }}
                  >
                    {button}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="productRow">
            {products.slice(0, 10).map((product) => (
              <div key={product.id} className="item">
                <Product product={product} />
              </div>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="subBannerRow mt-2">
            <SubBanner />
          </div>
        </div>
      </section>
    </>
  );
}
