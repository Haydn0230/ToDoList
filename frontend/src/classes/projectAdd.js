import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { validation } from '../utils'

class ProjectAdd extends Component {
    constructor() {
        super()
        this.state = {
            projectTitle: '',
            projectCompletionDate: '',
            isAdded: false,
            errorMessage: ''

        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    handleSubmit = e => {
        e.preventDefault();

        //call validation 
        const errors = validation(this.state);

        //if error then throw error message
        if (errors !== '') {
            this.setState({
                errorMessage: errors + ' required'
            })
            return
        }

        //set authorization token 
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        
        //create data object to send to server 
        let data = {
            projectTitle: this.state.projectTitle,
            projectOwner: this.props.userId,
            projectCompletionDate: this.state.projectCompletionDate,
            listItem: [],
            userAccess: {
                userId: this.props.userId,
                email: this.props.user.email,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName
            }
        }
        
        axios.post('/addProject', data, config)
            .then((res) => {
                this.setState({
                    isAdded: true
                })

                //checks if array of projects is empty
                if (Object.keys(this.props.projectAll).length === 0) {
                    this.props.setProjectAll([res.data]);
                    
                } else {
                    const projectAllNew = this.props.projectAll;

                    //add new project to array of projects 
                    projectAllNew.push(res.data);

                    //write new project to store
                    this.props.setProjectAll(projectAllNew);
                    
                }
            })
            .then(() => {
                this.props.history.push('/Project');
            })
            .catch((err) => {

            })

    }

    render() {

        const { isAdded, errorMessage } = this.state;
        return (
            <div className='project-add'>
                <h1>PROJECT ADD </h1>
                {!isAdded ? (
                    <form>
                        <span className='project-add-block'>
                            <label htmlFor="projectTitle" > Project Title </label>
                            <input type='text' id='projectTitle' name='projectTitle' onChange={this.handleChange} className='project-add-input'/>
                            <p className='error-message'></p>
                        </span>
                        <span className='project-add-block'>
                            <label htmlFor='projectCompletionDate' > Project Completion date</label>
                            <input type='date' id='projectCompletionDate' name='projectCompletionDate' onChange={this.handleChange} className='project-add-input'/>
                        </span>
                        {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}

                        <button onClick={this.handleSubmit} type='button' className='btn-save'>Save</button>
                    </form>
                ) : (
                        <p> ADDED </p>
                    )}

            </div>
        )
    }
}

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) },
        setProjectAll: (projectAll) => { dispatch({ type: 'SET_PROJECT_ALL', projectAll }) }
    }
};

//get values from store
const mapStateToProps = (state) => {
    return ({
        userId: state.userId,
        user: state.user,
        cookies: state.cookies,
        projectOne: state.projectOne,
        projectAll: state.projectAll,
        state: state
    });
};
//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd)