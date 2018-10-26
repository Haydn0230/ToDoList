import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import store from '../store'
//import setUserId from '../actions';

class NavBar extends Component {

    LogOut = (userId) => {
        console.log("LOGOUT FUN", this.props)
        this.props.deleteUserSession(userId);
        this.props.history.push('/Home');
    }
    componentDidUpdate = () => {
        //store.getState().userId
    }
    render() {
        let userId = store.getState().userId
        return (
            <div className="navBar">
                <ul>
                    {userId ? (
                        <li>
                            <Link to='/Home'>
                                <span onClick={this.LogOut}>
                                    Log out
                                </span>
                            </Link>
                        </li>
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