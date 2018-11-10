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
        //create new array with edited list item
        let newListItem =[]
        let newListItems = this.props.projectOne[0].listItem.filter((listItem) => {
            if (e.target.id === listItem._id) {
                listItem.listItemCompleted = e.target.checked;
                newListItem = listItem;
            }
            return listItem
        })

        // push the newlistitem onto the project
        let projectOneNew = this.props.projectOne
        projectOneNew[0].listItem= newListItems
        
        axios.put('/editList/' + this.props.projectOne[0]._id, {'listItem':newListItem}, config)
        .then((res) => {

        })
        .catch((err) => {
            console.log(err)
        })
    }

    //toggle checkbox and write to state
    componentDidMount() {
        this.setState({
            isChecked:this.props.value
        })
    }

    render() {
        return (
             <input type='checkbox' id={this.props.id} defaultChecked={this.props.value} onClick={this.handleClick} />
        )
    }
}
//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }
    }
}
//get values from store
const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};

//wrap component in connect function to connect to store
export default connect(mapStateToProps,mapDispatchToProps)(CheckBox)