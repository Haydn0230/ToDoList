import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import store from '../store'
import {setAuth} from '../actions'
//import setUserId from '../actions';

class NavBar extends Component {

    LogOut = () => {
        store.dispatch(setAuth(false));
    }
    componentDidUpdate = () => {
        //store.getState().userId
    }
    render() {
        const isAuth = store.getState().isAuth
        return (
            <div className="navBar">
                <ul>
                    {isAuth ? (
                        <li>
                            <Link to='/Home'>
                                <button onClick={this.LogOut}>Log Out</button>
                            </Link>
                        </li>
                    ) : (
                            <li><Link to='/login'>Log In</Link></li>
                        )}
                    <li><Link to='/Home'>Home</Link></li>
                    <li><Link to='/Project'>Projects</Link></li>
                </ul>
            </div>
        )
    }
}



export default NavBar;