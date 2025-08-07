import React from "react";
import "./Menu.css";
import { restaurant_list } from "../../assets/assets";

const Menu = ({ category, setCategory }) => {
  return (
    <div className="menu" id="menu">
      <hr />
      <h1>Explore our restaurants</h1>
      <div className="menu-list">
        {restaurant_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.restaurant_name ? "All" : item.restaurant_name
              )
            }
            className="menu-item"
            data-location={item.location}
            data-contact={item.contact}
            key={index}
          >
            <img
              className={category === item.restaurant_name ? "active" : ""}
              src={item.restaurant_image}
              alt=""
            />
            <p data-location={item.location} data-contact={item.contact}>{item.restaurant_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Menu;
