import React, { Component } from 'react';
import logo from './logo.svg';
import Thermostat from './components/Thermostat.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Please Adjust The Thermostat</h1>
        </header>
        <Thermostat />
      </div>
    );
  }
}

export default App;
