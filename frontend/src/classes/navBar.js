import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import store from '../store'
//import setUserId from '../actions';

class NavBar extends Component {

    render() {
        const {userId} = store.getState().userId
         console.log("userId", userId)
        return (
            <div className="navBar">
               <ul>
                    
                   {userId ? (
                       <li>Hello</li>
                   ) : (
                        <li><Link to='/login'>Log in</Link></li>
                   )}
                   
                   <li><Link to='/Home'>Home</Link></li>
                   <li><Link to='/Project'>Projects</Link></li>
                </ul>
            </div> 
        )
    }
}

export default NavBar;