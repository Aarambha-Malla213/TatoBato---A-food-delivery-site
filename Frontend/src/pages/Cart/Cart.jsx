import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import { foodImages } from "../../assets/assets";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    user,          // basic user from context
    updateUser,    // function to update user in context
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(false);

  // Fetch full user profile (including id) on mount or when user.email changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.email) {
        setLoadingUser(true);
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/get-profile/?email=${encodeURIComponent(user.email)}`);
          if (response.data?.id) {
            updateUser(response.data);  // Update context user with full profile (including id)
          }
        } catch (error) {
          console.error("Failed to fetch full user profile:", error);
        } finally {
          setLoadingUser(false);
        }
      }
    };
    fetchUserProfile();
  }, [user?.email, updateUser]);

  const cartIsEmpty = Object.values(cartItems).every(qty => qty === 0);

  const handleCheckout = async () => {
    if (loadingUser) {
      alert("Loading user info, please wait.");
      return;
    }

    if (!user || !user.id) {
      alert("Please log in before placing an order.");
      return;
    }

    const orderDetails = food_list
      .filter(item => {
        const id = String(item.item_id || item._id);
        return cartItems[id] > 0;
      })
      .map(item => {
        const id = String(item.item_id || item._id);
        return {
          item_id: item.item_id || item._id,
          quantity: cartItems[id],
          price: item.price,
        };
      });

    if (orderDetails.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalAmount = getTotalCartAmount() + 2; // add delivery fee here

    const payload = {
      customer_id: user.id,  // use updated id from profile
      total_amount: totalAmount,
      order_details: orderDetails,
    };
    console.log("Order payload:", payload);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/create_order/", payload);
      if (res.status === 201) {
        alert("Order placed successfully!");
        navigate("/order");
      } else {
        alert("Something went wrong while placing your order.");
      }
    } catch (error) {
  if (error.response) {
    console.error("Backend error response:", error.response.data);
    alert("Failed to place order: " + JSON.stringify(error.response.data));
  } else {
    console.error("Error during checkout:", error);
    alert("Failed to place order.");
  }
}
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-header">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {cartIsEmpty ? (
          <p style={{ textAlign: "center", padding: "1rem" }}>Your cart is empty.</p>
        ) : food_list.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem" }}>Loading menu items...</p>
        ) : (
          food_list.map(item => {
            const id = String(item.item_id || item._id);
            if (cartItems[id] > 0) {
              const itemName = item.name || item.item_name;
              const itemImage = foodImages[itemName] || item.image;
              return (
                <React.Fragment key={id}>
                  <div className="cart-items-item">
                    <img src={itemImage} alt={itemName} className="cart-item-image" />
                    <p>{item.name || item.item_name}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <p>{cartItems[id]}</p>
                    <p>${(item.price * cartItems[id]).toFixed(2)}</p>
                    <p className="cross" onClick={() => removeFromCart(id)}>x</p>
                  </div>
                  <hr />
                </React.Fragment>
              );
            }
            return null;
          })
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs{getTotalCartAmount() === 0 ? "0.00" : "50.00"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs{getTotalCartAmount() === 0 ? "0.00" : (getTotalCartAmount() + 50).toFixed(2)}</b>
            </div>
          </div>
          <button onClick={handleCheckout} disabled={cartIsEmpty || loadingUser}>
            {loadingUser ? "Loading user info..." : "PROCEED TO CHECKOUT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
