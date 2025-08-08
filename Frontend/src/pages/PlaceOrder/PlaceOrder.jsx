import React from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multiple-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="street" />
        <div className="multiple-fields">
          <input type="text" placeholder="District" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multiple-fields">
          <input type="text" placeholder="country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
        </div>
        <div className="cod-section">
          <h4>💰 Cash on Delivery</h4>
          <p>Pay when your order arrives at your doorstep</p>
        </div>
        <button 
          onClick={() => {
            if (getTotalCartAmount() === 0) {
              alert('Your cart is empty!');
              return;
            }
            const total = getTotalCartAmount() + 2;
            alert(`Order Placed Successfully! \n\nTotal Amount: $${total}\nPayment: Cash on Delivery\n\nYour order will be delivered in 30-45 minutes.\nPlease keep $${total} ready for payment.`);
            setCartItems({});
            navigate('/');
          }}
        >
          PLACE ORDER (Cash on Delivery)
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
