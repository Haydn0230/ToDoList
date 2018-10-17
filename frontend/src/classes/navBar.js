import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class NavBar extends Component {

    render() {
        
        return (
            <div className="navBar">
               <ul>
                   <li><Link to='/Home'>Home</Link></li>
                   <li><Link to='/Project'>Projects</Link></li>
                   <li><Link to='/login'>Log in</Link></li>
                </ul>
            </div> 
        )
    }
}

export default NavBar;