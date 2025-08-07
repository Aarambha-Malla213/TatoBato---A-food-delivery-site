// components/PrivateRoute.js
import React from 'react';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const PrivateRoute = ({ children }) => {
  const { user, setShowLogin } = useContext(StoreContext); 

  useEffect(() => {
    if (!user || !user.email) {
      setShowLogin(true);
    }
  }, [user, setShowLogin]);

  return user && user.email ? children : <Navigate to="/" />;
};

export default PrivateRoute;