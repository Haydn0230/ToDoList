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


        let projectOneNew = this.props.projectOne
        
        projectOneNew[0].listItem.push(data)
        
        //  projectOneNew = projectOneNew
        
        console.log("PROJECT ONE NEW ", projectOneNew, " SOMETHING KNEW ", data  )
        this.props.updateProjectOne(projectOneNew);
        console.log("2", this.props.projectOne)

        axios.put('/addList/' + this.props.projectOne[0]._id, {'listItem':data}, config)
            .then((res) => {
                // console.log("props",this.props);

                // this.setState({
                //     isAdded: true
                // })
                // this.props.getProjectItem()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        console.log("list Item Add Called")
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