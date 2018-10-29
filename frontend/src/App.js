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
      return (
        <div className="App">
          <NavBar {...this.props} />
          <Main {...this.props}/>
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps ) => {
  return ({
    userId: state.userId,
    projectId:state.projectId,
    isAuth:state.isAuth,
    cookies:state.cookies,
    navigation: ownProps.history
  });
};

const mapDispatchToProps =(dispatch) => {
  return {
    deleteUserSession:(userId) => {dispatch({type:'DELETE_POST', userId:userId})}
  }
}
//export default  (App)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
