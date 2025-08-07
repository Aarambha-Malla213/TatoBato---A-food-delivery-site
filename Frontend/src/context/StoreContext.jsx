import { createContext } from "react";
import React, { useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

import { food_list } from "../assets/assets";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = React.useState({});
  const [showLogin, setShowLogin] = React.useState(false);
  const [showContactUs, setShowContactUs] = React.useState(false);
  
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
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
