import React, { Component } from '../node_modules/react';
import './App.css';
import './classes/logIn.js'
import LogIn from './classes/logIn.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount(id) {
    fetch(`/user/${id}`)
    .then(results => {
      return results.json();
    })
    .then(res => {
      this.setState({data:res})
      console.dir(this.state.data);
    })

    }
  
  render() {
    
      return (
        <div className="App">
          <LogIn />
        </div>
      );
  }
}

export default App;
