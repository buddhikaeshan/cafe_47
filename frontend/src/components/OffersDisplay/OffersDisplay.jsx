import React, { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import OffersItem from '../OffersItem/OffersItem';

const OffersDisplay = ({ category }) => {
    const { foodlist } = useContext(MenuContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Shop</h2>
            <div className="food-display-list">
                {foodlist
                .filter(item => item.type === "offer")
                .map((item, index) => {
                        return <OffersItem key={index} id={item._id} name={item.name} description={item.description} starDate={new Date(item.startDate).toISOString().split('T')[0]} endDate={new Date(item.endDate).toISOString().split('T')[0]} price={item.price} image={item.image} />
                    
                })}
            </div>
        </div>
    );
}

export default OffersDisplay;
