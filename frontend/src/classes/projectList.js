import React, { Component } from 'react'
import ListItem from './listItem'
import axios from 'axios'
import store from '../store'
import ProjectUser from './projectUser'
import { setProjectId, setProject, setLoading } from '../actions'
import { connect } from 'react-redux'
import { FormatDate } from '../utils'
class ProjectList extends Component {
    constructor() {
        super()
        // this.state = {
        //     Project: [],
        //     isLoading: true
        // }
    }

    handleFilter = (e) => {
        this.props.setFilter(e.target.value)
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
        const { isLoading, projectTitle, projectCompletionDate, userAccess } = this.props.projectOne[0]
        let date = FormatDate(projectCompletionDate)
        return (
            <div>
                <div>
                    <div>
                        <div className='project-list-header'>
                            <div className='project-list-title'>
                                <h1 className='project-list-h1'>{projectTitle}</h1>
                                <h3 className='project-list-date'>{date}</h3>
                            </div>
                        <div className='project-list-filter'>
                            <ul className='project-list-filter-list'>
                                <li><button onClick={this.handleFilter} value='COMPLETED' className='project-list-filter-btn '>Completed</button></li>
                                <li><button onClick={this.handleFilter} value='TO_DO' className='project-list-filter-btn '>To Do</button></li>
                                <li><button onClick={this.handleFilter} value='ALL' className='project-list-filter-btn'>All</button></li>
                            </ul>
                        </div>
                            <div className='project-list-user'>
                                <ProjectUser proke userAccess={userAccess} />
                            </div>
                        </div>

                        <div>
                            <ListItem />
                            {/* <ListItem listItems={this.props.history.location.state}/> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        projectOne: state.projectOne,
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (filter) => { dispatch({ type: 'SET_FILTER', filter }) },
        deleteUserSession: (userId) => { dispatch({ type: 'DELETE_POST', userId: userId }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)