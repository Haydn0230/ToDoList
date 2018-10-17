import React, { Component } from '../node_modules/react';
import './App.css';
import './classes/logIn.js'
import NavBar from './classes/navBar';
import Footer from  './classes/footer';
import Main from './classes/main'

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
          <NavBar />
          <Main />
          <Footer />
        </div>
      );
  }
}

export default App;
