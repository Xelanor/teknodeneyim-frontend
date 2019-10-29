import React, { Component } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import CrudPost from './CrudPost/CrudPost'
import '../DisplayPosts.css'

class DisplayPosts extends Component {
  state = {
    posts: null,
    currentPage: 0,
    offset: 0,
    elements: null,
    pageCount: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.posts !== prevState.posts) {
      this.setElementsForCurrentPage()
    }
  }

  getData() {
    axios.get('/admin/posts/show')
      .then(res => this.setState({ posts: res.data, pageCount: Math.ceil(res.data.length / 10) }))
      .catch(err => { console.log(err) })
  }

  componentDidMount() {
    this.getData()
  }

  deletePost = async (postId) => {
    await axios.post('/admin/posts/delete', { _id: postId })
      .then(res => console.log(res))
      .catch(err => { console.log(err) })

    this.getData()
  }

  setElementsForCurrentPage() {
    let elements = this.state.posts
      .slice(this.state.offset, this.state.offset + 10)
    this.setState({ elements: elements });
  }

  handlePageClick = (data) => {
    window.scrollTo(0, 0)
    const selectedPage = data.selected;
    const offset = selectedPage * 10;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  }

  render() {
    let paginationElement
    if (this.state.posts) {
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
    }
    return (
      <div className="flex-1 w-full justify-center px-1 py-2">
        {this.state.elements ?
          (
            <div className={"app"}>
              <div>
                <div className="font-bold text-3xl text-tekno3">
                  Konular
                </div>
                <table className={"table"}>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Hashtags</th>
                      <th>Author</th>
                      <th>Like</th>
                      <th>Comment</th>
                      <th>Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CrudPost
                      posts={this.state.elements}
                      delete={this.deletePost}
                    />
                  </tbody>
                </table>
              </div>
            </div>) : null}
        {paginationElement}
      </div>
    );
  }
}

export default DisplayPosts;