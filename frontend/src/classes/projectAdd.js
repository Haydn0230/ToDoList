import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash'
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
        if (errors !== '') {
            this.setState({
                errorMessage: errors + ' required'
            })
            return
        }


        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        console.log("USER ", this.props)
        let data = {
            projectTitle: this.state.projectTitle,
            projectOwner: this.props.userId,
            projectCompletionDate: this.state.projectCompletionDate,
            listItem: [],
            userAccess: {
                userID: this.props.userId,
                email: this.props.user.email,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName
            }
        }

        axios.post('/addProject', data, config)
            .then((res) => {
                //console.log("this.props.projectAll.isEmpty()",this.props.projectAll.isEmpty())
                this.setState({
                    isAdded: true
                })
                //console.log("Object.keys(this.props.projectAll).length",Object.keys(this.props.projectAll).length)

                if (Object.keys(this.props.projectAll).length === 0) {
                    this.props.setProjectAll([res.data]);
                    console.log('res.data.project', res.data.project)
                } else {
                    const projectAllNew = this.props.projectAll;

                    projectAllNew.push(res.data);
                    console.log("porjectAllNew.push(data)", projectAllNew)
                    this.props.setProjectAll(projectAllNew);
                    console.log("2")
                }
                //this.props.updateProjectOne(res.data)

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
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) },
        setProjectAll: (projectAll) => { dispatch({ type: 'SET_PROJECT_ALL', projectAll }) }
    }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd)