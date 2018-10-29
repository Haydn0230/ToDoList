import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Project from './project'
import LogIn from './logIn'
import Home from './home'
import ProjectList from './projectList'


import '../styles/main.css'


class Main extends Component {

    render() {
        const isAuth = this.props.isAuth;
        return (
            <main>
                    {isAuth ? (
                    <Switch>
                        <Route path='/Home' render={() => (<Home {...this.props} />)} />
                        <Route path='/Project' render={() => (<Project {...this.props} />)} />
                        <Route path='/ProjectView' render={() =>(<ProjectList {...this.props}/>)}/>
                    </Switch>
                    ) : (
                    <Switch>
                        <Route path='/Home' render={() => (<Home {...this.props} />)} />
                        <Route path='/Login' render={() => (<LogIn {...this.props} />)} />
                    </Switch>
                    )
                    }
            </main>
        )
    }
}



export default Main