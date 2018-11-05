import React, { Component } from 'react'
import ListItem from './listItem'
import axios from 'axios'
import store from '../store'
import ProjectUser from './projectUser'
import {setProjectId, setProject, setLoading} from '../actions'
import {connect} from 'react-redux'
import {FormatDate} from '../utils'
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
        // store.dispatch(setProjectId(this.props.history.location.state))
        // this.getProjectItem();
    }
    render() {
        //console.log("Project List Called", this.props )
        const { isLoading, projectTitle,projectCompletionDate,userAccess } = this.props.projectOne[0]
        let date =  FormatDate(projectCompletionDate)
        return (
            <div>
                    <div>
                        <div>

                            <div>
                                <h1>{projectTitle}</h1>
                                <h3>{date}</h3>
                            </div>

                            <div>
                                <ListItem  />
                                {/* <ListItem listItems={this.props.history.location.state}/> */}
                            </div>
                        </div>

                        <div>

                            <div>
                                <ProjectUser proke userAccess={userAccess}/>
                            </div>

                           
                        </div>
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state ) => {
    return ({
      projectOne:state.projectOne,
    });
  };
  
  const mapDispatchToProps =(dispatch) => {
    return {
    
      deleteUserSession:(userId) => {dispatch({type:'DELETE_POST', userId:userId})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(ProjectList)