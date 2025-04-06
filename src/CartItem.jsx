import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  console.log(typeof(cart))
  // Calculate total amount for all products in the cart

    const calculateTotalAmount = (cart) => {
      let itemsArray = [];

      if (Array.isArray(cart)) {
        itemsArray = cart;
      } else if (typeof cart === 'object' && cart !== null) {
        itemsArray = Object.values(cart); // convert object to array of values
      } else {
        return 0;
      }
    
      let total = 0;
      itemsArray.forEach((item) => {
        const qty = item.quantity || 0;
        const cost = item.cost || "$0";
    
        const costNumber = parseFloat(cost.substring(1)) || 0;
        total += qty * costNumber;
      });
    
      return total.toFixed(2);
    };
   

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1; // Increment quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity })); // Dispatch action to update quantity
  };

  // Handle decrement of item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1; // Decrement quantity by 1
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity })); // Dispatch action to update quantity
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>Cart Total: ${calculateTotalAmount}</div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


