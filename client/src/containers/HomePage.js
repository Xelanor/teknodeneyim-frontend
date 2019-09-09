import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import HomepagePosts from '../components/PostsList/HomepagePosts'
import Spinner from '../components/UI/Spinner/Spinner'

import { fetchPosts } from '../store/actions/fetchActions'

class HomePage extends Component {
  state = {}

  componentDidMount() {
    this.props.fetchPosts()
  }

  onCommentLiked = async (commentId) => {
    if (this.props.auth.isAuthenticated) {
      const userId = this.props.auth.user.id
      let likeSuccessful = false
      let like = {
        userId: userId,
      }
      await axios.post('/comments/' + commentId + '/like', like)
        .then(res => { })
        .catch((error) => { console.log(error); })
    }
    this.getData()
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
      <div className="flex-1">
        {posts}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts.posts
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(HomePage));