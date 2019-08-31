import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";

import Spinner from '../../components/UI/Spinner/Spinner'
import NewComment from '../../components/Comments/Comment/NewComment'
import Comments from '../../components/Comments/Comments'

class PostDetail extends Component {
  state = {
    postId: "",
    post: null,
    comment: ""
  }

  componentDidMount() {
    const postId = this.props.match.params.id
    this.setState({ postId })
    axios.get('/posts/' + postId)
      .then(res => { this.setState({ post: res.data }) })
      .catch(err => { console.log(err) })
  }

  onSubmitComment = async (e) => {
    e.preventDefault()
    let comment = {
      username: this.props.auth.user.id,
      content: this.state.comment,
      target: this.state.postId
    }
    let commentId
    await axios.post('/comments/add', comment)
      .then(res => commentId = res.data)
      .catch((error) => { console.log(error); })

    let commentToPost = {
      id: this.state.postId,
      comment: commentId
    }
    await axios.post('/posts/add-comment-to-post', commentToPost)
      .then(res => console.log(res))
      .catch((error) => { console.log(error); })

    await axios.get('/posts/' + this.state.postId)
      .then(res => { this.setState({ post: res.data }) })
      .catch(err => { console.log(err) })
  }

  onCommentChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  onCommentLiked = async (commentId) => {
    if (this.props.auth.isAuthenticated) {
      let like = {
        userId: this.props.auth.user.id,
      }
      await axios.post('/comments/' + commentId + '/like', like)
        .then(res => console.log(res))
        .catch((error) => { console.log(error); })

      await axios.get('/posts/' + this.state.postId)
        .then(res => { this.setState({ post: res.data }) })
        .catch(err => { console.log(err) })
    }
  }

  render() {
    const { user } = this.props.auth
    let username, content, createdAt, page
    if (this.state.post) {
      username = this.state.post.username
      content = this.state.post.content
      createdAt = this.state.post.createdAt

      page = (
        <>
          <h3>
            {content}
          </h3>
          <h4>
            <strong>{username.username}</strong>
          </h4>
          <h6>
            {createdAt}
          </h6>
          <Comments 
            comments={this.state.post.comments} 
            commentLike={this.onCommentLiked} 
            user={this.props.auth.isAuthenticated ? this.props.auth.user.id : ""} 
            />
        </>
      )
    } else {
      page = <Spinner />
    }
    return (
      <>
        <div>
          {page}
          {this.props.auth.isAuthenticated ? <NewComment onCommentChange={this.onCommentChange} submitForm={this.onSubmitComment} /> : "Hi"}
        </div>
      </>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostDetail);