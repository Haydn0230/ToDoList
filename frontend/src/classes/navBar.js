import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import NavIcon from './navIcon';

class NavBar extends Component {

    //reset the session data in redux
    LogOut = () => {
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
        const isAuth = this.props.isAuth;
        return (
            <div className="navBar">
                <NavIcon toggleSideBar={this.props.toggleSideBar} />
                <div className='navBar-logo'>
                    <p> Whats to do?</p>
                </div>
                <div className='spacer' />
                <ul className='navBar-ul'>
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

            </div>
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
}

//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);