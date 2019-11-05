import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchSidePosts, createPost } from '../../store/actions/fetchActions'

class CreatePost extends Component {
  state = {
    content: "",
    description: "",
    subjects: "",
    submitted: false
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmitHandler = e => {
    e.preventDefault()
    let post = {
      username: this.props.auth.user.id,
      content: this.state.content,
      description: this.state.description,
      subjects: this.state.subjects.split(','),
      state: "passive"
    }
    this.props.createPost(post)
    this.setState({ content: "", description: "", subjects: "", submitted: true })
  }

  render() {
    return (
      <div className="w-full justify-center flex-1 px-4 py-1 lg:py-10">
        <div className="w-full max-w-sm items-center mx-auto">
          {this.state.submitted ?
            <div className="font-bold text-xl text-tekno3 text-center">
              Konu açma talebiniz işleme alınmıştır. Mail ile bilgilendirme yapılacaktır. Teşekkür ederiz.
            </div> :
            <form onSubmit={this.onFormSubmitHandler}>
              <div className="font-semibold text-xl text-gray-900 mt-1 mb-4 lg:my-8">
                Konu Oluştur
            </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Konu Adı
            </label>
                <textarea
                  className="form-textarea shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="content"
                  name="content"
                  type="text"
                  rows="2"
                  placeholder="Konu Adı"
                  onChange={this.handleInputChange}
                  value={this.state.content}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Konu Açıklaması
            </label>
                <textarea
                  className="form-textarea shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  type="text"
                  rows="5"
                  placeholder="Konu Açıklaması"
                  onChange={this.handleInputChange}
                  value={this.state.description}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Hashtagler (Virgül ile ayır)
            </label>
                <textarea
                  className="form-textarea shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subjects"
                  name="subjects"
                  type="text"
                  rows="2"
                  placeholder="Konu Açıklaması"
                  onChange={this.handleInputChange}
                  value={this.state.subjects}
                />
              </div>
              <button className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                Konu Yarat
          </button>
            </form>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { fetchSidePosts, createPost })(CreatePost);