import React, { useContext } from 'react';
import './Cart.css';
import { MenuContext } from '../../context/MenuContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, foodlist, removeFromCart, url } = useContext(MenuContext);
  const navigate = useNavigate();

  // Function to calculate adjusted price based on size
  const getAdjustedPrice = (basePrice, size) => {
    const price = parseFloat(basePrice);
    if (size === 'Small') { return price - 100; }
    if (size === 'Large') { return price + 150; }
    return price; // default price for medium or unspecified size
  };

  // Calculate total amount locally with size adjustments
  const calculateTotalCartAmount = () => {
    let total = 0;
    Object.entries(cartItems).forEach(([cartKey, cartItem]) => {
      if (cartItem.quantity > 0) {
        const [itemId] = cartKey.split('-');
        const item = foodlist.find(food => food._id === itemId);
        if (item) {
          const adjustedPrice = getAdjustedPrice(item.price, cartItem.size);
          total += adjustedPrice * cartItem.quantity;
        }
      }
    });
    return total;
  };

  const subtotal = calculateTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 100;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p id="img">Title</p>
          <p>Size</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.entries(cartItems).map(([cartKey, cartItem]) => {
          if (cartItem.quantity > 0) {
            const [itemId] = cartKey.split('-');
            const item = foodlist.find(food => food._id === itemId);

            if (!item) return null;

            const adjustedPrice = getAdjustedPrice(item.price, cartItem.size);

            return (
              <div key={cartKey}>
                <div className="cart-items-title cart-items-item">
                  <img id="img" src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>{cartItem.size}</p>
                  <p>Rs.{adjustedPrice.toFixed(2)}</p>
                  <p>{cartItem.quantity}</p>
                  <p>Rs.{(adjustedPrice * cartItem.quantity).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(itemId, cartItem.size)} className='close'>
                    Remove
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className='cart-bottem'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs. {subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>Rs. {deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p><b>Total</b></p>
            <p><b>Rs. {grandTotal.toFixed(2)}</b></p>
          </div>
          <hr />
          <p align="right">
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;