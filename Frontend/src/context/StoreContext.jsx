import { createContext } from "react";
import React, { useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

import { food_list } from "../assets/assets";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = React.useState({});
  const [showLogin, setShowLogin] = React.useState(() => {
    // Show login popup automatically if user is not logged in
    return localStorage.getItem('isLoggedIn') !== 'true';
  });
  const [showContactUs, setShowContactUs] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
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

  const updateUser = useCallback((userData) => {
    setUser(currentUser => {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    return Promise.resolve(); // Return a promise for the EditProfile component
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
      setSearchResults(data);
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

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
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
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
