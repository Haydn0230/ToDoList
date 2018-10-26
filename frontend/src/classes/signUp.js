import { React, Component } from 'react'
import axios from 'axios'

class SignUp extends Component {
constructor() {
    super ();
    this.state={
        email:'',
        password:''
    }
}

handleChange = event => {
    this.setState({
        [event.target.id]:event.target.value
    });
}

handleSubmit = event => {
    e.preventDefault();
    //verification goes here
    axios.post('/',{
        'email':this.state.email,
        'password':this.state.password
    })
    .then((res)=>{
        this.props.history.push('/project');
    })
    .catch((err)=>{
        console.log(err);
    })

}
    render() {
        return (
            <div>
                <h1>Sign up </h1>
                <form>
                    <input type='text' id='email' name="email" onChange={this.handleChange} />
                    <label htmlFor='password' />
                    <input type='password' id='password' name="password" onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} type='button'>Log In</button>
                </form>


                <div>
                </div>
            </div>
        )
    }
}