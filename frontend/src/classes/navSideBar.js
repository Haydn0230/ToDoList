import React, { Component } from 'react';
import '../styles/sideBar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//side bar adapted from https://www.youtube.com/watch?v=l6nmysZKHFU

class SideBar extends Component {

    LogOut = () => {

        //reset the session data in redux
        this.props.setAuth(false);
        this.props.updateProjectAll([]);
        this.props.deleteUserSession(undefined);
        this.props.setCookies(undefined);
        this.props.setUser(undefined);
        this.props.updateProjectOne([]);
        this.props.setLoading(true);
    }

    //checks if the user is auth and changes menu 
    render() {
        const { isAuth } = this.props;
        return (
            <nav className='side-bar'>
                <ul className='side-bar-ul'>
                    <li><Link to='/Home'>Home</Link></li>
                    <li><Link to='/Project'>Projects</Link></li>
                    {isAuth ? (
                        <React.Fragment>
                            <li>
                                <Link to='/Account'>Account</Link>
                            </li>
                            <li>
                                <Link to='/Home'>
                                    <button className='navBar-btn' onClick={this.LogOut}>Log Out</button>
                                </Link>

                            </li>

                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <li><Link to='/login'>Log In</Link></li>
                                <li><Link to='/SignUp'>Sign Up</Link></li>
                            </React.Fragment>
                        )}

                </ul>

            </nav>
        )
    }


}

//get values from store
const mapStateToProps = (state) => {
    return ({
        projectAll: state.projectAll,
        projectOne: state.projectOne,
        isAuth: state.isAuth
    });
};

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectAll: (projectAll) => { dispatch({ type: 'SET_PROJECT_ALL', projectAll }) },
        setAuth: (isAuth) => { dispatch({ type: 'SET_AUTHENTICATION', isAuth }) },
        deleteUserSession: (userId) => { dispatch({ type: 'SET_USER_ID', userId }) },
        setUser: (user) => { dispatch({ type: 'SET_USER', user }) },
        updateProjectOne: (projectId) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectId }) },
        setCookies: (cookies) => { dispatch({ type: 'SET_COOKIES', cookies }) },
        setLoading: (isLoadingProject) => { dispatch({ type: 'SET_LOADING', isLoadingProject }) }
    }
};

//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);