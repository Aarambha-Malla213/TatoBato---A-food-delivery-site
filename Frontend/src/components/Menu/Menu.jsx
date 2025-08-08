import React, { useEffect, useState } from "react";
import "./Menu.css";
import { restaurantImages } from "../../assets/assets";

const getImageKey = (filename) => {
  // convert .jpg backend names to .png where applicable
  if (filename === "menu_4.jpg") return "menu_4.png";
  if (filename === "menu_6.jpg") return "menu_6.png";
  return filename;
};


const Menu = ({ category, setCategory }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
fetch("http://localhost:8000/api/restaurants/")
    .then((res) => {
      console.log("Fetch response status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Fetched restaurants:", data);
      setRestaurants(data);
    })
    .catch((err) => console.error("Error fetching restaurants:", err))
    .finally(() => setLoading(false));
}, []);

  if (loading) return <div className="menu"><h3>Loading...</h3></div>;

  return (
    <div className="menu" id="menu">
      <hr />
      <h1>Explore our restaurants</h1>
      <div className="menu-list">
        {restaurants.map((item) => (
          <div
            key={item.restaurant_id}
            onClick={() =>
              setCategory((prev) =>
                prev === item.name ? "All" : item.name
              )
            }
            className="menu-item"
            data-location={item.location}
            data-contact={item.contact}
          >
            <img
      className={category === item.name ? "active" : ""}
      src={restaurantImages[getImageKey(item.restaurant_image)]}
      alt={item.name}
    />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Menu;
