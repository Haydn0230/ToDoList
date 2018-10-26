import React, { Component } from '../../node_modules/react';
import axios from 'axios';
import {setUserId, setCookies} from '../actions'
import store from '../store'
import {Redirect} from 'react-router-dom'
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
            store.dispatch(setCookies(res.data.token))
            // cookie.set('token', res.data.token, {
            //     maxAge:3600,
            //     path:'/'
            // });
            
            store.dispatch(setUserId(res.data.userId));
            //console.log("---------",this.props.cookies.navigation)
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

export default LogIn;