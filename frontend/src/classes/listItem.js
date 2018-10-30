import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'
import ListItemEdit from './listItemEdit'
import ListItemAdd from './listItemAdd'
import ListItemDelete from './listItemDelete'

class ListItem extends Component {
    constructor() {
        super();
        this.state = {
            listItem: [],
            isLoading: true
        };
    }

    // getListItem() {
    //     var config = {
    //         "headers": { 'Authorization': 'bearer ' + store.getState().cookies}
    //     }
    //     axios.get('/Project/' + this.props.projectId ,config)
    //     .then((res)=>{
    //         this.setState({
    //             listItem:res.data.listItem,
    //             isLoading:false
    //         })
    //         console.log("RES",res.data.listItem)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

    // componentDidMount() {
    //     this.getListItem();
    // }
    render() {
        const { listItems } = this.props
        
        return (
            <div className="listItem">
                {listItems.map(listItem => {
                    const { listTitle,_id } = listItem
                    return (
                        <div>
                            <div key={listTitle}>
                                {listTitle}
                            </div>
                            <div key={_id}>
                                <ListItemEdit listItem={listItem} getProjectItem={this.props.getProjectItem} />
                                <ListItemDelete listItemId={_id} />
                            </div>
                        </div>
                    )
                })}
                <ListItemAdd project={this.props} getProjectItem={this.props.getProjectItem} />
                <ul>
                    <li>List Item 1 </li>
                </ul>
            </div>
        )
    }
}

export default ListItem;
