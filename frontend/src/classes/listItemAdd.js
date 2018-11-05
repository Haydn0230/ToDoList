import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import { connect } from 'react-redux'
import project from './project';

class ListItemAdd extends Component {
    constructor() {
        super()
        this.state = {
            listOwnership: '',
            listTitle: '',
            listItem: '',
            listDateCompletion: '',
            reRender:false

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
                listOwnership: 'dummy setting',
                listTitle: this.state.listTitle,
                listItem: this.state.listItem,
                listItemCompleted:false,
                listDateCompletion: this.state.listDateCompletion
        }

        //duplicate projectOne
        let projectOneNew = this.props.projectOne

        axios.put('/addList/' + this.props.projectOne[0]._id, {'listItem':data}, config)
            .then((res) => {

                 //assign new listitem array to projectOne.ListItem 
                projectOneNew[0].listItem = res.data.listItem;
                console.log("res.data.listItem",res.data.listItem)
                //call reducer to update project in store
                this.props.updateProjectOne(projectOneNew);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className='list-add-container'>
                <form className='list-add-form'>
                    <label htmlFor='listTitle'>List Title</label>
                    <input className ='input-box' type='text' id='listTitle' name='listTitle' onChange={this.handleChange} />

                    <label htmlFor="listItem" >List Item</label>
                    <input className ='input-box' type='text' id='listItem' name='listItem' onChange={this.handleChange} />

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
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }
    }
}

const mapStateToProps = (state ) => {
    return ({
        cookies:state.cookies,
        projectOne:state.projectOne,
        projectId: state.projectId,
        isLoading:state.isLoading
    });
  };
export default connect(mapStateToProps,mapDispatchToProps)(ListItemAdd)