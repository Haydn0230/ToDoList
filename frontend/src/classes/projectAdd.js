import React from 'react'
import axios from 'axios'


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

    handleSubmit = event => {
        var config = {
            "headers": { 'Authorization': 'bearer ' + store.getState().cookies }
        }
        event.preventDefault();
        axios.post('/addProject',  {
            projectTitle: this.state.projectTitle,
            projectOwner: store.getState().userId,
            projectCompletionDate:this.state.projectCompletionDate,
        },config)
        .then((res)=>{
            this.setState({
                isAdded:true
            })
        })
        .catch((err)=>{

        })
    }

    render() {
        const {isAdded} = this.state;
        return (
            <div>
                {!isAdded ? (
                <form>
                    <label htmlFor="projectTitle" > project Title </label>
                    <input type='text' id='projectTitle' name='projectTitle' onChange={this.handleChange} />
                    <label htmlFor='projectCompletionDate' />
                    <input type='password' id='projectCompletionDate' name='projectCompletionDate' onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} type='button'>Save</button>
                </form>
                ):(
                   <p>Added</p> 
                )}

            </div>
        )
    }
}

export default ProjectAdd