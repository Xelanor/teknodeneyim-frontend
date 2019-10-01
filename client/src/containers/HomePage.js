import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import HomepagePosts from '../components/PostsList/HomepagePosts'

import { likeComment } from '../store/actions/likeAction'
import { fetchHomePosts } from '../store/actions/fetchActions'

class HomePage extends Component {
  state = {}

  componentDidMount() {
    this.props.fetchHomePosts()
  }

  onCommentLiked = (commentId) => {
    if (this.props.auth.isAuthenticated) {
      this.props.likeComment(commentId, this.props.auth.user.id)
      this.props.fetchHomePosts()
    }
  }

  render() {
    let posts
    if (this.props.posts) {
      posts = <HomepagePosts
        posts={this.props.posts}
        commentLike={this.onCommentLiked}
        user={this.props.auth.isAuthenticated ? this.props.auth.user.id : ""}
      />
    }
    return (
      <div className="flex-1 px-4 pb-3 lg:py-3">
        <div className="flex mb-4">
          <div className="font-bold text-3xl text-tekno3">
            En Güncel Deneyimler
          </div>
        </div>
        {posts}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts.posts
});

export default withRouter(connect(mapStateToProps, { fetchHomePosts, likeComment })(HomePage));