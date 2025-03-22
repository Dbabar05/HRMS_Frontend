import React, { useState, useEffect, useMemo } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import Delete from "@mui/icons-material/DeleteOutlineOutlined";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Added missing state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // ✅ Check if user is logged in (Replace with actual auth logic)
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalItemCount(count);
    localStorage.setItem("cartCount", count);
  }, [cartItems]);

  // ✅ Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    localStorage.setItem("cartCount", 0);
  };

  // ✅ Memoized total price calculation
  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <>
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/">Shop</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Cart</li>
          </ul>
        </div>
      </div>

      <section className="CartSection">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="d-flex align-items-end w-100">
              <div className="left">
                <h1>Your Cart</h1>
                <p>There are <span>{totalItemCount}</span> products in your cart</p>
              </div>
              <span className="ms-auto clearCart d-flex" onClick={clearCart} style={{ cursor: "pointer" }}>
                <Delete /> Clear Cart
              </span>
            </div>

            <div className="cartWrapper mt-4">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="w-50">Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="img">
                                <img src={item.image || "default-image-url"} alt={item.name} width="100" />
                              </div>
                              <div className="product-info ps-4">
                                <Link to={`/product/${item.id}`}>
                                  <h4>{item.name}</h4>
                                </Link>
                                <div className="d-flex align-items-center ratingcontainer">
                                  <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                                  <span className="text-secondary">(32 Reviews)</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td><span className="unit-price">Rs {item.price}</span></td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                              <input type="text" value={item.quantity} readOnly className="text-center" style={{ width: "40px" }} />
                              <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                            </div>
                          </td>
                          <td><span className="unit-price text-blue">Rs {item.price * item.quantity}</span></td>
                          <td style={{ paddingLeft: "40px" }}>
                            <Delete style={{ cursor: "pointer" }} onClick={() => removeFromCart(item.id)} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <h4>Your cart is empty!</h4>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Link to="/">
              <Button className="special-button mt-3" style={{width:"18%"}}><WestIcon className="me-2" />Continue Shopping</Button>
            </Link>

            <div className="d-flex justify-content-around bg-light py-5 my-5">
              <div className="discount-block w-50">
                <h3>Discount Coupon</h3>
                <p className="my-4">Enter your coupon code</p>
                <form className="d-flex">
                  <input type="text" className="form-control me-4 py-2" placeholder="Enter code" />
                  <Button className="mt-2 special-button">Apply</Button>
                </form>
              </div>
              <div className="totalAmount-block">
                <div className="ms-3">
                  <p className="mb-2"><strong>Sub-Total :</strong> Rs {totalPrice}</p>
                  <p className="mb-2"><strong>Shipping :</strong> Rs 0</p>
                  <p className="mb-2"><strong>Grand Total :</strong> Rs {totalPrice}</p>
                </div>
                <hr />
                {isLoggedIn ? (
                  <Button className="special-button w-50 mb-2 mx-2" onClick={() => navigate("/checkout")}>Checkout</Button>
                ) : (
                  <Link to="/auth/login" className="special-button mx-2 " style={{ width: "75%" }}>Login to Checkout</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
