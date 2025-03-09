import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { BarChart3, CircleFadingPlus, ClipboardCheck, ClipboardSignature, ClipboardX, Eye, LayoutList, ListTodoIcon, MessageCircleMore, PlusCircle, PlusCircleIcon } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">

        <NavLink to='/dashboard' className="sidebar-option">
          <BarChart3 />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to='/add' className="sidebar-option">
          <PlusCircle />
          <p>Add Product</p>
        </NavLink>

        <NavLink to='/offers' className="sidebar-option">
          <CircleFadingPlus />
          <p>Add Offers</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <LayoutList />
          <p>Food list</p>
        </NavLink>

        <NavLink to='/offers-list' className="sidebar-option">
          <ListTodoIcon />
          <p>Offers list</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <ClipboardCheck />
          <p>Orders</p>
        </NavLink>

        <NavLink to='/cancel' className="sidebar-option">
          <ClipboardX />
          <p>Cancel Orders</p>
        </NavLink>

        <NavLink to='/review' className="sidebar-option">
          <MessageCircleMore />
          <p>Reviews</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar