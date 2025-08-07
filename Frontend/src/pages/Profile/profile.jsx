import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import { StoreContext } from '../../context/StoreContext'

const Profile = () => {
  const { user, logoutUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>
      
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
            <p>No addresses saved</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
