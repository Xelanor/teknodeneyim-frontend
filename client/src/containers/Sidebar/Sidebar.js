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
      <div className="md:w-3/12 p-4 border-r-2 border-gray-200">
        <div className="flex justify-between">
          <div class="font-semibold text-base text-gray-900">
            #Gündem
            </div>
          <div class="font-semibold text-base text-gray-900">
            #Popüler
            </div>
        </div>
        <>
          {posts}
        </>
      </div>
    );
  }
}

export default Sidebar;