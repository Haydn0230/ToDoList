import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Project from './project'
import LogIn from './logIn'
import Home from './home'
// import ProtectedRoute from '../utils'

import '../styles/main.css'


class Main extends Component {
    protectedRoute = (TagName) => {
        
        return (
            !this.props.userId ?
                <Route path='/login' render={() => (<LogIn {...this.props} />)} />
                :
                <Route path={'/' + TagName} render={() => (
                    <TagName {...this.props} />
                )} />
        )
    }
    render() {
        
        return (
            <main>
                <Switch>
                    {this.protectedRoute(Home)}
                    {/* <Route path='/Home' render={() => (<Home {...this.props} />)} /> */}
                    {/* <Route path='/Project' render={() => (<Project {...this.props} />)} /> */}
                    {/* <Route path='/login' render={() => (<LogIn {...this.props} />)} /> */}
                    {this.protectedRoute('LogIn')}
                    {this.protectedRoute('Project')}
                </Switch>
            </main>
        )
    }
}



export default Main