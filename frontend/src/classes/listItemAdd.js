import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import { connect } from 'react-redux'

class ListItemAdd extends Component {
    constructor() {
        super()
        this.state = {
            listOwnership: '',
            listTitle: '',
            listItem: '',
            listDateCompletion: '',
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
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        const data = {
            "listItem": {
                listOwnership: 'dummy setting',
                listTitle: this.state.listTitle,
                listItem: this.state.listItem,
                listDateCompletion: this.state.listDateCompletion
            }
        }

        axios.put('/addList/' + this.props.projectId, data, config)
            .then((res) => {
                console.log("props",this.props);
                this.props.addListItem(data);
                // this.setState({
                //     isAdded: true
                // })
                //this.props.getProjectItem()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { isAdded } = this.state;
        console.log("99-----", store.getState().projectId)
        return (
            <div>
                <form>
                    <label htmlFor='listTitle'>List Title</label>
                    <input type='text' id='listTitle' name='listTitle' onChange={this.handleChange} />

                    <label htmlFor="listItem" >List Item</label>
                    <input type='text' id='listItem' name='listItem' onChange={this.handleChange} />

                    <label htmlFor='listDateCompletion'> Date for Completion</label>
                    <input type='date' id='listDateCompletion' name='listDateCompletion' onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} type='button'>Save</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addListItem: (listItem) => { dispatch({ type: 'ADD_LIST_ITEM', listItem }) }
    }
}

const mapStateToProps = (state ) => {
    return ({
        cookies:state.cookies,
      projectId: state.projectId,
      isLoading:state.isLoading
    });
  };
export default connect(mapStateToProps,mapDispatchToProps)(ListItemAdd)