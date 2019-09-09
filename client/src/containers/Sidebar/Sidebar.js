import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import PostsList from '../../components/PostsList/PostsList'
import Spinner from '../../components/UI/Spinner/Spinner'

import { fetchPosts } from '../../store/actions/fetchActions'

class Sidebar extends Component {
  state = {}

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    let posts
    if (this.props.posts) {
      posts = <PostsList posts={this.props.posts} />
    }
    return (
      <div className="md:w-3/12 p-4 border-r-2 border-gray-200">
        <div className="flex justify-between">
          <div className="font-semibold text-base text-gray-900">
            #Gündem
            </div>
          <div className="font-semibold text-base text-gray-900">
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

const mapStateToProps = (state) => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { fetchPosts })(Sidebar);