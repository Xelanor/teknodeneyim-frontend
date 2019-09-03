import React, { Component } from 'react';
import axios from 'axios'

import HomepagePosts from '../components/PostsList/HomepagePosts'
import Spinner from '../components/UI/Spinner/Spinner'

class HomePage extends Component {
  state = {
    posts: null,
  }

  componentDidMount() {
    axios.get('/posts/homepage')
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
      posts = <HomepagePosts posts={this.state.posts} />
    }
    return (
      <div className="flex-1">
        {posts}
      </div>
    );
  }
}

export default HomePage;