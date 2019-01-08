import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FormatDate } from '../utils';
import ProjectDelete from './projectDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Project extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            isLoading: true
        }
    }


    getProjects() {

        //set authorization
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        console.log(this.props.history.location.state)
        let userId
        if (this.props.history.location.state ===undefined) {
            userId = this.props.userId
        } else {
            userId = this.props.history.location.state.userId; 
        }
        
    
        axios.get('/getProjects/' + userId, config)
            .then((res) => {

                //check if theres anything in the response element
                if (Object.keys(res.data).length !== 0) {
                    //checks if there are already projects in the store
                    if (Object.keys(this.props.projectAll).length === 0) this.props.addProjectAll(res.data);
                }

                this.props.setLoading(false);

            })
            .catch((err) => {
                console.log(err);
            })
    }


    //when component mounts trigger request to get projects
    componentDidMount() {
        this.getProjects();
    }

    //view a single project 
    handleClick = (e) => {
        this.props.setProject(e.target.id)
        this.props.history.push('/ProjectView');
    }

    //Add a new project 
    newProjectClick = e => {
        this.props.history.push('/ProjectAdd');
    }

    render() {
        const { isLoadingProject, projectAll } = this.props;
        return (
            <div className='project-grid'>
                {!isLoadingProject ? (
                    projectAll.map(project => {
                        const { _id, projectTitle, projectCompletionDate } = project
                        let date = FormatDate(projectCompletionDate)
                        return (
                            <div className='project-grid-project' id={_id} key={projectTitle}>
                                <div className='project-grid-header'>
                                    <div className='project-grid-delete'>
                                        <ProjectDelete id={_id} />
                                    </div>
                                    <div className='project-grid-title'>
                                        <p>{projectTitle}</p>
                                    </div>
                                </div>

                                <div className='project-grid-body'>
                                    <p>{date}</p>
                                </div>
                                {/* <button onClick={(e) => this.handleClick(e, _id)} id={_id}>View Project</button> */}
                                <button onClick={this.handleClick} id={_id} className='btn-save'>View Project</button>

                            </div>

                        )
                    })
                ) : (
                        <p>Loading. . .</p>
                    )}
                <div className='project-grid-project'>
                    <button className='button-icon-plus' onClick={this.newProjectClick}><FontAwesomeIcon className='plus-icon' icon='plus-circle' /></button>
                </div>
            </div>
        )
    }
};

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        addProjectAll: (projectAll) => { dispatch({ type: 'SET_PROJECT_ALL', projectAll }) },
        setLoading: (isLoadingProject) => { dispatch({ type: 'SET_LOADING', isLoadingProject }) },
        setProject: (projectId) => { dispatch({ type: 'SET_PROJECT_ONE', projectId }) }
    };
};

//get values from store
const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        userId: state.userId,
        projectAll: state.projectAll,
        projectOne: state.projectOne,
        projectId: state.projectId,
        isLoading: state.isLoading,
        state: state
    });
};

//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(Project);