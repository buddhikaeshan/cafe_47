import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { MenuContext } from '../../context/MenuContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodlist, cartItems, url } = useContext(MenuContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Process items with their sizes
    Object.entries(cartItems).forEach(([cartKey, cartItem]) => {
      if (cartItem.quantity > 0) {
        const [itemId, size] = cartKey.split('-');
        const itemInfo = foodlist.find(food => food._id === itemId);
        
        if (itemInfo) {
          orderItems.push({
            ...itemInfo,
            quantity: cartItem.quantity,
            size: size // Add the size information
          });
        }
      }
    });

    const orderData = {
      address: data,
      item: orderItems,
      amount: getTotalCartAmount() + 100,
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place`, 
        orderData, 
        { headers: { token } }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error in place order");
      }
    } catch (error) {
      console.log(error);
      alert("Error during order placement. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder}>
      <div className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields-name">
            <input 
              name='firstName' 
              onChange={onChangeHandler} 
              value={data.firstName} 
              type="text" 
              placeholder='First Name' 
              required 
            />
            <input 
              name='lastName' 
              onChange={onChangeHandler} 
              value={data.lastName} 
              type="text" 
              placeholder='Last Name' 
              required 
            />
          </div>
          <div className="multi-fields">
            <input 
              name='email' 
              onChange={onChangeHandler} 
              value={data.email} 
              type="email" 
              placeholder='Email@gmail.com' 
              required 
            />
          </div>
          <div className="multi-fields">
            <input 
              name='city' 
              onChange={onChangeHandler} 
              value={data.city} 
              type="text" 
              placeholder='City' 
              required 
            />
          </div>
          <div className="multi-fields">
            <input 
              name='address' 
              onChange={onChangeHandler} 
              value={data.address} 
              type="text" 
              placeholder='Address' 
              required 
            />
          </div>
          <div className="multi-fields">
            <input 
              name='phone' 
              onChange={onChangeHandler} 
              value={data.phone} 
              type="number" 
              placeholder='Phone' 
              required 
            />
          </div>
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : 100}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p><b>Total</b></p>
              <p><b>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100}</b></p>
            </div>
            <hr />
            <p align="right">
              <button type="submit">PROCEED TO CHECKOUT PAYMENT</button>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;