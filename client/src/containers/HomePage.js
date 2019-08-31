import React, { Component } from 'react';
import axios from 'axios'

import PostsList from '../components/PostsList/PostsList'
import Spinner from '../components/UI/Spinner/Spinner'

class HomePage extends Component {
  state = {
    username: "",
    content: "",
    posts: null,
    data: null
  }

  componentDidMount() {
    axios.get('posts')
      .then(res => { this.setState({ posts: res.data }) })
      .catch(err => { console.log(err) })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmitHandler = async e => {
    e.preventDefault()
  }

  render() {
    let posts = <Spinner />
    if (this.state.posts) {
      posts = <PostsList posts={this.state.posts} />
    }
    return (
      <div style={{ width: '100%', }}>
        <div style={{ width: '25%', float: 'left' }}>
          <h3>Konular</h3>
          {posts}
        </div>
        <div style={{ width: '75%', float: 'right' }}>
          <div style={{ width: '50%', margin: '0 auto' }}>
            <form onSubmit={this.onFormSubmitHandler}>
              <label htmlFor="name">Yazar</label>
              <input className="u-full-width" type="text" id="name" name="username" onChange={this.handleChange}></input>
              <label htmlFor="content">Konu İsmi</label>
              <textarea className="u-full-width" type="text" id="content" name="content" onChange={this.handleChange}></textarea>
              <button className="button-primary">Konu Yarat</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;