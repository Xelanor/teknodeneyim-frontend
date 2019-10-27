import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom'

import HomepagePosts from '../components/PostsList/HomepagePosts'
import Loading from '../components/UI/Loading/HomeLoading/HomeLoading'

import { likeHomepageComment } from '../store/actions/likeAction'
import { fetchHomePosts } from '../store/actions/fetchActions'

class HomePage extends Component {
  state = {}

  componentDidMount() {
    this.props.fetchHomePosts()
  }

  onCommentLiked = async (commentId) => {
    if (this.props.auth.isAuthenticated) {
      await this.props.likeHomepageComment(commentId, this.props.auth.user.id)
    } else {
      this.props.history.push("/login")
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
    } else {
      posts = Array(5).fill().map(Math.random).map(a => {
        return <Loading />
      })
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts.posts
})

export default withRouter(connect(mapStateToProps, { fetchHomePosts, likeHomepageComment })(HomePage));