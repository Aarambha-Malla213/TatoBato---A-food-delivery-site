// FoodDisplay.jsx
import React, { useEffect, useState, useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem.jsx";
import { foodImages } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { API_BASE_URL } from "../../config/api";

const FoodDisplay = ({ category }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchResults, isSearchActive, clearSearch } = useContext(StoreContext);

  // Fetch food list from backend API
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/menu-items/`);
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

  // Determine which data to display
  const displayData = isSearchActive ? searchResults : foodList;
  const displayTitle = isSearchActive ? 
    (searchResults.length > 0 ? `Search Results (${searchResults.length})` : "No results found") :
    "Top dishes";

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <h2>{displayTitle}</h2>
        {isSearchActive && (
          <button 
            className="clear-search-btn"
            onClick={clearSearch}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Search
          </button>
        )}
      </div>
      <div className="food-display-list">
        {displayData.map((item) => {
          // If search is active, show all results
          // Otherwise, filter by category (restaurant name) or show all if category is "All"
          if (isSearchActive || category === "All" || category === item.restaurant_name) {
            return (
              <FoodItem
                key={item.item_id}
                id={item.item_id}
                name={item.item_name}
                description={item.description}
                price={item.price}
                image={foodImages[item.item_name] || null} // fallback null if no image
                restaurant={isSearchActive ? item.restaurant_name : null}
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
