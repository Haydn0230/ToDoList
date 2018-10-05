import React, { Component } from '../node_modules/react';

class LogIn extends Component{
    constructor() {
        super();
        this.state={};
    }


    render() {
        return (
            <div className="logIn">
            <form>
                <label for='userName'/>
                <input type='text' id='userName'/>
                <label for ='password'/>
                <input type ='text' id='password'/>
                <button type='button'>Log In</button>
            </form>
            </div>
        )
    }
}

export default LogIn;