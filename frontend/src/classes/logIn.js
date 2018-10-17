import React, { Component } from '../../node_modules/react';
import axios from 'axios';

class LogIn extends Component{
    constructor() {
        super();
        this.state={
            email:"",
            password:""
        };
    }
    handleChange = event => {
        this.setState({
            [event.target.id]:event.target.value
        });
    }
    handleSubmit = event => {
        
        event.preventDefault();
        axios.post('/verify',{
            "email": this.state.email,
            "password": this.state.password
        })
        .then((res)=>{
            console.log("1",res);
            console.log("token-", res.data.token)
            
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