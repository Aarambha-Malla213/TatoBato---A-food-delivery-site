import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './profile.css'
import { StoreContext } from '../../context/StoreContext'

const Profile = () => {
  const { user, logoutUser, updateUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      // Only fetch if user exists and we don't have complete data yet
      if (user?.email && (!user.address || !user.phoneNumber)) {
        setLoading(true);
        setError('');
        
        try {
          const response = await axios.get(`http://localhost:8000/api/get-profile/?email=${encodeURIComponent(user.email)}`);
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
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleLogout = () => {
    logoutUser();
    navigate('/'); // Redirect to homepage after logout
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
            <p>No orders yet</p>
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
  )
}

export default Profile
