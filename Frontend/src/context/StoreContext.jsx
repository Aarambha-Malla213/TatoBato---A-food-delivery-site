import React, { createContext, useState, useEffect, useCallback } from "react";
import { foodImages } from "../assets/assets"; // Import images map

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [showLogin, setShowLogin] = useState(() => localStorage.getItem('isLoggedIn') !== 'true');
  const [showContactUs, setShowContactUs] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fetch menu items from backend and assign local images
  useEffect(() => {
    async function fetchFoodList() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/menu-items/");
        if (!res.ok) throw new Error("Failed to fetch menu items");
        const data = await res.json();

        // Map local images by matching food name
        const foodWithImages = data.map(item => ({
          ...item,
          image: foodImages[item.name] || null, // fallback null if image missing
        }));

        setFoodList(foodWithImages);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    }
    fetchFoodList();
  }, []);

  const addToCart = (itemId) => {
    const id = String(itemId);
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    const id = String(itemId);
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const newQty = prev[id] - 1;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const qty = cartItems[id];
      if (qty > 0) {
        const itemInfo = food_list.find((item) => String(item.item_id || item._id) === id);
        if (itemInfo) totalAmount += itemInfo.price * qty;
      }
    }
    return totalAmount;
  };

  const loginUser = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  // Updated updateUser to normalize user id from pk or _id if id not present
  const updateUser = useCallback((userData) => {
    const normalizedUserData = { ...userData };

    // Normalize ID fields from common backend user id keys
    if (userData.pk && !userData.id) normalizedUserData.id = userData.pk;
    else if (userData._id && !userData.id) normalizedUserData.id = userData._id;

    setUser((currentUser) => {
      const updatedUser = { ...currentUser, ...normalizedUserData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });

    return Promise.resolve();
  }, []);

  const searchMenuItems = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search-menu-items/?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to search menu items");
      const data = await response.json();

      // Map images for search results also
      const resultsWithImages = data.map(item => ({
        ...item,
        image: foodImages[item.name] || null,
      }));

      setSearchResults(resultsWithImages);
      setIsSearchActive(true);
    } catch (error) {
      console.error("Error searching menu items:", error);
      setSearchResults([]);
      setIsSearchActive(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setIsSearchActive(false);
  };

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        showLogin,
        setShowLogin,
        showContactUs,
        setShowContactUs,
        isLoggedIn,
        user,
        loginUser,
        logoutUser,
        updateUser,
        searchResults,
        isSearchActive,
        searchMenuItems,
        clearSearch,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
