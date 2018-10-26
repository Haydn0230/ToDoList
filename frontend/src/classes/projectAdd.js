import React from 'react'
import axios from 'axios'


class ProjectAdd extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isAdded:false

        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('/', {
            'email': this.state.email,
            'password': this.state.password
        })
        .then((res)=>{

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
                    <label htmlFor="userName" />
                    <input type='text' id='email' name='email' onChange={this.handleChange} />
                    <label htmlFor='password' />
                    <input type='password' id='password' name='password' onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} type='button'>Log In</button>
                </form>
                ):(
                   <p>Added</p> 
                )}

            </div>
        )
    }
}

export default ProjectAdd