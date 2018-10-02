import React, { Component } from '../node_modules/react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    fetch('/todoall')
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
          {this.componentDidMount()}
          {this.state.data.map((item,index)=> (
            <p>{item.userName}</p>
          ))}
        </div>
      );
  }
}

export default App;
