import React, { Component } from 'react';
import axios from 'axios'

class EditPost extends Component {
  state = {
    post: null,
  }

  async componentDidMount() {
    await axios.get('/posts/post/' + this.props.match.params.id)
      .then(res => this.setState({ post: res.data }))
      .catch(err => { console.log(err) })
    let subjects = this.state.post.subjects.join(',')
    let post = { ...this.state.post }
    post.subjects = subjects
    this.setState({ post })
  }

  handleInputChange = e => {
    let post = { ...this.state.post }
    let target = e.target.name
    post[target] = e.target.value
    this.setState({ post })
  }

  onFormSubmitHandler = e => {
    e.preventDefault()
    let post = {
      postId: this.state.post._id,
      content: this.state.post.content,
      description: this.state.post.description,
      subjects: this.state.post.subjects.split(',')
    }
    axios.post('/admin/posts/edit', post)
      .then(res => console.log(res))
      .catch(err => { console.log(err) })
    this.props.history.push("/admin")
    window.location.reload();
  }

  render() {
    return (
      <div className="w-full justify-center flex-1 p-4">
        <div className="w-full max-w-sm items-center mx-auto">
          {this.state.post ?
            (
              <form onSubmit={this.onFormSubmitHandler}>
                <div className="font-semibold text-xl text-gray-900 my-8">
                  Konuyu Düzenle
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
                    value={this.state.post.content}
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
                    value={this.state.post.description}
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
                    value={this.state.post.subjects}
                  />
                </div>
                <button className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Konuyu Düzenle
                </button>
              </form>
            ) : null}
        </div>
      </div>
    );
  }
}

export default EditPost;

