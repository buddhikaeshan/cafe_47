import React from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import axios from 'axios';
import { useEffect } from 'react';

const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url}=useContext(MenuContext);
    const navigate =useNavigate();

    const verifyPayment=async()=>{
        const response =await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[verifyPayment]);

  return (
    <div>
        <div className="verify">
            <div className="spinner">

            </div>
        </div>
    </div>
  )
}


export default Verify;