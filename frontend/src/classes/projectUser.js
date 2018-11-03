import React, {Component} from 'react'
import {connect} from 'react-redux'
class ProjectUser extends Component {
    constructor() {
        super()
        this.state={
}
    }
    

        render() {
            console.log("Project User Called")
            const {userAccess} =this.props.projectOne[0]
            return (
                <div className='userContainer'>
                    {userAccess.map(Users => {
                        const {firstName, lastName} = Users
                        return (
                            <div className='userCircle' key={firstName}>
                                <p>{firstName}</p>
                                <p>{lastName}</p>
                            </div>
                        )
                    })}
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
        });
      };
export default connect(mapStateToProps)(ProjectUser)
