import React, { Component } from 'react';
//import ListItem from './listItem.js'
import axios from 'axios'
import store from '../store'
import {connect} from 'react-redux'
import { setProjectId } from '../actions';
import {FormatDate} from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Project extends Component {
    constructor() {
        super();
        this.state = {
            projects:[],
            isLoading:true
        }
    }



    getProjects() {
        
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies}
        }
        
        axios.get('/getProjects/' + this.props.userId , config)
            .then((res) => {

                //check if theres anything in the response element
                if(Object.keys(res.data).length !== 0){
                   if (Object.keys(this.props.projectAll).length === 0) this.props.addProjectAll(res.data);
                }
                
                this.props.setLoading(false);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getProjects();
    }

    handleClick = (e) => {
        
        this.props.setProject(e.target.id)
        this.props.history.push('/ProjectView');
    }

    newProjectClick = e =>{
        this.props.history.push('/ProjectAdd');
    }

    render() {
        const {isLoadingProject, projectAll} = this.props;
        return (
            <div className='project-grid'>
                {!isLoadingProject ? (
                    projectAll.map(project => {
                        const {_id,projectTitle, projectCompletionDate} = project
                        let date =  FormatDate(projectCompletionDate)
                        return (
                            <div className='project-grid-project' id={_id} key={projectTitle} onClick={this.handleClick}>
                                <div className='project-grid-title'>
                                    <p>{projectTitle}</p>
                                </div>
                                <div className='project-grid-body'>
                                    <p>{date}</p>
                                </div>
                                {/* <button onClick={(e) => this.handleClick(e, _id)} id={_id}>View Project</button> */}
                                <button onClick={this.handleClick} id={_id} className='btn-save'>View Project</button>

                            </div>

                        )
                    })
                ): (
                    <p>Loading. . .</p>
                )}
                <div className = 'project-grid-project'>
                    <button className='button-icon-plus' onClick={this.newProjectClick}><FontAwesomeIcon className='plus-icon' icon='plus-circle'/></button>
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
      userId:state.userId,
      projectAll:state.projectAll,
      projectOne:state.projectOne,
      projectId: state.projectId,
      isLoading:state.isLoading,
      state:state
    });
  };


export default connect(mapStateToProps,mapDispatchToProps)(Project);