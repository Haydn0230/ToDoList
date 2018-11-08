import React, { Component } from 'react'
// import axios from 'axios'
// import store from '../store'
// import { connect } from 'react-redux'
// import project from './project';
import {Button, Modal} from 'semantic-ui-react'

class ErrorModal extends Component {
    constructor() {
        super()
        this.state = {
            open:true
        }
    }
    close = () => {
        this.props.addListItem()
    };

    render() {
        const inlineStyle = {
            Modal: {
                position: 'relative',
                marginTop: '0px !important',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        };
        const props = {
            open:true,
            closeOnRootNodeClick: true,
            style: inlineStyle,
        };
        return (
            <Modal {...props} >
            <div className='error-modal'>
                <Modal.Header>
                    <h2>{this.props.errorMessage}</h2>
                </Modal.Header>
                <Modal.Content>
                

                    <Button onClick={this.close} type='button'>Close</Button>
                
                </Modal.Content>
            </div>
            </Modal>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateProjectOne: (projectOne) => { dispatch({ type: 'UPDATE_PROJECT_ONE', projectOne }) }
//     }
// }

// const mapStateToProps = (state ) => {
//     return ({
//         cookies:state.cookies,
//         projectOne:state.projectOne,
//         projectId: state.projectId,
//         isLoading:state.isLoading
//     });
//   };
export default ErrorModal