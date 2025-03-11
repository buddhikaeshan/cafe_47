import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'
import Comments from '../../components/Comments/Comments'
import OffersDisplay from '../../components/OffersDisplay/OffersDisplay'

const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
        <Header/>
        <OffersDisplay/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <Comments/>
        <Footer/>
    </div>
  )
}

export default Home