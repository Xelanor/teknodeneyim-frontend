import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../store/actions/authentication';
import classnames from 'classnames'

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state
    return (
      <div className="w-full justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-sm items-center mx-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
            <div className="font-semibold text-xl text-gray-900 mb-8">
              Kayıt Ol
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Kullanıcı Adı
            </label>
              <input
                className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { 'border-red-500 mb-3': errors.username })}
                id="username"
                name="username"
                type="text"
                placeholder="Kullanıcı Adı"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
              {errors.username && (<div className="text-red-500 text-xs italic">{errors.username}</div>)}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                E-mail
            </label>
              <input
                className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { 'border-red-500 mb-3': errors.email })}
                id="email"
                name="email"
                type="email"
                placeholder="E-mail adresi"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && (<div className="text-red-500 text-xs italic">{errors.email}</div>)}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
              <input
                className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { 'border-red-500 mb-3': errors.password })}
                id="password"
                name="password"
                type="password"
                placeholder="**************"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (<div className="text-red-500 text-xs italic">{errors.password}</div>)}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
              <input
                className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { 'border-red-500 mb-3': errors.password_confirm })}
                id="password_confirm"
                name="password_confirm"
                type="password"
                placeholder="**************"
                onChange={this.handleInputChange}
                value={this.state.password_confirm}
              />
              {errors.password_confirm && (<div className="text-red-500 text-xs italic">{errors.password_confirm}</div>)}
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                Kayıt Ol
            </button>
              <a className="inline-block align-baseline font-bold text-sm text-tekno hover:text-tekno">
                Zaten Üye Misin?
            </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))