import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AboutUs from '../../components/About Us/AboutUs'
import '../../components/About Us/AboutUs.css'
import { StoreContext } from '../../context/StoreContext'

const Home = () => {
  const { setShowContactUs } = React.useContext(StoreContext)
  const [category, setCategory] = React.useState('All')

  return (
    <div>
      <Header />
      <Menu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AboutUs />
      <div className="contact-us-section">
        <button className="contact-us-btn" onClick={() => setShowContactUs(true)}>
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default Home