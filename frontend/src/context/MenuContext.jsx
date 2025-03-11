import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const MenuContext = createContext(null);

const MenuContextProvider = (props) => {
    // Modified cartItems structure to include size
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [foodlist, setFoodList] = useState([]);

    const addToCart = async (itemId, size) => {
        const cartKey = `${itemId}-${size}`; // Create unique key for item+size combination

        if (!cartItems[cartKey]) {
            setCartItems((prev) => ({ ...prev, [cartKey]: { quantity: 1, size } }));
        } else if (cartItems[cartKey].quantity > 49) {
            alert(`You can only add 50 items`);
            return;
        } else {
            setCartItems((prev) => ({
                ...prev,
                [cartKey]: {
                    ...prev[cartKey],
                    quantity: prev[cartKey].quantity + 1
                }
            }));
        }

        const token = localStorage.getItem("token");

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`,
                    { itemId, size },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error("Error adding to cart:", error);
                alert("Error adding item to cart");
            }
        } else {
            alert("You must be logged in to add items to the cart.");
        }
    };

    const removeFromCart = async (itemId, size) => {
        const cartKey = `${itemId}-${size}`;

        setCartItems((prev) => ({
            ...prev,
            [cartKey]: {
                ...prev[cartKey],
                quantity: prev[cartKey].quantity - 1
            }
        }));

        if (token) {
            await axios.post(url + "/api/cart/remove",
                { itemId, size },
                { headers: { token } }
            );
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const cartKey in cartItems) {
            if (cartItems[cartKey].quantity > 0) {
                const [itemId] = cartKey.split('-');
                const itemInfo = foodlist.find((product) => product._id === itemId);

                if (itemInfo) {
                    let adjustedPrice = parseFloat(itemInfo.price); // Base price
                    const size = cartItems[cartKey].size;

                    // Apply size adjustments
                    if (size === "Small") {
                        adjustedPrice -= adjustedPrice * 0.25; // Reduce 10%
                    } else if (size === "Large") {
                        adjustedPrice += adjustedPrice * 0.25; // Add 10%
                    }


                    totalAmount += adjustedPrice * cartItems[cartKey].quantity;
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            console.log('Food list response:', response.data);
            setFoodList(response.data.data || []);
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    };

    const loadCartData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Cart data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    };


    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
        console.log(foodlist);
    }, []);


    const contextValue = {
        foodlist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <MenuContext.Provider value={contextValue}>
            {props.children}
        </MenuContext.Provider>
    )
}
export default MenuContextProvider;