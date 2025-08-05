import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + Number(item.cost.substring(1)) * item.quantity, 0);
 
  };

  // Calculate tax
  const calculateTax = (total) => {
      return parseFloat((total *0.15).toFixed(2));
  };

    const totalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
   
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return Number(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className='checkout'>
    <div className="cart-container">
        <div className="checkout-header">
            <h1>Your Shopping Cart</h1>
            <p>Check your selection before checkout.</p>
        </div>

      <div className='checkout-content'>
        <div className='cart-items-section'>

        <h2 className='cart-items-header'>Plants in your cart : {totalItems()}</h2>
        
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className='justified'>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                  </div>  
                </div>

                <div className='justified'>
                  <div className="cart-item-cost">{item.cost}</div>
                  {/*<div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>*/}
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        </div>

        <div className='order-summary'>
            <h2 className='summary-header'>Order Summary</h2>

              {cart.map(item => (
                <div key={item.name} className='summary-row-subtotal'>
                 
                    <span className='subtotal-element'>{item.name}</span>
                    <span className='subtotal-element'>${calculateTotalCost(item)}</span>
                 
                </div>
              ))}

            <div className='summary-row'>
              <span className='summary-label'>Subtotal: </span>
              <span className='summary-value'> ${calculateTotalAmount()}</span>
            </div> 

            
            <div className='summary-row'>
              <span className='summary-label'>Taxes: </span>
              <span className='summary-value'> ${calculateTax(calculateTotalAmount())}</span>
            </div>
            
            <div className='total_cart_amount'>
               <span>Total</span> 
               <span> ${calculateTax(calculateTotalAmount())+calculateTotalAmount()}</span>
            </div>

            <div className='action-buttons'>
                <button className="get-started-button1">Checkout</button>
                <button className="continue-shop" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
            </div>

        </div>



      </div>


    </div>
    </div>
  );
};

export default CartItem;

