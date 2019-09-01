import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../../store/actions/authentication';

import logo from '../../../assets/logo.png'
import './Navbar.css'

class Navbar extends Component {
  state = {
    searchText: ""
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  onSearchSubmit = e => {
    e.preventDefault()
    let searchText = this.state.searchText
    this.setState({ searchText: "" })
    if (searchText.length !== 0) {
      this.props.history.push("/search/" + searchText)
    }
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <>
        <Link to="#" className="Item" onClick={this.onLogoutClick}>Çıkış Yap</Link>
        <Link to='/profil' ><img src={user.avatar} alt={user.name} title={user.name}
          className="Image"
          style={{ width: '60px', marginRight: '5px' }} /></Link>
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
        <form onSubmit={this.onSearchSubmit}>
          <input type="text" placeholder="Search.." value={this.state.searchText} onChange={this.onSearchChange}></input>
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
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