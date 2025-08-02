// components/PrivateRoute.js
import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(StoreContext); 

  return user && user.email ? children : <Navigate to="/login" />;
};

export default PrivateRoute;