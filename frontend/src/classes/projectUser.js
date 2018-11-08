import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import {validation} from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProjectUser extends Component {
    constructor() {
        super()
        this.state = {
            addUser: false,
            email: '',
            errorMessage: ''
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    addNewUser = (e) => {
        e.preventDefault();
        this.setState({
            addUser: true
        });
    };

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

    handleSubmit = (e) => {
        e.preventDefault();
        //verification 
        const errors = validation(this.state)
        if (errors !== '') {
            this.setState({
                errorMessage: errors + ' required'
            })
            return
        }

        const config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        const data = {
            'email': this.state.email
        }

        const projectOneNew = this.props.projectOne
        const newUserList = projectOneNew[0].userAccess

        axios.post('/findUser', data, config)
            .then((res) => {

                //send new user to server to be added to project.
                axios.put('/addProjectUser/' + projectOneNew[0]._id, { 'userAccess': res.data }, config)
                    .then((res) => {
                        
                        projectOneNew[0].userAccess = res.data.project.userAccess;
                        this.props.updateProjectOne(projectOneNew);
                        
                        this.setState({
                            errorMessage: '',
                            addUser: false
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })

            .catch((err) => {
                console.log(err)
                if (typeof err !== 'undefined') {
                    if (err.response.status == 422) {
                        this.setState({
                            errorMessage: 'Cannot Find User'
                        })

                    }
                }

            })
    };

    deleteUser = (e) => {
        e.preventDefault();

        const config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        const data = {
            userAccess: {
                '_id': e.target.id
            }
        }
        console.log("DATA", e.target.value)
        const projectOneNew = this.props.projectOne;

        axios.put('/projectUser/' + this.props.projectOne[0]._id, data, config)
            .then((res) => {
                projectOneNew[0].userAccess = res.data.userAccess;
                this.props.updateProjectOne(projectOneNew);
                this.setState({
                    userError: 'addUserErrorOff',
                    addUser: false
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    goBack = (e) => {
        this.setState({
            addUser: false
        })
    }

    getFirstLetter =(name) => {
        return name.slice(0,1).toUpperCase()
    }

    render() {
        const {errorMessage} = this.state
        const { userAccess } = this.props.projectOne[0]
        
        return (

            <div className='userContainer'>
                {!this.state.addUser ? (
                    <React.Fragment>
                        {userAccess.map(Users => {
                            const { firstName, lastName, _id } = Users
                            
                            return (
                                <div className='userCircle' key={firstName}>
                                    
                                    <p className='userCircle-intials'>{this.getFirstLetter(firstName)}.</p>
                                    <p className='userCircle-intials'>{this.getFirstLetter(lastName)}.</p>
                                    <button onClick={this.deleteUser} value={_id} className='btn-delete'>
                                        <FontAwesomeIcon id={_id} icon='user-minus'/>   
                                    </button>
                                </div>
                            )
                        })}
                        <div className='userCircle' >
                            <button onClick={this.addNewUser} className='btn-add'> <FontAwesomeIcon icon='user-plus'/> </button>
                        </div>
                    </React.Fragment>
                ) : (
                        <div className='add-user'>
                            <form>
                                <span className='add-user-block'>
                                <label htmlFor="email" > Email</label>
                                <input type='text' id='email' name='email' onChange={this.handleChange} className='add-user-input' />
                                </span>
                                <button onClick={this.handleSubmit} type='button' className='add-user-buttons'>Add User</button>
                                <button onClick={this.goBack} type='button' className='add-user-buttons'>Cancel</button>
                                {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}

                            </form>
                        </div>
                    )}
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }

    }
}

const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectUser)
