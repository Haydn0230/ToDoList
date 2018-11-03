import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class ProjectAdd extends Component {
    constructor() {
        super()
        this.state = {
            projectTitle: '',
            projectOwner: '',
            projectCompletionDate:'',
            isAdded:false

        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        //verification needed for date 
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        
        let data ={ 
            projectTitle: this.state.projectTitle,
            projectOwner: this.props.userId,
            projectCompletionDate:this.state.projectCompletionDate,
            userAccess: {
                userID: this.props.userId,
                firstName:this.props.user.firstName,
                LastName:this.props.user.lastName
            }
        }
        console.log("Project Add", data)
        axios.post('/addProject', data,config)
        .then((res)=>{
            this.setState({
                isAdded:true
            })
            
            this.props.history.push('/Project');
        })
        .catch((err)=>{

        })

    }

    render() {
        console.log("Project Add called")
        const {isAdded} = this.state;
        return (
            <div>
                <h1>PROJECT ADD </h1>
                {!isAdded ? (
                <form>
                    <label htmlFor="projectTitle" > project Title </label>
                    <input type='text' id='projectTitle' name='projectTitle' onChange={this.handleChange} />
                    <label htmlFor='projectCompletionDate' />
                    <input type='date' id='projectCompletionDate' name='projectCompletionDate' onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} type='button'>Save</button>
                </form>
                ):(
                   <p> ADDED </p>
                )}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        userId:state.userId,
        user:state.user,
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};
export default connect(mapStateToProps)(ProjectAdd)