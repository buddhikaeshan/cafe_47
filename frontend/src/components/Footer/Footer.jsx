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
                    <p className="mt-4 p-4">"Quench your thirst with convenience!
                        Explore our refreshing array of freshly squeezed juices, crafted with care and delivered straight to your doorstep. Sip, enjoy, repeat!"</p>
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