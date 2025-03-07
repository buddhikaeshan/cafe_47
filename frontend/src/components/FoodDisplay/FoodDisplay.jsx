import React, { useContext } from 'react';
import './FoodDisplay.css';
import { MenuContext } from '../../context/MenuContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { foodlist } = useContext(MenuContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Shop</h2>
            <div className="food-display-list">
                {foodlist.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
