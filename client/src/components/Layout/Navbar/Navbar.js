import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../../store/actions/authentication';

import logo from '../../../assets/logo.png'
import './Navbar.css'

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <>
        <Link to="#" className="Item" onClick={this.onLogoutClick}>Çıkış Yap</Link>
        <img src={user.avatar} alt={user.name} title={user.name}
          className="Image"
          style={{ width: '60px', marginRight: '5px' }} />
      </>
    )
    const guestLinks = (
      <>
        <Link to="/register" className="Item">Kayıt Ol</Link>
        <Link to="/login" className="Item">Giriş</Link>
      </>
    )
    return (
      <div className="navBar" id="mainNavBar">
        <Link to="/" className="Item">Konu Yarat</Link>
        {isAuthenticated ? authLinks : guestLinks}
        <Link to="/" className="Logo"><img src={logo} alt="Logo" height="57" /></Link>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));