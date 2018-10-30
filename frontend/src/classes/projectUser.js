import React, {Component} from 'react'

class ProjectUser extends Component {
    constructor() {
        super()
        this.state={
}
    }
    

        render() {
            const {userAccess} =this.props
            return (
                <div>
                    {userAccess.map(Users => {
                        const {firstName, lastName} = Users
                        return (
                            <div key={firstName}>
                                <p>{firstName}</p>
                                <p>{lastName}</p>
                            </div>
                        )
                    })}
                 </div>
            )
        }
    }

export default ProjectUser
