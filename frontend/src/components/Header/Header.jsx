import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
    return (
        <div className="container-fluid header_bg">
            <div className="row">
                <div className="col-md-12">
                    <img className="banner-img img-fluid" src={assets.banner3} alt="" />
                </div>
            </div>

            <div className="row about">
                <div className="col-md-12 mt-3">
                    <h3>About Us</h3>
                    <p>
                        Welcome to EverGreen, your ultimate destination for effortless and delightful food ordering. Our mission is to connect food lovers with their favorite restaurants and dishes in the most convenient way possible. Whether you're craving a quick bite or planning a feast, EverGreen is here to make your dining experience seamless and enjoyable.</p>                </div>
                <div className="col-md-12 mt-3">
                    <h3>Who We Are</h3>
                    <p>
                    Founded in 2020, EverGreen was born out of a passion for food and technology. We are a team of food enthusiasts, tech experts, and customer service professionals dedicated to revolutionizing the way you order food. Our diverse backgrounds and shared love for culinary delights drive us to deliver exceptional service and innovative solutions.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header