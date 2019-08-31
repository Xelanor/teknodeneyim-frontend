import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store'

import HomePage from './containers/HomePage'
import Navbar from './components/Layout/Navbar/Navbar'
import Register from './containers/Auth/Register'
import Login from './containers/Auth/Login'
import PostDetail from './containers/Post/PostDetail'
import './App.css'

import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './store/actions/authentication'
import Sidebar from './containers/Sidebar/Sidebar';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Sidebar />
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path='/posts/:id' component={PostDetail} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;