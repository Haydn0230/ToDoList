import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'

class ListItem extends Component {
    constructor() {
        super();
        this.state = {
            listItem:[],
            isLoading:true
        };
    }
    getListItem() {
        var config = {
            "headers": { 'Authorization': 'bearer ' + store.getState().cookies}
        }
        axios.get('/Project/' + this.props.projectId ,config)
        .then((res)=>{
            this.setState({
                listItem:res.data.listItem,
                isLoading:false
            })
            console.log("RES",res.data.listItem)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount() {
        this.getListItem();
    }
    render() {

        //console.log("LIST ITEM",listItems )
        const{isLoading, listItem} =this.state
        console.log("LIST ITEM",this.state )
        return (
                <div className="listItem">
                    {!isLoading? (
                        listItem.map(listItems => {
                            const {listTitle} = listItems
                            return (
                                <div key={listTitle}>
                                    {listTitle}
                                </div>
                            )
                        })
                    ):(
                        <p>Loading . . .</p>
                    )}
                    <ul>
                        <li>List Item 1 </li>
                    </ul>
                </div>
        )
    }
}

export default ListItem;
