import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { MenuContext } from '../../context/MenuContext';

const OffersItem = ({ id, name, price, description, image ,starDate,endDate }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(MenuContext);
    const [size, setSize] = useState("Medium");

    const cartKey = `${id}-${size}`;
    const cartQuantity = cartItems[cartKey]?.quantity || 0;

    return (
        <div className="food-item">
            <div className="col-md">
                <div className="card crd">
                    <div id="salesLastYear">
                        <div className="row mt-2">
                            <div className="col- img-pos">
                                <img className="crd-img img-fluid" src={`${url}/images/${image}`} alt="" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md">
                                <div className="card-body pt-0">
                                    <div className="text-center">
                                        <p className="card-title mb-2">{name}</p>
                                        <p className='mb-0 food-p'>{description}</p>
                                        <p className='mb-0 food-p'>(End Date: {endDate})</p>
                                        <h4 className="mb-0 food-p text-light">Rs.{price}</h4>

                                        <div className="size-selection">
                                            <label htmlFor='size' className='text-light' >Size:</label>
                                            <select  className='form-contro text-center '
                                                value={size} 
                                                onChange={(e) => setSize(e.target.value)}
                                                id='size'
                                            >
                                                <option className='option' value="Small">Small</option>
                                                <option className='option' value="Medium">Medium</option>
                                                <option className='option' value="Large">Large</option>
                                            </select>
                                        </div>

                                        <div className="food-item-counter-pos">
                                            {!cartQuantity ? (
                                                <img 
                                                    className='add' 
                                                    onClick={() => addToCart(id, size)} 
                                                    src={assets.addIconWhite} 
                                                    alt="" 
                                                />
                                            ) : (
                                                <div className='food-item-counter'>
                                                    <img 
                                                        onClick={() => removeFromCart(id, size)} 
                                                        src={assets.removeIconRed} 
                                                        alt="" 
                                                    />
                                                    <p>{cartQuantity}</p>
                                                    <img 
                                                        onClick={() => addToCart(id, size)} 
                                                        src={assets.addIconGreen} 
                                                        alt="" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffersItem;