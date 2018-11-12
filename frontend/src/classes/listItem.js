import React, { Component } from 'react';
import ListItemAdd from './listItemAdd'
import { connect } from 'react-redux'
import SingleListItem from './singleListItem'

class ListItem extends Component {
    constructor() {
        super()
        this.state = {
            isEditable: 'editFormOff',
            addFormVisible:false
        }
    }

    filterListItems = (listItems) => {
        const { filter } = this.props;
        const filteredList = [];

        //loop through listItems array to create new list based on filter
        listItems.forEach(listItem => {

             let listItemStatus = listItem.listItemCompleted

            //convert the boolean to something understandable
            if (listItemStatus === true) {
                listItemStatus = 'COMPLETED';
            } else if (listItemStatus === false) {
                listItemStatus = 'TO_DO';
            }
            if (filter === listItemStatus || filter === 'ALL') {
                return filteredList.push(listItem);
            }
        });

        //return filtered list
        return filteredList;
    }

    //toggles the add list form
    addListItem = () =>{
        this.setState({
            addFormVisible:!this.state.addFormVisible
        });
    }

    render() {
        //set addlistform equal to list add component
        const { listItem } = this.props.projectOne[0]
        //push the list through a filter
        const filteredListItem = this.filterListItems(listItem)
        return (
  
            <div className="listItem-grid">
                
                <div className='list-add'>
                    <button onClick={this.addListItem} className='btn-save'>Add List Item</button>
                    {this.state.addFormVisible && <ListItemAdd addListItem={this.addListItem}/>}
                </div>
                {filteredListItem.map(ListItem => {
                    const { listTitle, _id, listItem, listDateCompletion, listItemCompleted
                    } = ListItem
                    return (
                        <SingleListItem ListItem={ListItem} />
                    )
                })}

            </div>

            
        )
    }
}
//create functions to write to store
const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (filter) => { dispatch({ type: 'SET_FILTER', filter }) }
    }
}
//get values from store
const mapStateToProps = (state) => {
    return ({
        filter: state.filter,
        cookies: state.cookies,
        projectOne: state.projectOne,
        state: state
    });
};

//wrap component in connect function to connect to store
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
