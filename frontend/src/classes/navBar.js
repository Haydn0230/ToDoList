import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import store from '../store'
//import {setAuth} from '../actions'
//import setUserId from '../actions';
import {connect} from 'react-redux';
import NavIcon from './navIcon';

class NavBar extends Component {

    LogOut = () => {
        //store.dispatch(setAuth(false));
        //reset the session data in redux
        this.props.setAuth(false);
        this.props.updateProjectAll([]);
        this.props.deleteUserSession(undefined);
        this.props.setCookies(undefined);
        this.props.setUser(undefined);
        this.props.updateProjectOne([]);
        this.props.setLoading(true);
    }

    componentDidUpdate = () => {
        //store.getState().userId
    }

    render() {
        const isAuth = this.props.isAuth;
        return (
            <div className="navBar">
             <NavIcon /> 
            <div className='navBar-logo'>
                Whats to do?
            </div>
            <div className='spacer' />
                <ul className ='navBar-ul'>
                    <li><Link to='/Home'>Home</Link></li>
                    <li><Link to='/Project'>Projects</Link></li>
                    {isAuth ? (
                        <li>
                            <Link to='/Home'>
                                <button className='navBar-btn'onClick={this.LogOut}>Log Out</button>
                            </Link>

                        </li>
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

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);