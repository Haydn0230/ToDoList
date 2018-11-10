import React from 'react';
import '../styles/navIcon.css'

//burger menu icon
const NavIcon = props =>(
    <button className='navIcon-btn' onClick={props.toggleSideBar}>
        <div className='navIcon-btn-line'/>
        <div className='navIcon-btn-line'/>
        <div className='navIcon-btn-line'/>
    </button>
)

export default NavIcon