import React, { Component } from 'react'
import ListItem from './listItem'
import axios from 'axios'
import store from '../store'
import ProjectUser from './projectUser'
import {setProjectId, setProject, setLoading} from '../actions'
import {connect} from 'react-redux'

class ProjectList extends Component {
    constructor() {
        super()
        // this.state = {
        //     Project: [],
        //     isLoading: true
        // }
    }
    getProjectItem() {
        console.log("PROJECT GET ITEM FIRED ")
        console.log("PROJECT ID", this.props)
        // var config = {
        //     "headers": { 'Authorization': 'bearer ' + store.getState().cookies }
        // }
        // // store.dispatch(setLoading(true))
        // axios.get('/Project/' + this.props.projectId, config)
        //     .then((res) => {
        //         // this.setState({
        //         //     Project: res.data,
        //         //     isLoading: false
        //         // })
        //         store.dispatch(setProjectId(res.data._id))
        //         store.dispatch(setProject(res.data))
        //         store.dispatch(setLoading(false))
        //         console.log("RES", res.data._id)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    componentDidMount() {
        store.dispatch(setProjectId(this.props.history.location.state))
        this.getProjectItem();
    }
    render() {
        console.log("HISTORY__",  store.getState().cookies)
        const { isLoading, project } = this.props
        return (
            <div>
                    <div>
                        <div>

                            <div>
                                <h1>{project.projectTitle}</h1>
                                <h3>{project.projectCompletionDate}</h3>
                            </div>

                            <div>
                                <ListItem listItems={project.listItem} getProjectItem={this.getProjectItem} />
                                {/* <ListItem listItems={this.props.history.location.state}/> */}
                            </div>
                        </div>

                        <div>

                            <div>
                                <ProjectUser proke userAccess={project.userAccess}/>
                            </div>

                           
                        </div>
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state ) => {
    return ({
      project:state.project,
      projectId: state.projectId,
      isLoading:state.isLoading
    });
  };
  
  const mapDispatchToProps =(dispatch) => {
    return {
    
      deleteUserSession:(userId) => {dispatch({type:'DELETE_POST', userId:userId})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(ProjectList)