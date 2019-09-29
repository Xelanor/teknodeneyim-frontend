import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../../store/actions/authentication';
import NavbarLinks from './NavbarLinks'
import SearchFunction from '../../../containers/Search/SearchFunction'

import logo from '../../../assets/logo1.png'

class Navbar extends Component {
  NavBarLinks = [
    {
      content: "AkıllıTelefon",
      to: "akıllıtelefon",
      title: "Akıllı Telefonlar"
    },
    {
      content: "Bilgisayar",
      to: "bilgisayar",
      title: "Bilgisayarlar"
    },
    {
      content: "Donanım",
      to: "donanim",
      title: "Donanım Ürünleri"
    },
    {
      content: "Mağazalar",
      to: "magazalar",
      title: "Mağazalar"
    },
    {
      content: "Yazılım",
      to: "yazılım",
      title: "Yazılım"
    }
  ]

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div className="flex flex-row-reverse">
        <Link to="#" className="inline-block text-base px-4 py-2 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent" onClick={this.onLogoutClick}>Çıkış Yap</Link>
        <Link to={{ pathname: "/profil/" + user.username }} >
          <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="w-10 h-10 rounded-full mx-4"
          />
        </Link>
      </div>
    )
    const authLinksMobile = (
      <div className="flex flex-row-reverse">
        <Link to="#" className="inline-block text-xs px-1 py-1 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent" onClick={this.onLogoutClick}>Çıkış Yap</Link>
        <Link to={{ pathname: "/profil/" + user.username }} >
          <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="w-6 h-6 rounded-full mx-1"
          />
        </Link>
      </div>
    )
    const guestLinks = (
      <>
        <Link to="/login" className="inline-block text-base px-4 py-2 mr-4 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent mt-2 lg:mt-0">Giriş</Link>
        <Link to="/register" className="inline-block text-base px-4 py-2 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent mt-2 lg:mt-0">Kayıt Ol</Link>
      </>
    )
    const guestLinksMobile = (
      <>
        <Link to="/login" className="inline-block text-xs px-1 py-1 mr-1 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent">Giriş</Link>
        <Link to="/register" className="inline-block text-xs px-1 py-1 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent">Kayıt Ol</Link>
      </>
    )
    return (
      <div className="border-b-2 border-gray-200 mb-2" id="mainNavBar">
        <nav className="hidden md:flex items-center justify-between flex-wrap bg-transparent p-1">
          <div className="flex items-center justify-center flex-shrink-0 pr-8 text-white w-1/4">
            <Link to="/">
              <img
                src={logo}
                alt="some text"
                width="145"
                height="40"
              />
            </Link>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center md:w-auto">
            <SearchFunction class="outline-none bg-purple-white shadow rounded-full border border-solid border-gray-400 p-2 pr-16 focus:border-tekno" />
          </div>
          <div className="inline-flex">
            <div>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
        <nav className="flex md:hidden items-center justify-between flex-wrap bg-transparent p-1">
          <div className="flex items-center justify-center flex-shrink-0 mr-2 text-white">
            <Link to="/">
              <img
                src={logo}
                alt="some text"
                width="70"
                height="40"
              />
            </Link>
          </div>
          <div className="block flex-grow flex items-center w-auto">
            <SearchFunction class="outline-none bg-purple-white shadow rounded-full text-xs border border-solid border-gray-400 p-1 pr-2 focus:border-tekno appearance-none" />
          </div>
          {isAuthenticated ? authLinksMobile : guestLinksMobile}
        </nav>
        <nav id="headers" className="container mx-auto px-2 mt-3">
          <ul className="flex items-stretch justify-between w-full mx-1 px-1 md:px-16">
            {this.NavBarLinks.map(link => {
              return (
                <NavbarLinks key={link.to} to={link.to} title={link.title} content={link.content} />
              )
            })}
          </ul>
        </nav>
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