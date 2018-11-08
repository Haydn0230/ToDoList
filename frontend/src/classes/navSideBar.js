import React, {Component} from 'react';
import '../styles/sideBar.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class SideBar extends Component {
render () {
    const {isAuth} =this.props.isAuth;
    return (
    <nav className='side-bar'>
        <ul className='side-bar-ul'>
            <li><Link to='/Home'>Home</Link></li>
            <li><Link to='/Project'>Projects</Link></li>
            {isAuth ? (
                <li>
                    <Link to='/Home'>
                        <button className='side-bar-btn' onClick={this.LogOut}>Log Out</button>
                    </Link>

                </li>
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
const mapStateToProps = (state ) => {
    return ({
      projectAll:state.projectAll,
      projectOne:state.projectOne,
      isAuth:state.isAuth
    });
  };
  
  const mapDispatchToProps =(dispatch) => {
    return {
        updateProjectAll:(projectAll) => {dispatch({type:'SET_PROJECT_ALL',projectAll})},
        setAuth:(isAuth) =>{dispatch({type:'SET_AUTHENTICATION', isAuth})},
        deleteUserSession:(userId) => {dispatch({type:'SET_USER_ID', userId})},
        setUser: (user) => { dispatch({ type: 'SET_USER', user }) },
        updateProjectOne:(projectId) => {dispatch({type:'UPDATE_PROJECT_ONE',projectId})},
        setCookies: (cookies) => { dispatch({ type: 'SET_COOKIES', cookies }) },
        setLoading:(isLoadingProject) => {dispatch({type:'SET_LOADING',isLoadingProject })}
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);