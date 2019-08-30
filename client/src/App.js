import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from './containers/HomePage'
import Navbar from './components/Layout/Navbar/Navbar'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;