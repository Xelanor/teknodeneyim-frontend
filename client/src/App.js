import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store'

import HomePage from './containers/HomePage'
import Navbar from './components/Layout/Navbar/Navbar'
import Register from './containers/Auth/Register'
import Login from './containers/Auth/Login'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;