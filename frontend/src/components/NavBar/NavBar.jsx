import React, { useContext } from 'react';
import './NavBar.css';
import { ShoppingCart, User } from "phosphor-react";
import { FaSearch } from 'react-icons/fa';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext';

const NavBar = ({ setShowLogin }) => {
    const { token, setToken } = useContext(MenuContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <h1>CAFE 47</h1>
                    </Link>
                </div>
                
                <div className="nav-links">
                    <ul>
                        <li>
                            <Link to="/cart" className="cart-icon">
                                <ShoppingCart size={32} />
                            </Link>
                        </li>
                        {!token ? (
                            <li>
                                <button className="signin-btn" onClick={() => setShowLogin(true)}>Sign In</button>
                            </li>
                        ) : (
                            <div className="navbar-profile">
                                <User size={32} />
                                <div className="drop">
                                    <ul className="nav-profile-dropdown">
                                        <li onClick={() => navigate('/myorders')}>
                                            <img src={assets.bag_icon} alt="Orders" />
                                            <p>Orders</p>
                                        </li>
                                        <li onClick={logOut}>
                                            <img src={assets.logout_icon} alt="Log Out" />
                                            <p>Log Out</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
