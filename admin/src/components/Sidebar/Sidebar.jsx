import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import {BarChart3, ClipboardSignature, Eye} from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/dashboard' className="sidebar-option">
          {/* <img src={assets.order_icon} alt="" /> */}
          <BarChart3/>
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Food</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Food list</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/cancel' className="sidebar-option">
          {/* <img src={assets.order_icon} alt="" /> */}
          <ClipboardSignature/>
          <p>Cancel Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar