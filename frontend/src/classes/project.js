import React, { Component } from 'react';
//import ListItem from './listItem.js'
import axios from 'axios'
import store from '../store'

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
        console.log("projects -- ",this.props)
        var config = {
            "headers": { 'Authorization': 'bearer ' + store.getState().cookies}
        }
        
        
        axios.get('/getProjects/' + store.getState().userId , config)
            .then((res) => {
                this.setState({
                    projects:res.data,
                    isLoading:false
                });
            
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
       
        this.getProjects();
    }

    handleClick = event => {
        this.props.history.push('/ProjectView', event.target.id)
    }

    render() {
        const {isLoading, projects} = this.state;
        return (
            <div className='project-grid'>
                {!isLoading ? (
                    projects.map(project => {
                        const {projectTitle, projectCompletionDate} = project
                        return (
                            <div className='project' key={projectTitle} onClick={this.handleClick}>
                                <div className='project-title'>
                                    <p>{projectTitle}</p>
                                </div>
                                <div className='project-body'>
                                    <p>{projectCompletionDate}</p>
                                </div>

                            </div>
                        )
                    })
                ): (
                    <p>Loading. . .</p>
                )}
            </div>
        )
    }
};

export default Project;