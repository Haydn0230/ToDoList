import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { validation } from '../utils'

class AccountAdmin extends Component {
    constructor() {
        super()
        this.state = {
            errorMessage: ''
        }
    }

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

    handleChange = event => {
        //grab value from target event
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    //delete account
    handleDelete = e => {

        //configure authentication token
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        axios.delete('/user/' + this.props.userId, config)
            .then(() => {
                this.LogOut();
                this.props.history.push('/Home');
            })
            .catch((err) => {

            })
    }

    //hanlde edits 
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
                errorMessage: errors + ' required'
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

        axios.put('/user/'+this.props.userId, data, config)
            .then((res) => {
                //set session data for the user logging them in
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
            <div className='account-container'>
                <form>
                    <span className='account-block'>
                        <label htmlFor='firstName' >First Name</label>
                        <input type='text' id='firstName' name="firstName" onChange={this.handleChange} className='account-input' />
                    </span>

                    <span className='account-block'>
                        <label htmlFor='lastName' >Last Name</label>
                        <input type='text' id='lastName' name="lastName" onChange={this.handleChange} className='saccount-input' />
                    </span>

                    <span className='account-block'>
                        <label htmlFor='email' >Email</label>
                        <input type='text' id='email' name="email" onChange={this.handleChange} className='account-input' />
                    </span>

                    <span className='account-block'>
                        <label htmlFor='password' >Password</label>
                        <input type='password' id='password' name="password" onChange={this.handleChange} className='account-input' />
                    </span>

                    <span className='account-block'>
                        <label htmlFor='repeat_password' >Repeat Password</label>
                        <input type='password' id='repeat_password' name="repeat_password" onChange={this.handleChange} className='account-input' />
                    </span>

                    {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}
                    <button onClick={this.handleSubmit} type='button' className='btn-save' >Save</button>
                    <button onClick={this.handleDelete} type='button' className='btn-delete-user'>DELETE ACCOUNT</button>
                </form>
            </div>
        )
    }
}
//get values from store
const mapStateToProps = (state) => {
    return ({
        userId:state.userId,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountAdmin)