import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Project from './project'
import LogIn from './logIn'
// import Home from './home'
import ProjectList from './projectList'
import SignUp from './signUp'
import ProjectAdd from './projectAdd'
import '../styles/main.css'
import AccountAdmin from './account'


class Main extends Component {
    //router allows components to switch out of DOM
    render() {
        const isAuth = this.props.isAuth;
        return (
            <main>
                    {isAuth ? (
                    <Switch>
                        
                        <Route exact path='/Project' render={() => (<Project {...this.props} />)} />
                        <Route exact path='/ProjectView' render={() =>(<ProjectList {...this.props}/>)}/>
                        <Route exact path='/ProjectAdd' render={() =>(<ProjectAdd {...this.props}/>)}/>
                        <Route path='/Account' render={() =>(<AccountAdmin {...this.props}/>)}/>
                    </Switch>
                    ) : (
                    <Switch>
                        <Route path='/SignUp' render={() => (<SignUp {...this.props} />)} />
                        {/* <Route path='/Home' render={() => (<Home {...this.props} />)} /> */}
                        <Route path='/Login' render={() => (<LogIn {...this.props} />)} />
                        <Route path='/' render={() => (<LogIn {...this.props} />)} />
                    </Switch>
                    )
                    }
            </main>
        )
    }
}



export default Main