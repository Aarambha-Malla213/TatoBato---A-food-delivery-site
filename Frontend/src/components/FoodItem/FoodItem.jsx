import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, restaurant }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  console.log("FoodItem - cartItems:", cartItems); // <--- Add this line

  const itemId = String(id);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[itemId] ? (
          <img
            className="add"
            onClick={() => addToCart(itemId)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-count">
            <img
              onClick={() => removeFromCart(itemId)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[itemId]}</p>
            <img
              onClick={() => addToCart(itemId)}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <p className="food-item-name">{name}</p>
      {restaurant && <p className="food-item-restaurant">From: {restaurant}</p>}
      <div className="food-item-details">
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};




export default FoodItem;
