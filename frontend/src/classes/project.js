import React, { Component } from 'react';
//import ListItem from './listItem.js'
import axios from 'axios'
import store from '../store'
import {connect} from 'react-redux'
import { setProjectId } from '../actions';

class Project extends Component {
    constructor() {
        super();
        this.state = {
            projects:[],
            isLoading:true
        }
    }



    getProjects() {
        //const {cookies} = this.props.cookies;
        var config = {
            "headers": { 'Authorization': 'bearer ' + store.getState().cookies}
        }
        
        axios.get('/getProjects/' + store.getState().userId , config)
            .then((res) => {
                this.props.addProjectAll(res.data);
                this.props.setLoading(false);

                //this.forceUpdate();
            console.log("project.projects", res.data)
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getProjects();
    }

    handleClick = (e) => {
        //console.log("ID FROM HANDLE CLICK", e.target.id)
        this.props.setProject(e.target.id)
        this.props.history.push('/ProjectView');
    }

    newProjectClick = e =>{
        this.props.history.push('/ProjectAdd');
    }

    render() {
        console.log("project called")
        const {isLoadingProject, projectAll} = this.props;
        return (
            <div className='project-grid'>
                {!isLoadingProject ? (
                    projectAll.map(project => {
                        const {_id,projectTitle, projectCompletionDate} = project
                        return (
                            <div className='project' id={_id} key={projectTitle} onClick={this.handleClick}>
                                <div className='project-title'>
                                    <p>{projectTitle}</p>
                                </div>
                                <div className='project-body'>
                                    <p>{projectCompletionDate}</p>
                                </div>
                                {/* <button onClick={(e) => this.handleClick(e, _id)} id={_id}>View Project</button> */}
                                <button onClick={this.handleClick} id={_id}>View Project</button>

                            </div>

                        )
                    })
                ): (
                    <p>Loading. . .</p>
                )}
                <div className = 'project'>
                    <button onClick={this.newProjectClick}>+</button>
                </div>
            </div>
        )
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addProjectAll: (projectAll) => {dispatch({ type: 'SET_PROJECT_ALL', projectAll }) },
        setLoading:(isLoadingProject) => {dispatch({type:'SET_LOADING',isLoadingProject })},
        setProject:(projectId) => {dispatch({type:'SET_PROJECT_ONE',projectId})}
    }
}

const mapStateToProps = (state ) => {
    return ({
      cookies:state.cookies,
      projectAll:state.projectAll,
      projectOne:state.projectOne,
      projectId: state.projectId,
      isLoading:state.isLoading,
      state:state
    });
  };


export default connect(mapStateToProps,mapDispatchToProps)(Project);