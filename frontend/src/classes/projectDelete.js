import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProjectDelete extends Component {

    checkUser = () => {
        const { userId, projectAll } = this.props;
        //create array with selected project
        let projectSelected = projectAll.filter(project => {
            return this.props.id === project._id
        });
        console.log('projectSelected', userId,projectSelected[0].userAccess[0].userId);
        if (userId === projectSelected.projectOwner) {
            return 'owner'
        } else {
            //get the _id of userId for delete function 
            const user = projectSelected[0].userAccess.filter((user)=>{
                if (user.userId === userId) {
                    return user
                }
                
            })
            return user
        }
    }
    handleClick = (e) => {
        this.props.setLoading(true);

        //delete from store
        let newProjectAll = this.props.projectAll.filter(project => {
            return this.props.id !== project._id
        });

        //map new projectAll to store 
        this.props.setProjectAll(newProjectAll);

        //authorization token
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        //check users access
        const access = this.checkUser();

        //if owner then delete the project else delete user access to project 
        if (access === 'owner') {
            //request to server
            axios.delete('/project/' + this.props.id, config)
                .then((res) => {
                    this.props.setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {


            const data = {
                userAccess: {
                    _id: access[0]._id
                }
            }
            console.log('data', data)
            axios.put('/projectUser/' + this.props.id,data, config)
                .then((res) => {
                    this.props.setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });

        }

    }
    render() {
        return (
            <button className='project-btn-delete' onClick={this.handleClick} ><FontAwesomeIcon id={this.props.id} icon='trash' /></button>
        )
    }
}

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        setProjectAll: (projectAll) => { dispatch({ type: 'SET_PROJECT_ALL', projectAll }) },
        setLoading: (isLoadingProject) => { dispatch({ type: 'SET_LOADING', isLoadingProject }) },
    }
}

//get values from store
const mapStateToProps = (state) => {
    return ({
        userId: state.userId,
        cookies: state.cookies,
        projectAll: state.projectAll,
        isLoadingProject: state.isLoadingProject
    });
};
//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDelete)