import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Project from './project'
import LogIn from './logIn'
import Home from './home'

const Main = () => (
    <main>
        <Switch>
            <Route path='/Home' component={Home}/>
            <Route path='/Project' component={Project}/>
            <Route path='/login' component={LogIn}/>
        </Switch>
    </main>
)

export default Main