import { useState } from 'react'
import './MyOrders.css'
import React from 'react'
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext'
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const { url, token } = useContext(MenuContext)
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data.reverse());
        console.log(response.data.data);
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {

        }
    }, [token])

    return (
        <div>
            <div className="my-orders">
                <h2>My Orders</h2>

                <div className="container">
                    {data.map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.item.map((item, index) => {
                                    if (index === order.item.length - 1) {
                                        return item.name+"-"+item.size  + " x " + item.quantity
                                    } else {
                                        return item.name+"-"+item.size  + " x " + item.quantity + ", "
                                    }
                                })}</p>
                                <p>Rs. {order.amount}.00</p>
                                <p>Items: {order.item.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyOrders;
