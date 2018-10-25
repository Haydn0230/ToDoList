import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Project from './project'
import LogIn from './logIn'
import Home from './home'

import '../styles/main.css'
// import { STATES } from 'mongoose';
import {withCookies} from 'react-cookie';

class Main extends Component {
    render() {
        console.log("main been called", this.props)
        return (
            <main>
                
                <Switch>
                    {/* <Route path='/Home' Component={Home} />
                    <Route path='/Login' Component={LogIn} />
                    <Route path='/Project' Component={Project} /> */}
                    <Route path='/Home' render={() => (<Home cookies={this.props.cookies} />)} /> 
                    <Route path='/Project' render={() => (<Project cookies={this.props.cookies} />)} />
                    <Route path='/login' render={() => (<LogIn cookies={this.props.cookies} />)} /> 
                </Switch>
            </main>
        )
    }
}



export default withCookies(Main)