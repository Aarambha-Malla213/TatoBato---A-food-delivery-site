import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AboutUs from '../../components/About Us/AboutUs'

const Home = () => {

  const [category, setCategory] = React.useState('All')

  return (
    <div>
      <Header />
      <Menu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AboutUs />
    </div>
  )
}

export default Home