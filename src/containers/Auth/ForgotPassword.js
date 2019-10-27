/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'

class ForgotPassword extends Component {
  state = {
    email: '',
    showError: false,
    messageFromServer: '',
    showNullError: false,
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgotPassword`, { email })
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

    return (
      <div className="w-full justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-sm items-center mx-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 appearance-none" onSubmit={this.sendEmail}>
            <div className="font-semibold text-xl text-gray-900 mb-8">
              Şifremi Unuttum
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                E-posta Adresi
              </label>
              <input
                className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { 'border-red-500 mb-3': showNullError, 'border-red-500 mb-3': showError, 'border-tekno3 mb-3': messageFromServer })}
                id="email"
                label="email"
                name="email"
                type="text"
                placeholder="E-posta Adresi"
                onChange={this.handleChange('email')}
                value={email}
              />
              {showNullError && (<div className="text-red-500 text-xs italic">E-posta adresi boş bırakılamaz.</div>)}
              {showError && (<div className="text-red-500 text-xs italic">Bu E-posta adresi kayıtlı değildir. Lütfen tekrar deneyin veya üye olun.</div>)}
              {messageFromServer && (<div className="text-tekno3 text-sm font-medium">Şifre sıfırlama E-postası başarıyla gönderilmiştir!</div>)}
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline appearance-none" type="submit">
                Şifre Sıfırlama E-postası Gönder
            </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;