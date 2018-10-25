import React, { Component } from '../node_modules/react';
import './App.css';
import './classes/logIn.js'
import NavBar from './classes/navBar';
import Footer from  './classes/footer';
import Main from './classes/main';
import { connect } from 'react-redux';
import { withRouter } from '../node_modules/react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }
  
  

  render() {
    console.log(this.props)
      return (
        <div className="App">
          <NavBar navigation ={this.props}/>
          <Main navigation ={this.props}/>
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
      state: state,
      cookies: ownProps.cookies,
  });
};
//export default  (App)
export default withRouter(connect(mapStateToProps)(App))
