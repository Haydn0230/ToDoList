import React, { Component } from 'react';
import ListItemEdit from './listItemEdit'
import ListItemDelete from './listItemDelete'
import CheckBox from './listItemCheckbox'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormatDate } from '../utils'

class SingleListItem extends Component {
    constructor() {
        super()
        this.state = {
            isEditable: 'editFormOff',
            isFeaturesEditable: 'editForm-features-off',
            isBlockOff: 'editForm-block-off'
        }
    }

    handleEdit = (e) => {

        //change the state to show editable screen
        if (this.state.isEditable === 'editFormOff') {
            this.setState({
                isEditable: 'editFormOn',
                isFeaturesEditable: '',
                isBlockOff: ''
            });
        } else {
            this.setState({
                isEditable: 'editFormOff',
                isFeaturesEditable: 'editForm-features-off',
                isBlockOff: 'editForm-block-off'
            });
        }
    }

    render() {
        const { listTitle, _id, listItem, listDateCompletion, listItemCompleted
        } = this.props.ListItem
        return (
            <div className='listItem-container'>
                <div className='listBox' key={listTitle}>
                    <div className='listBox-ul-container'>
                        <ul className='listBox-ul'>
                            <li>{listTitle}</li>
                            <li>{listItem}</li>
                            <li>{FormatDate(listDateCompletion)}</li>
                            <li className='checkBox'><CheckBox id={_id} value={listItemCompleted} /></li>
                        </ul>
                    </div>
                    <div className='listItem-btn-group'>
                        <ListItemDelete listItemId={_id} />
                        <button onClick={this.handleEdit} className='list-button-edit' ><FontAwesomeIcon icon='pencil-alt' /></button>
                    </div>
                </div>
                <div className={`list-features ${this.state.isEditable}`} key={_id}>
                    <ListItemEdit featureEdit={this.state.isFeaturesEditable}
                        blockEdit={this.state.isBlockOff} listItem={this.props.ListItem} onChange={this.handleEdit} />
                </div>

            </div>


        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const mapStateToProps = (state) => {
    return ({
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleListItem);
