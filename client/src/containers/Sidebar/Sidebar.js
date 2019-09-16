import React, { Component } from 'react';
import { connect } from 'react-redux'

import PostsList from '../../components/PostsList/PostsList'

import { fetchSidePosts } from '../../store/actions/fetchActions'

class Sidebar extends Component {
  state = {}

  componentDidMount() {
    this.props.fetchSidePosts()
  }

  render() {
    let posts
    if (this.props.posts) {
      posts = <PostsList posts={this.props.posts} />
    }
    return (
      <div className="md:w-3/12 p-4 border-r-2 border-gray-200">
        <div className="flex justify-between">
          <div className="mb-4 font-semibold text-base text-gray-900">
            En Son Gelişmeler
            </div>
          {/* <div className="font-semibold text-base text-gray-900">
            #Popüler
            </div> */}
        </div>
        <>
          {posts}
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.sidebarposts
})

export default connect(mapStateToProps, { fetchSidePosts })(Sidebar);