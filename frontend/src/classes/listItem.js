import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'
import ListItemEdit from './listItemEdit'
import ListItemAdd from './listItemAdd'
import ListItemDelete from './listItemDelete'
import {connect} from 'react-redux'
class ListItem extends Component {

    render() {
        console.log("List Item Called", this.props)
        const { listItem } = this.props.projectOne[0]
        return (
            <div className="listItem">
                {listItem.map(listItem => {
                    const { listTitle,_id } = listItem
                    return (
                        <div>
                            <div key={listTitle}>
                                {listTitle}
                            </div>
                            <div key={_id}>
                                <ListItemEdit listItem={listItem} />
                                <ListItemDelete listItemId={_id} />
                            </div>
                        </div>
                    )
                })}
                <ListItemAdd   />
                <ul>
                    <li>List Item 1 </li>
                </ul>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const mapStateToProps = (state ) => {
    return ({
      cookies:state.cookies,
      projectOne:state.projectOne,
      state:state
    });
  };
export default connect(mapStateToProps,mapDispatchToProps)(ListItem);
