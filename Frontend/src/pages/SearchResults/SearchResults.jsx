import React, { useContext } from 'react';
import './SearchResults.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const { searchResults, isSearchActive, clearSearch, searchQuery } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleClearSearch = () => {
    clearSearch();
    navigate('/');
  };

  if (!isSearchActive) {
    navigate('/');
    return null;
  }

  return (
    <div className="search-results">
      <div className="search-results-header">
        <h2>Search Results for "{searchQuery}"</h2>
        <button 
          className="clear-search-btn"
          onClick={handleClearSearch}
        >
          Back to Home
        </button>
      </div>

      {searchResults.length === 0 ? (
        <div className="no-results">
          <h3>No items found</h3>
          <p>Try searching for something else</p>
          <button 
            className="browse-menu-btn"
            onClick={handleClearSearch}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="search-results-grid">
          {searchResults.map((item) => (
            <FoodItem
              key={item.item_id}
              id={item.item_id}
              name={item.item_name}
              description={item.description}
              price={item.price}
              image={item.image}
              restaurant={item.restaurant_name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
