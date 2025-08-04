import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditProfile.css'
import { StoreContext } from '../../context/StoreContext'

const EditProfile = () => {
  const { user, updateUser } = useContext(StoreContext)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Here you would typically make an API call to update the user
      // For now, we'll just update the context
      if (updateUser) {
        await updateUser(formData)
      }
      
      // Navigate back to profile page
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = () => {
    navigate('/profile')
  }
  
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <h1>Edit Profile</h1>
      </div>
      
      <div className="edit-profile-content">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter your address"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
