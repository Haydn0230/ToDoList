import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import _ from 'lodash'
import {validation} from '../utils'

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeat_password: '',
            errorMessage: ''
        }


    }


    validation = () => {
        //set containers 
        let error = '';
        
        //loop through state to check all fields contain data
        const object = this.state
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                if (element === '' && key !== 'errorMessage') {
                    if (error ==='' ){
                        error += _.startCase(key)
                    } else {
                        error += ' and ' +_.startCase(key)
                    }
                }
            }
        }
        return error
    }

    handleChange = event => {
        //grab value from target event
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        //check if passwords match
        const { password, repeat_password } = this.state
        if (password !== repeat_password) {
            this.setState({
                errorMessage: 'Passwords must match'
            });
            return
        }

        //verification goes here
        const errors = validation(this.state)
        if (errors !== '') {
            this.setState({
                errorMessage:errors + ' required'
            })
            return
        }

        //intialize data to be sent from state
        let data = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'password': this.state.password
        }


        //configure authentication token
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        axios.post('/addUser', data, config)
            .then((res) => {
                //set session data for the user logging them in
                this.props.setCookies(res.data.token)
                this.props.setAuth(true)
                this.props.setUserId(res.data.user._id)
                this.props.setUser(res.data.user)

                this.props.history.push('/project');
            })
            .catch((err) => {
                console.log(err);
            })

    }
    render() {
        const { errorMessage } = this.state
        return (
            <div className='sign-up'>
                <h1>Sign up </h1>
                <form>
                    <span className='sign-up-block'>
                    <label htmlFor='firstName' >FirstName</label>
                    <input type='text' id='firstName' name="firstName" onChange={this.handleChange} className='sign-up-input'/>
                    </span>

                    <span className='sign-up-block'>
                    <label htmlFor='lastName' >LastName</label>
                    <input type='text' id='lastName' name="lastName" onChange={this.handleChange} className='sign-up-input'/>
                    </span>

                    <span className='sign-up-block'>
                    <label htmlFor='email' >Email</label>
                    <input type='text' id='email' name="email" onChange={this.handleChange} className='sign-up-input'/>
                    </span>

                    <span className='sign-up-block'>
                    <label htmlFor='password' >Password</label>
                    <input type='password' id='password' name="password" onChange={this.handleChange} className='sign-up-input'/>
                    </span>

                    <span className='sign-up-block'>
                    <label htmlFor='repeat_password' >Repeat Password</label>
                    <input type='password' id='repeat_password' name="repeat_password" onChange={this.handleChange} className='sign-up-input'/>
                    </span>

                    {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}
                    <button onClick={this.handleSubmit} type='button' className='btn-save' >Sign Up</button>

                </form>


                <div>
                </div>
            </div>
        )
    }
}

//create methods to change store
const mapDispatchToProps = (dispatch) => {
    return {
        setCookies: (cookies) => { dispatch({ type: 'SET_COOKIES', cookies }) },
        setUserId: (userId) => { dispatch({ type: 'SET_USER_ID', userId }) },
        setUser: (user) => { dispatch({ type: 'SET_USER', user }) },
        setAuth: (isAuth) => { dispatch({ type: 'SET_AUTHENTICATION', isAuth }) }
    }
}

//create connections to store
const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)