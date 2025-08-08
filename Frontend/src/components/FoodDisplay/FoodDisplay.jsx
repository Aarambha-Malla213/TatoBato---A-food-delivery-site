// FoodDisplay.jsx
import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem.jsx";
import { foodImages } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch food list from backend API
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/menu-items/");
        if (!response.ok) throw new Error("Failed to fetch food items");
        const data = await response.json();
        setFoodList(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodList();
  }, []);

  if (loading) return <div>Loading food items...</div>;

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes</h2>
      <div className="food-display-list">
        {foodList.map((item) => {
          // Filter by category (restaurant name) or show all if category is "All"
          if (category === "All" || category === item.restaurant_name) {
            return (
              <FoodItem
                key={item.item_id}
                id={item.item_id}
                name={item.item_name}
                description={item.description}
                price={item.price}
                image={foodImages[item.item_name] || null} // fallback null if no image
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
