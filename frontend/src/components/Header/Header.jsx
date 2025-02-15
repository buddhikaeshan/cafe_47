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
                        Welcome to <b>Cafe 47</b>, your cozy retreat for premium coffee and handcrafted drinks. We believe that every cup tells a story, and we are here to serve you the finest brews made from carefully selected beans. Whether you need a morning espresso, a creamy latte, or a refreshing iced drink, <b>Cafe 47</b> is the perfect place to relax and recharge.
                    </p>
                </div>
                <div className="col-md-12 mt-3">
                    <h3>Who We Are</h3>
                    <p>
                        Established in 2020, <b>Cafe 47</b> was founded with a passion for exceptional coffee and warm hospitality. Our team of expert baristas and coffee enthusiasts is dedicated to crafting the perfect cup for every customer. We take pride in sourcing high-quality beans, experimenting with unique flavors, and creating a welcoming space where coffee lovers can unwind, work, or connect over a great drink.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Header