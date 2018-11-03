import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class CheckBox extends Component {
constructor() {
    super()
    this.state = {
        isChecked: false
    }
}


    handleClick = e => {

        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        let newListItem =[]
        let newListItems = this.props.projectOne[0].listItem.filter((listItem) => {
            if (e.target.id === listItem._id) {
                listItem.listItemCompleted = e.target.checked;
                newListItem = listItem
                console.log("filtered list item", listItem.listItemCompleted, "___", this.state.isChecked)
            }
            return listItem
        })

        // push the newlistitem onto the project
        let projectOneNew = this.props.projectOne
        projectOneNew[0].listItem= newListItems
        console.log(newListItem)
        //update the store with the new project info 
        //this.props.updateProjectOne(projectOneNew)

        
        axios.put('/editList/' + this.props.projectOne[0]._id, {'listItem':newListItem}, config)
        .then((res) => {
            console.log(res)
            this.setState({
                isEdited: true
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.setState({
            isChecked:this.props.value
        })
    }

    render() {
        console.log("checkbox" ,this.props)
        return (
             <input type='checkbox' id={this.props.id} defaultChecked={this.props.value} onClick={this.handleClick} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }
    }
}

const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};
export default connect(mapStateToProps,mapDispatchToProps)(CheckBox)