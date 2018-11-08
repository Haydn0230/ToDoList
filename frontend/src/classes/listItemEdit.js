import React, { Component } from 'react'
import axios from 'axios'
import store from '../store'
import { connect } from 'react-redux'
import { validation } from '../utils'

class ListItemEdit extends Component {

    constructor() {
        super()
        this.state = {
            listTitle: '',
            listItem: '',
            listDateCompletion: '',
            errorMessage: ''

        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();

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

        let data = {
            _id: this.props.listItem._id,
            listOwnership: '',
            listTitle: this.state.listTitle,
            listItem: this.state.listItem,
            listDateCompletion: this.state.listDateCompletion
        }

        // loops through all list items finds the corresponding ID 
        // then overwrites the listitem object with both unchanged and changed listitems
        let newListItems = this.props.projectOne[0].listItem.filter((listItem) => {
            if (this.props.listItem._id === listItem._id) {
                //use assign as copies the elements rather than make reference to
                listItem = Object.assign(listItem, data)
            }
            return listItem
        })
       
        // push the newlistitem onto the project
        let projectOneNew = this.props.projectOne
        projectOneNew[0].listItem = newListItems

        //update the store with the new project info 
        this.props.updateProjectOne(projectOneNew)

        //send new project object with new list item to server 
        axios.put('/editList/' + this.props.projectOne[0]._id, { 'listItem': data }, config)
            .then((res) => {
        
                this.props.onChange();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        //destructure to make more readable
        const{errorMessage} = this.state
        const { listTitle, listItem, listDateCompletion, _id } = this.props.listItem
        const { featureEdit, blockEdit } = this.props;
        return (
            <React.Fragment>

                <form className={`list-edit-form ${this.props.blockEdit}`}>
                    <span className={`list-edit-block ${blockEdit}`}>
                        <label className='form-label' htmlFor='listTitle'>List Title</label>
                        <input type='text' id='listTitle' name='listTitle' placeholder={listTitle} className={`list-edit-input ${featureEdit}`} onChange={this.handleChange} />
                    </span>

                    <span className={`list-edit-block ${blockEdit}`}>
                        <label className='form-label' htmlFor="listItem" >List Item</label>
                        <input type='text' id='listItem' name='listItem' placeholder={listItem} className={`list-edit-input ${featureEdit}`} onChange={this.handleChange} />
                    </span>

                    <span className={`list-edit-block ${blockEdit}`}>
                        <label className='form-label' htmlFor='listDateCompletion'> Date for Completion</label>
                        <input type='date' id='listDateCompletion' name='listDateCompletion' className={`list-edit-input ${featureEdit}`} placeholder={listDateCompletion} onChange={this.handleChange} />
                    </span>

                    {errorMessage !== '' && <p className='error-message'>{errorMessage}</p>}
                    <button onClick={this.handleSubmit} id={_id} type='button' className='list-edit-save-btn btn-save'>Save</button>
                </form>


            </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(ListItemEdit)