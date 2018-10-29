import React, {Component} from 'react'
import ListItem from './listItem'
import axios from 'axios'
import store from '../store'

class ProjectList extends Component {
    constructor() {
        super(),
        this.state = {
            Project:[],
            isLoading:true
        }
    }
    getProjectItem() {
        var config = {
            "headers": { 'Authorization': 'bearer ' + store.getState().cookies}
        }
        axios.get('/Project/' + this.props.projectId ,config)
        .then((res)=>{
            this.setState({
                Project:res.data,
                isLoading:false
            })
            console.log("RES",res.data.listItem)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount() {
        this.getProjectItem();
    }
    render() {
        console.log("HISTORY__",this.props.history.location)
        return( 
            <div>
                {/* //project list */}
                <div>
                    {/* project title and date */}
                    <div>
                    <p>Project Title and Date Item</p>
                    </div>
                    {/* project list items */}
                    <div>
                        <ListItem listItems={this.props.history.location.state}/>
                    </div>
                </div>
                {/* project edit  */}
                <div>
                    {/* project users */}
                    <div>
                        <p>Project Users</p>
                    </div>
                    
                    <div>
                        <p>Project Edit</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectList