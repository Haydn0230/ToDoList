import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class ProjectUser extends Component {
    constructor() {
        super()
        this.state = {
            addUser: false,
            email: '',
            userError: 'addUserErrorOff'
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    addNewUser = (e) => {
        e.preventDefault();
        this.setState({
            addUser: true
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }
        const data = {
            'email': this.state.email
        }
        const projectOneNew = this.props.projectOne
        const newUserList = projectOneNew[0].userAccess

        axios.post('/findUser', data, config)
            .then((res) => {
                //assign new listitem array to projectOne.ListItem 
                //newUserList.push(res.data)
                //projectOneNew[0].userAccess = newUserList;
                //console.log("res.data.user", res.data)
                //call reducer to update project in store
                //console.log(projectOneNew)

                //switch error message off and flip back to user display

                console.log({'userAccess':res.data})

                //send new user to server to be added to project.
                    axios.put('/addProjectUser/' + projectOneNew[0]._id,{'userAccess':res.data}, config)
                        .then((res) => {
                            console.log('Add Project', res.data.project.userAccess)
                            projectOneNew[0].userAccess = res.data.project.userAccess;
                            this.props.updateProjectOne(projectOneNew);
                            console.log('Add Project', res.data.project.userAccess)
                            this.setState({
                                userError: 'addUserErrorOff',
                                addUser: false
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
            })
            .catch((err) => {
                console.log(err)
                if (typeof err !== 'undefined') {
                    if (err.response.status == 422) {
                        this.setState({
                            userError: 'addUserErrorOn'
                        })

                    }
                }

            })
    };

    deleteUser = (e) => {
        e.preventDefault();

        const config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        const data = { userAccess:{
            '_id':e.target.id}
        }

        const projectOneNew = this.props.projectOne;
        
        axios.put('/projectUser/' + this.props.projectOne[0]._id,data,config)
        .then((res)=>{
            projectOneNew[0].userAccess = res.data.userAccess;
            this.props.updateProjectOne(projectOneNew);
            this.setState({
                userError: 'addUserErrorOff',
                addUser: false
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        console.log("Project User Called")
        const { userAccess } = this.props.projectOne[0]
        return (

            <div className='userContainer'>
                {!this.state.addUser ? (
                    <React.Fragment>
                        {userAccess.map(Users => {
                            const { firstName, lastName, _id } = Users
                            return (
                                <div className='userCircle' key={firstName}>

                                    <p>{firstName}</p>
                                    <p>{lastName}</p>
                                    <button onClick={this.deleteUser} id={_id}> X </button>
                                </div>
                            )
                        })}
                        <div className='userCircle' >
                            <button onClick={this.addNewUser}> + </button>
                        </div>
                    </React.Fragment>
                ) : (
                        <div className='add-user'>
                            <form>
                                <label htmlFor="email" > Email</label>
                                <input type='text' id='email' name='email' onChange={this.handleChange} />
                                <button onClick={this.handleSubmit} type='button'>Add User</button>
                                <p className={`${this.state.userError}`}>Cannot find user to add</p>
                            </form>
                        </div>
                    )}
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }

    }
}

const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectUser)
