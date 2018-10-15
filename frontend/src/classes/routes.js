import {Routes, Route, Link} from 'react-router';
import React, { Component } from '../node_modules/react';
import LogIn from './classes/logIn.js';

class SiteRoutes extends Component {
render(){
    return (
             <Router>
                <Route path ={'/login'} component ={LogIn}></Route> 
            </Router>
        );
    }

}

export default Router;