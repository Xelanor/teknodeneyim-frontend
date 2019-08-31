import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate'

import Spinner from '../../components/UI/Spinner/Spinner'
import NewComment from '../../components/Comments/Comment/NewComment'
import Comments from '../../components/Comments/Comments'

import './PostDetail.css'

class PostDetail extends Component {
  state = {
    postId: "",
    post: null,
    comments: null,
    comment: "",
    commentPerPage: 10,
    currentPage: 0,
    offset: 0,
    elements: []
  }

  getData = () => {
    const postId = this.props.match.params.id
    this.setState({ postId })
    axios.get('/posts/' + postId)
      .then(res => {
        this.setState({
          post: res.data,
          comments: res.data.comments,
          pageCount: Math.ceil(res.data.comments.length / this.state.commentPerPage)
        })
        this.setElementsForCurrentPage()
      })
      .catch(err => { console.log(err) })
  }

  componentDidMount() {
    this.getData()
  }

  setElementsForCurrentPage() {
    let elements = this.state.comments
      .slice(this.state.offset, this.state.offset + this.state.commentPerPage)
    this.setState({ elements: elements });
  }

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.commentPerPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
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

    this.getData()
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

      this.getData()
    }
  }

  render() {
    let username, content, createdAt, page, paginationElement
    if (this.state.post) {
      if (this.state.pageCount > 1) {
        paginationElement = (
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={<span className="gap">...</span>}
            pageCount={this.state.pageCount}
            onPageChange={this.handlePageClick}
            forcePage={this.state.currentPage}
            containerClassName={"pagination"}
            previousLinkClassName={"previous_page"}
            nextLinkClassName={"next_page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        );
      }
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
            comments={this.state.elements}
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
          {paginationElement}
        </div>
      </>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostDetail);