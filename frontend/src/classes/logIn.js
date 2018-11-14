import React, { Component } from '../../node_modules/react';
import axios from 'axios';
import { connect } from 'react-redux'
import { validation } from '../utils'

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }


    //gets user inputs and writes to state
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        //verification of inputs 
        const errors = validation(this.state)

        //if inputs arent populated throw error message
        if (errors !== '') {
            this.setState({
                errorMessage: errors + ' required'
            })
            return
        }

        axios.post('/verify', {
            "email": this.state.email,
            "password": this.state.password
        })
            .then((res) => {
                //create new session data 
                this.props.setCookies(res.data.token)
                this.props.setAuth(true)
                this.props.setUserId(res.data.user._id)
                this.props.setUser(res.data.user)
                this.props.setLoading(true);

                this.props.history.push('/Project', { userId: res.data.user._id })

            })
            .catch((err) => {
                if (err.response.status === 400 || err.response.status === 401) {
                    this.setState({
                        errorMessage: 'Username or/and password not recognised'
                    })
                }
                console.log(err);
            })
    }

    render() {
        const { errorMessage } = this.state
        return (
            <div className="logIn">
                <form>
                    <span className='logIn-block'>
                        <label htmlFor="userName" >Username</label>
                        <input type='text' id='email' name="email" onChange={this.handleChange} className='logIn-input' />
                    </span>

                    <span className='logIn-block'>
                        <label htmlFor='password' >Password</label>
                        <input type='password' id='password' name="password" onChange={this.handleChange} className='logIn-input' />
                    </span>

                    {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}
                    <button onClick={this.handleSubmit} type='button' className='btn-save'>Log In</button>
                </form>
            </div>
        )
    }
}
//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        setCookies: (cookies) => { dispatch({ type: 'SET_COOKIES', cookies }) },
        setUserId: (userId) => { dispatch({ type: 'SET_USER_ID', userId }) },
        setUser: (user) => { dispatch({ type: 'SET_USER', user }) },
        setAuth: (isAuth) => { dispatch({ type: 'SET_AUTHENTICATION', isAuth }) },
        setLoading: (isLoadingProject) => { dispatch({ type: 'SET_LOADING', isLoadingProject }) }
    }
}
//get values from store
const mapStateToProps = (state) => {
    return ({
        userId: state.userId,
        user: state.user,
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
}
//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(LogIn)