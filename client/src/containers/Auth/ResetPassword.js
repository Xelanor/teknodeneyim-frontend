import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Spinner from "../../components/UI/Spinner/Spinner";

export default class ResetPassword extends Component {
  state = {
    username: "",
    password: "",
    updated: false,
    isLoading: true,
    error: false,
  };

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get(`${process.env.REACT_APP_PROXY}/reset`, {
        params: { resetPasswordToken: token },
      });
      if (response.data.message === "password reset link a-ok") {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PROXY}/updatePasswordViaEmail`,
        {
          username,
          password,
          resetPasswordToken: token,
        }
      );
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div className="w-full justify-center flex-1 px-4 py-10">
          <div className="w-full max-w-sm items-center mx-auto">
            <div className="font-semibold text-xl text-gray-900 mb-8">
              Şifre resetlenirken bir hata oluştur. Lütfen tekrar
              deneyiniz...TODO: Yönlendirme Linkleri koy
            </div>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="w-full justify-center flex-1 px-4 py-10">
          <div className="w-full max-w-sm items-center mx-auto">
            <Spinner />
          </div>
        </div>
      );
    }
    if (updated) {
      return (
        <div className="w-full justify-center flex-1 px-4 py-10">
          <div className="w-full max-w-sm items-center mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 appearance-none">
              <div className="font-semibold text-xl text-gray-900 mb-2">
                Şifreniz Başarıyla Sıfırlanmıştır.
              </div>
              <div className="font-semibold text-xl text-gray-900 mb-8">
                Yeni şifrenizle giriş yapabilirsiniz.
              </div>
              <Link to="/login">
                <button
                  className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline appearance-none"
                  type="submit"
                >
                  Giriş Yap
                </button>
              </Link>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-sm items-center mx-auto">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 appearance-none"
            onSubmit={this.updatePassword}
          >
            <div className="font-semibold text-xl text-gray-900 mb-8">
              Şifre Resetleme
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Yeni Şifre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                label="password"
                type="password"
                placeholder="Yeni Şifreniz"
                onChange={this.handleChange("password")}
                value={password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline appearance-none"
                type="submit"
              >
                Şifreyi Güncelle
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
