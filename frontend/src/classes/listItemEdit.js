import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'

class ListItemEdit extends Component {

    constructor() {
        super()
        this.state = {
            listOwnership: '',
            listTitle: '',// listTitle,
            listItem: '',//listItem,
            listDateCompletion: '',//listDateCompletion,
            isEdited: false

        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,

        });
    }

    handleSubmit = event => {
        event.preventDefault();

        var config = {
            "headers": { 'Authorization': 'bearer ' + store.getState().cookies }
        }
        console.log("State", this.state, "projectID", store.getState().projectId, "ListItemID", this.props.listItem._id)
        axios.put('/editList/' + store.getState().projectId, {
            "listItem": {
                _id: this.props.listItem._id,
                listOwnership: '',
                listTitle: this.state.listTitle,
                listItem: this.state.listItem,
                listDateCompletion: this.state.listDateCompletion
            }
        }, config)
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

    render() {
        const { listTitle, listItem, listDateCompletion } = this.props.listItem
        const { isEdited } = this.state;
        return (
            <div>
                {!isEdited ? (
                    <form>
                        <label htmlFor='listTitle'>List Title</label>
                        <input type='text' id='listTitle' name='listTitle' placeholder={listTitle} onChange={this.handleChange} />

                        <label htmlFor="listItem" >List Item</label>
                        <input type='text' id='listItem' name='listItem' placeholder={listItem} onChange={this.handleChange} />

                        <label htmlFor='listDateCompletion'> Date for Completion</label>
                        <input type='date' id='listDateCompletion' name='listDateCompletion' placeholder={listDateCompletion} onChange={this.handleChange} />
                        <button onClick={this.handleSubmit} type='button'>Save</button>
                    </form>
                ) : (
                        <p>Changes have been made</p>
                    )}

            </div>
        )
    }
}

export default ListItemEdit