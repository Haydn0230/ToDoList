import  React,{ Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class SignUp extends Component {
constructor() {
    super ()
    this.state={
        firstName:'',
        lastName:'',
        email:'',
        password:''
    }
}

handleChange = event => {
    this.setState({
        [event.target.id]:event.target.value
    });
}

handleSubmit = e => {
    e.preventDefault();
    //verification goes here

    let data={
        'firstName':this.state.firstName,
        'lastName':this.state.lastName,
        'email':this.state.email,
        'password':this.state.password
    }

    var config = {
        "headers": { 'Authorization': 'bearer ' + this.props.cookies }
    }

    axios.post('/addUser',data,config)
    .then((res)=>{
        this.props.setCookies(res.data.token)
        this.props.setAuth(true)
        console.log("user  - -- - ",res.data)
        this.props.setUserId(res.data.user._id)
        this.props.setUser(res.data.user)
        
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
                    <label htmlFor='firstName' >firstName</label>
                    <input type='text' id='firstName' name="firstName" onChange={this.handleChange} />
                    
                    <label htmlFor='lastName' >lastName</label>
                    <input type='text' id='lastName' name="lastName" onChange={this.handleChange} />
                    
                    <label htmlFor='email' >email</label>
                    <input type='text' id='email' name="email" onChange={this.handleChange} />
                    
                    <label htmlFor='password' >password</label>
                    <input type='password' id='password' name="password" onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} type='button'>Sign Up</button>
                </form>


                <div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCookies: (cookies) => { dispatch({ type: 'SET_COOKIES', cookies }) },
        setUserId: (userId) => { dispatch({ type: 'SET_USER_ID', userId }) },
        setUser: (user) => { dispatch({ type: 'SET_USER', user }) },
        setAuth: (isAuth) => { dispatch({ type: 'SET_AUTHENTICATION', isAuth }) }
    }
}
const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)