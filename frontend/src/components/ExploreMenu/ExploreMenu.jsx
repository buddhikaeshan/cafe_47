import React from 'react'
import './ExploreMenu.css'
import { menulist } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id='explore-menu'>
        <p></p>
        <div className="explore-menu-list">
            {menulist.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menuName?"All":item.menuName)} key={index} className="explore-menu-item">
                        <p className={category===item.menuName?"active":""}>{item.menuName}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu