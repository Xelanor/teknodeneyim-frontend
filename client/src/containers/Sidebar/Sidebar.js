import React, { Component } from 'react';
import axios from 'axios'

import PostsList from '../../components/PostsList/PostsList'
import Spinner from '../../components/UI/Spinner/Spinner'

class Sidebar extends Component {
  state = {
    posts: null,

  }
  componentDidMount() {
    axios.get('/posts')
      .then(res => { this.setState({ posts: res.data }) })
      .catch(err => { console.log(err) })
  }

  render() {
    let posts = <Spinner />
    if (this.state.posts) {
      posts = <PostsList posts={this.state.posts} />
    }
    return (
      <div>
        <div style={{ width: '25%', float: 'left' }}>
          <h3>Konular</h3>
          {posts}
        </div>
      </div>
    );
  }
}

export default Sidebar;