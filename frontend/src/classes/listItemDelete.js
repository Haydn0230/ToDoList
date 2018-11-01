import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import { connect } from 'react-redux'
class ListItemDelete extends Component {

    handleClick = () => {
        this.props.deleteListItem(this.props.listItemId)

        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        let data = { 
            'listItem':
            {
                '_id': this.props.listItemId
            }
        }
        //delete code from redux store code 
        //let newListItems  = this.props.projectOne[0].listItem.filter(listItem => {
        //     return action._id !== listItem._id
        // });



        console.log("Project ID -", this.props.projectOne[0]._id, "DATA - ", data, "CONFIG - ", config)

        axios.put('/deleteList/' + this.props.projectOne[0]._id,  data, config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        console.log("list Item Delete Called")
        return (
            <div>
                <button onClick={this.handleClick}>DELETE</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        projectId: state.projectId,
    });
};

const mapDispatchToProps = (dispatch) => {
    return {

        deleteListItem: (listItemId) => { dispatch({ type: 'DELETE_LIST_ITEM', _id: listItemId }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemDelete)