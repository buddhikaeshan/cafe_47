import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';


const Footer = () => {
    return (
        <div className='footer'>
            <div className="row ftr">
                <div className="col-md-6 frt-about">
                    <div className="logo-frt">
                        {/* <img src={assets.logo} alt="Logo" /> */}
                        <h1 className='text-light'>CAFE 47</h1>
                    </div>
                    <p className="mt-4 p-4">
                        "<b>Indulge in every sip at Cafe 47!</b>
                        From <b>rich, aromatic coffee</b> to <b>refreshing handcrafted drinks</b>, we bring you the perfect blend of flavor and comfort.
                        <b>Sit back, sip, and enjoy the moment!</b>"
                    </p>
                </div>
                <div className="col-md-6 mt-4 p-4 links">
                    <h4>contact</h4>
                    <a className="" href="">+94 75 345 3456</a>
                    <a className="" href=""></a>
                    <a className="" href=""></a>
                    <a className="" href=""></a>
                </div>
            </div>
        </div>
    )
}

export default Footer