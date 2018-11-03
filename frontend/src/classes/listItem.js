import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'
import ListItemEdit from './listItemEdit'
import ListItemAdd from './listItemAdd'
import ListItemDelete from './listItemDelete'
import CheckBox from './listItemCheckbox'
import { connect } from 'react-redux'

class ListItem extends Component {

    render() {

        console.log("List Item Called 2 ", this.props.projectOne[0])
        const { listItem } = this.props.projectOne[0]
        return (
            <div className="listItem-grid">
                {listItem.map(ListItem => {
                    const { listTitle, _id, listItem, listDateCompletion, listItemCompleted
                    } = ListItem
                    return (
                        <div className='listItem-container'>
                            <div className ='listBox'key={listTitle}>
                            <ul className ='listBox-ul'>
                                <li>{listTitle}</li>
                                <li>{listItem}</li>
                                <li>{listDateCompletion}</li>
                                <li className='checkBox'><CheckBox id={_id} value={listItemCompleted}/></li>
                                <li><ListItemDelete listItemId={_id} /></li>
                            </ul>
                            </div>
                            <div className='listFeatures' key={_id}>
                                 <ListItemEdit listItem={ListItem} />
                            </div>
                        </div>
                    )
                })}
                <div className='listAdd'>
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
