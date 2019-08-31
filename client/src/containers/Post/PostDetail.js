import React, { Component } from 'react';
import axios from 'axios'

import Spinner from '../../components/UI/Spinner/Spinner'

class PostDetail extends Component {
  state = {
    postId: "",
    post: null,
  }

  componentDidMount() {
    const postId = this.props.match.params.id
    this.setState({ postId })
    axios.get('/posts/' + postId)
      .then(res => { this.setState({ post: res.data }) })
      .catch(err => { console.log(err) })
  }

  render() {
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
        </div>
      </>
    );
  }
}

export default PostDetail;