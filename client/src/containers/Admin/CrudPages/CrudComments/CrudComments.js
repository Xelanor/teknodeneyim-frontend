import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import CrudPost from "./CrudComment/CrudComment";
import "../DisplayPosts.css";

class DisplayPosts extends Component {
  state = {
    comments: null,
    currentPage: 0,
    offset: 0,
    elements: null,
    pageCount: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments !== prevState.comments) {
      this.setElementsForCurrentPage();
    }
  }

  getData() {
    axios
      .get(`${process.env.REACT_APP_PROXY}/admin/comments/show`)
      .then((res) =>
        this.setState({
          comments: res.data,
          pageCount: Math.ceil(res.data.length / 10),
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  deletePost = async (postId) => {
    await axios
      .post(`${process.env.REACT_APP_PROXY}/admin/comments/delete`, {
        _id: postId,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });

    this.getData();
  };

  setElementsForCurrentPage() {
    let elements = this.state.comments.slice(
      this.state.offset,
      this.state.offset + 10
    );
    this.setState({ elements: elements });
  }

  handlePageClick = (data) => {
    window.scrollTo(0, 0);
    const selectedPage = data.selected;
    const offset = selectedPage * 10;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  render() {
    let paginationElement;
    if (this.state.comments) {
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
        {this.state.elements ? (
          <div className={"app"}>
            <div>
              <div className="font-bold text-3xl text-tekno3">Yorumlar</div>
              <table className={"table"} style={{ tableLayout: "auto" }}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Comment</th>
                    <th>Author</th>
                    <th>Like</th>
                  </tr>
                </thead>
                <tbody>
                  <CrudPost
                    comments={this.state.elements}
                    delete={this.deletePost}
                  />
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {paginationElement}
      </div>
    );
  }
}

export default DisplayPosts;
