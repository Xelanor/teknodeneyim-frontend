import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";

import Spinner from '../../components/UI/Spinner/Spinner'
import NewComment from '../../components/Comments/Comment/NewComment'

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
    console.log("Submitted")
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
    console.log(commentToPost)
    await axios.post('/posts/add-comment-to-post', commentToPost)
      .then(res => console.log(res))
      .catch((error) => { console.log(error); })
  }

  onCommentChange = (e) => {
    this.setState({ comment: e.target.value })
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
          <h1>
            {content}
          </h1>
          <h3>
            {username}
          </h3>
          <h6>
            {createdAt}
          </h6>
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