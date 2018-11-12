import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button} from 'semantic-ui-react'
import { validation } from '../utils'


class ListItemAdd extends Component {
    constructor() {
        super()
        this.state = {
            listOwnership: '',
            listTitle: '',
            listItem: '',
            listDateCompletion: '',
            reRender: false,
            errorMessage: ''
        }
    }

    //function to write input to state
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });

    }

    //set list ownership 
    componentDidMount() {
        this.setState({
            listOwnership: this.props.userId
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        //call validation function 
        const errors = validation(this.state);

        //check if errors have been returned if true break out
        if (errors !== '') {
            this.setState({
                errorMessage: errors + ' required'
            })
            return
        }

        //set up Authorization to make request to server  
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        //set up data to be sent to server
        const data = {
            listOwnership: '',
            listTitle: this.state.listTitle,
            listItem: this.state.listItem,
            listItemCompleted: false,
            listDateCompletion: this.state.listDateCompletion
        }

        //duplicate projectOne to reWrite to store
        let projectOneNew = this.props.projectOne

        axios.put('/addList/' + this.props.projectOne[0]._id, { 'listItem': data }, config)
            .then((res) => {

                //assign new listitem array to projectOne.ListItem 
                projectOneNew[0].listItem = res.data.listItem;
                
                //call reducer to update project in store
                this.props.updateProjectOne(projectOneNew);
                this.close();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //calls parent function to close list add form
    close = () => {
        this.props.addListItem()
    };

    render() {


        //destructure state for readability
        const { errorMessage } = this.state

        return (
                <div className='list-add-container'>
                        <h2>Add Item</h2>
                        <form className='list-add-form'>
                            <span className='list-add-block'>
                                <label htmlFor='listTitle'>List Title</label>
                                <input className='list-add-input' type='text' id='listTitle' name='listTitle' onChange={this.handleChange} />
                            </span>

                            <span className='list-add-block'>
                                <label htmlFor="listItem" >List Item</label>
                                <input className='list-add-input' type='text' id='listItem' name='listItem' onChange={this.handleChange} />
                            </span>

                            <span className='list-add-block'>
                                <label htmlFor='listDateCompletion'> Date for Completion</label>
                                <input type='date' className='list-add-input' id='listDateCompletion' name='listDateCompletion' onChange={this.handleChange} />
                            </span>
                            {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}

                            <Button onClick={this.handleSubmit} type='button' className='btn-save'>Save</Button>
                            <Button onClick={this.close} type='button' className='btn-save'>Close</Button>
                        </form>
                </div>

        )
    }
}

//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }
    }
}

//get values from store
const mapStateToProps = (state) => {
    return ({
        userId: state.userId,
        cookies: state.cookies,
        projectOne: state.projectOne,
        projectId: state.projectId,
        isLoading: state.isLoading
    });
};

//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ListItemAdd)