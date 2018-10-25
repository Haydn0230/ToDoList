import React, { Component } from 'react';
//import axios from 'axios';

class ListItem extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
                <div className="listItem">
                    <ul>
                        <li>List Item 1 </li>
                    </ul>
                </div>
        )
    }
}

export default ListItem;
