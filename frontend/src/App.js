import React, { Component } from '../node_modules/react';
import './classes/logIn.js'
import NavBar from './classes/navBar';
import Footer from  './classes/footer';
import Main from './classes/main';
import { connect } from 'react-redux';
import { withRouter } from '../node_modules/react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserMinus , faUserPlus, faTrash, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SideBar from './classes/navSideBar';
import Backdrop from './classes/backdrop';

//adds font icons to font library to be used later
library.add( faUserMinus, faUserPlus,faTrash,faPencilAlt,faPlusCircle)

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
    };
  }
  
  toggleSideBar = () => {
    this.props.setSideBar((prevState) => {
      return {sideBarOpen: !prevState.sideBarOpen}
    })
  };

  render() {
    const {sideBarOpen} = this.props
      return (
        <div className="App">
          <NavBar toggleSideBar={this.toggleSideBar} />
          {sideBarOpen && <SideBar toggleSideBar={this.toggleSideBar} />}
          {sideBarOpen && <Backdrop toggleSideBar={this.toggleSideBar}/>}
          <Main {...this.props}/>
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps ) => {
  return ({
    sideBarOpen:state.sideBarOpen,
    userId: state.userId,
    projects:state.projects,
    projectId:state.projectId,
    isAuth:state.isAuth,
    cookies:state.cookies,
    navigation: ownProps.history
  });
};

const mapDispatchToProps =(dispatch) => {
  return {
    setSideBar:(sideBarOpen) => {dispatch({type:'SET_SIDEBAR', sideBarOpen:sideBarOpen})},
    deleteUserSession:(userId) => {dispatch({type:'DELETE_POST', userId:userId})}
  }
}
//export default  (App)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
