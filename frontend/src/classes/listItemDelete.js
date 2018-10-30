import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import {connect} from 'react-redux'
class ListItemDelete extends Component {

    handleClick = () => {
        this.props.deleteListItem(this.props.listItemId)
    }
    render() {
        return (
            <div>
            <button onClick={this.handleClick}>DELETE</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        project: state.project,
        projectId: state.projectId,
    });
};

const mapDispatchToProps = (dispatch) => {
    return {

        deleteListItem: (listItemId) => { dispatch({ type: 'DELETE_LIST_ITEM', _id:listItemId }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemDelete)