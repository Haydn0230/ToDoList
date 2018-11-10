import React, { Component } from 'react'
import ListItem from './listItem'
import ProjectUser from './projectUser'
import { connect } from 'react-redux'
import { FormatDate } from '../utils'

class ProjectList extends Component {
    constructor() {
        super()
    }

    handleFilter = (e) => {
        this.props.setFilter(e.target.value)
    }
    getProjectItem() {

    }

    componentDidMount() {

    }
    render() {
        console.log("Project List Called", this.props )
        const { projectTitle, projectCompletionDate, userAccess } = this.props.projectOne[0]
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//get values from store
const mapStateToProps = (state) => {
    return ({
        projectOne: state.projectOne,
    });
};

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (filter) => { dispatch({ type: 'SET_FILTER', filter }) },
        deleteUserSession: (userId) => { dispatch({ type: 'DELETE_POST', userId: userId }) }
    }
};
//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)