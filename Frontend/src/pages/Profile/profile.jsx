import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './profile.css'
import { StoreContext } from '../../context/StoreContext'
import { API_BASE_URL } from '../../config/api'

const Profile = () => {
  const { user, logoutUser, updateUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) {
        console.warn("No email in user context yet, skipping fetch.");
        return;
      }

      console.log("Fetching data for email:", user.email);

      // Fetch profile if needed
      if (!user.address || !user.phoneNumber) {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/get-profile/?email=${encodeURIComponent(user.email)}`
          );
          updateUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 404) {
            setError('User profile not found');
          } else {
            setError('Failed to load profile data');
          }
        } finally {
          setLoading(false);
        }
      }

      // Fetch order history
      setOrderLoading(true);
      setOrderError('');
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/order-history/?email=${encodeURIComponent(user.email)}`
        );
        console.log("Order history response:", res.data);
        setOrderHistory(res.data);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setOrderError('Failed to load order history.');
      } finally {
        setOrderLoading(false);
      }
    };

    fetchData();
  }, [user?.email, user?.address, user?.phoneNumber, updateUser]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        <div className="profile-content">
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {error && (
        <div className="error-message">
          <p style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>{error}</p>
        </div>
      )}

      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-picture">
            <div className="profile-pic-placeholder">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>

          <div className="profile-details">
            <h2>{user?.name || 'User Name'}</h2>
            <p className="profile-email">{user?.email || 'user@example.com'}</p>
            <p className="profile-phone">
              <strong>Phone:</strong> {user?.phoneNumber || 'Phone not provided'}
            </p>
            <p className="profile-address">
              <strong>Address:</strong> {user?.address || 'Address not provided'}
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/profile/edit" className="edit-profile-btn">Edit Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="profile-sections">
          <div className="section">
            <h3>Order History</h3>
            {orderLoading ? (
              <p>Loading orders...</p>
            ) : orderError ? (
              <p style={{ color: 'red' }}>{orderError}</p>
            ) : orderHistory.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orderHistory.map(order => (
                <div key={order.order_id} className="order-item" style={{marginBottom: '1rem'}}>
                  <h4>
                    Order #{order.order_id} - {new Date(order.order_date).toLocaleDateString()}
                  </h4>
                  <p><strong>Total:</strong> Rs {order.total_amount.toFixed(2)}</p>
                  <ul style={{ paddingLeft: '1.25rem' }}>
                    {order.items.map(item => (
                      <li key={item.item_id ?? Math.random()}>
                        {item.item_name} x {item.quantity} @ Rs {item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

          <div className="section">
            <h3>Favorite Foods</h3>
            <p>No favorites yet</p>
          </div>

          <div className="section">
            <h3>Delivery Addresses</h3>
            {user?.address ? (
              <div className="address-item">
                <p><strong>Primary Address:</strong></p>
                <p>{user.address}</p>
              </div>
            ) : (
              <p>No addresses saved</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
