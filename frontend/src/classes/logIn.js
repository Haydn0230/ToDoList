import React, { Component } from '../../node_modules/react'

class LogIn extends Component{
    constructor() {
        super();
        this.state={};
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('../../../backend/server.js')
        .then((data)=>{
            return data.json
        }
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