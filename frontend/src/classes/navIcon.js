import React from 'react';
import '../styles/navIcon.css'
const NavIcon = props =>(
    <button className='navIcon-btn' onClick={props}>
        <div className='navIcon-btn-line'/>
        <div className='navIcon-btn-line'/>
        <div className='navIcon-btn-line'/>
    </button>
)
export default NavIcon