import React, { useContext } from 'react';
import './Cart.css';
import { MenuContext } from '../../context/MenuContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, foodlist, removeFromCart, getTotalCartAmount, url } = useContext(MenuContext);
  const navigate = useNavigate();

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

            return (
              <div key={cartKey}>
                <div className="cart-items-title cart-items-item">
                  <img id="img" src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>{cartItem.size}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartItem.quantity}</p>
                  <p>Rs.{item.price * cartItem.quantity}</p>
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
          <p align="right"><button onClick={() => navigate('/order')} >PROCEED TO CHECKOUT</button></p>
        </div>
        <div className="cart-promocode">
          <div className="promocode">
            <p>if you have <span>Promo code</span>, Enter Here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart