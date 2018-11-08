import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import { connect } from 'react-redux'
import project from './project';
import { Button, Modal } from 'semantic-ui-react'
import _ from 'lodash'
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
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,

        });

    }

    componentDidMount() {
        //set list ownership
        this.setState({
            listOwnership: this.props.userId
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        //call validation 
        const errors = validation(this.state);
        if (errors !== '') {
            this.setState({
                errorMessage: errors + ' required'
            })
            return
        }
        var config = {
            "headers": { 'Authorization': 'bearer ' + this.props.cookies }
        }

        const data = {
            listOwnership: '',
            listTitle: this.state.listTitle,
            listItem: this.state.listItem,
            listItemCompleted: false,
            listDateCompletion: this.state.listDateCompletion
        }

        //duplicate projectOne
        let projectOneNew = this.props.projectOne

        axios.put('/addList/' + this.props.projectOne[0]._id, { 'listItem': data }, config)
            .then((res) => {

                //assign new listitem array to projectOne.ListItem 
                projectOneNew[0].listItem = res.data.listItem;
                console.log("res.data.listItem", res.data.listItem)
                //call reducer to update project in store
                this.props.updateProjectOne(projectOneNew);
                this.close();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    close = () => {
        this.props.addListItem()
    };

    render() {


        //destructure state for readability
        const { errorMessage } = this.state
        const inlineStyle = {
            modals: {
                position: 'relative',
                marginTop: '0px !important',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        };
        const props = {
            open: true,
            style: inlineStyle,
        };
        return (
            // <Modal {...props} >
                <div className='list-add-container'>
                    {/* <Modal.Header> */}
                        <h2>Add Item</h2>
                    {/* </Modal.Header>
                    <Modal.Content> */}
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
                    {/* </Modal.Content> */}
                </div>
            /* </Modal> */
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
        userId: state.userId,
        cookies: state.cookies,
        projectOne: state.projectOne,
        projectId: state.projectId,
        isLoading: state.isLoading
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItemAdd)