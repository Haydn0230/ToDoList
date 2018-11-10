import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProjectDelete extends Component {

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

        //request to server
        axios.delete('/project/' + this.props.id, config)
            .then((res) => {
                this.props.setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <button className='project-btn-delete'  onClick={this.handleClick} ><FontAwesomeIcon id={this.props.id} icon='trash'/></button>
        )
    }
}

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        setProjectAll: (projectAll) => { dispatch({ type: 'SET_PROJECT_ALL', projectAll }) },
        setLoading:(isLoadingProject) => {dispatch({type:'SET_LOADING',isLoadingProject })},
    }
}

//get values from store
const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectAll: state.projectAll,
        isLoadingProject:state.isLoadingProject
    });
};
//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDelete)