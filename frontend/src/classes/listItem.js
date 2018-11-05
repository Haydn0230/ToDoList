import React, { Component } from 'react';
import ListItemEdit from './listItemEdit'
import ListItemAdd from './listItemAdd'
import ListItemDelete from './listItemDelete'
import CheckBox from './listItemCheckbox'
import { connect } from 'react-redux'
import SingleListItem from './singleListItem'

class ListItem extends Component {
    constructor() {
        super()
        this.state = {
            isEditable: 'editFormOff'
        }
    }

    // handleEdit = (e) => {
    //     e.preventDefault();

    //     //change the state to show editable screen
    //     if (this.state.isEditable === 'editFormOff') {
    //         this.setState({
    //             isEditable: 'editFormOn'
    //         });
    //     } else {
    //         this.setState({
    //             isEditable: 'editFormOff'
    //         });
    //     }
    // }

    render() {
        const { listItem } = this.props.projectOne[0]
        return (
            <div className="listItem-grid">
                {listItem.map(ListItem => {
                    const { listTitle, _id, listItem, listDateCompletion, listItemCompleted
                    } = ListItem
                    return (
                        <SingleListItem ListItem={ListItem}/>
                        // <div className='listItem-container'>
                        //     <div className='listBox' key={listTitle}>
                        //         <ul className='listBox-ul'>
                        //             <li>{listTitle}</li>
                        //             <li>{listItem}</li>
                        //             <li>{listDateCompletion}</li>
                        //             <li className='checkBox'><CheckBox id={_id} value={listItemCompleted} /></li>
                        //             <li><ListItemDelete listItemId={_id} /></li>
                        //             <li>
                        //                 <button onClick={this.handleEdit} className={`list-button `}  >
                        //                     <img className='list-icon' src='/media/edit.svg' alt='edit' />
                        //                 </button>
                        //             </li>
                        //         </ul>
                        //     </div>
                        //     <div className={`list-features ${this.state.isEditable}`} key={_id}>
                        //         <ListItemEdit listItem={ListItem} isEditable={this.state.isEditable} />
                        //     </div>
                        // </div>
                    )
                })}
                <div className='list-add'>
                    <ListItemAdd />
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
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
