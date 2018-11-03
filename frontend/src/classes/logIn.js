import React, { Component } from '../../node_modules/react';
import axios from 'axios';
import {setUserId, setCookies, setAuth} from '../actions'
import store from '../store'
import {connect} from 'react-redux'
//import {Redirect} from 'react-router-dom'
//import cookie from 'react-cookie';

class LogIn extends Component{
    constructor() {
        super();
        this.state={
            email:'',
            password:''
        };
    }

    

    handleChange = event => {
        this.setState({
            [event.target.id]:event.target.value
        });
    }
    handleSubmit = event => {
         //const {cookies} = this.props.cookies.cookies;
        //console.log("LOGIN",cookie)
        event.preventDefault();
        axios.post('/verify',{
            "email": this.state.email,
            "password": this.state.password
        })
        .then((res)=>{
            this.props.setCookies(res.data.token)
            this.props.setAuth(true)
            this.props.setUserId(res.data.user._id)
            this.props.setUser(res.data.user)
           console.log("user -", res.data)
            this.props.history.push('/Project');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div className="logIn">
            <form>
                <label htmlFor="userName"/>
                <input type='text' id='email' name="email" onChange={this.handleChange}/>
                <label htmlFor ='password'/>
                <input type ='password' id='password' name="password" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit} type='button'>Log In</button>
            </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCookies: (cookies) => { dispatch({ type: 'SET_COOKIES', cookies }) },
        setUserId: (userId) => { dispatch({ type: 'SET_USER_ID', userId }) },
        setUser: (user) => { dispatch({ type: 'SET_USER', user }) },
        setAuth: (isAuth) => { dispatch({ type: 'SET_AUTHENTICATION', isAuth }) }    }
}

const mapStateToProps = (state) => {
    return ({
        user:state.user,
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
}
export default connect(mapStateToProps,mapDispatchToProps)(LogIn)