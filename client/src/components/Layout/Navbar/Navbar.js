import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Navbar.css'

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div class="navBar" id="mainNavBar">
        <Link to="/" className="Logo">Tekno Sözlük</Link>
        <Link to="/" className="Item">Konu Yarat</Link>
        <Link to="/" className="Item">Kayıt Ol</Link>
        <Link to="/" className="Item">Giriş</Link>
      </div>
    );
  }
}

export default Navbar