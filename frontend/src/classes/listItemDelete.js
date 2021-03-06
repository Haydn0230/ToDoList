import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListItemDelete extends Component {

    handleClick = () => {
        //this.props.deleteListItem(this.props.listItemId)

        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        let data = {
            'listItem':
            {
                '_id': this.props.listItemId
            }
        }

        //loop through listItems on ID to filter listItem 
        let newListItems= this.props.projectOne[0].listItem.filter(listItem =>  this.props.listItemId !== listItem._id);

        // push the newlistitem onto the project
        let projectOneNew = this.props.projectOne

        //add new list item array
        projectOneNew[0].listItem =newListItems
        
        //update the store with the new project info 
        this.props.updateProjectOne(projectOneNew)

        axios.put('/deleteList/' + this.props.projectOne[0]._id, data, config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        return (
            <button onClick={this.handleClick} className='list-button-trash'><FontAwesomeIcon icon='trash'/></button>
        )
    }
}

//get values from store
const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        projectId: state.projectId,
    });
};

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }
    };
};

//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ListItemDelete)