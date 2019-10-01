import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchSidePosts, createPost } from '../../store/actions/fetchActions'

class CreatePost extends Component {
  state = {
    content: "",
    description: "",
    subjects: ""
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
      subjects: this.state.subjects.split(',')
    }
    this.props.createPost(post)
    this.setState({ content: "", description: "", subjects: "" })
    this.props.fetchSidePosts()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmitHandler}>
          <div className="font-semibold text-xl text-gray-900 my-8">
            Konu Oluştur
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Konu Adı
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              name="content"
              type="text"
              placeholder="Konu Adı"
              onChange={this.handleInputChange}
              value={this.state.content}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Konu Açıklaması
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type="text"
              placeholder="Konu Açıklaması"
              onChange={this.handleInputChange}
              value={this.state.description}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Hashtagler (Virgül ile ayır)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subjects"
              name="subjects"
              type="text"
              placeholder="Konu Açıklaması"
              onChange={this.handleInputChange}
              value={this.state.subjects}
            />
          </div>
          <button className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
            Konu Yarat
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { fetchSidePosts, createPost })(CreatePost);