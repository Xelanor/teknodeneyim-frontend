import React, { Component } from "react";
import axios from "axios";

import HomepagePosts from "../../components/PostsList/HomepagePosts";
import Loading from "../../components/UI/Loading/HomeLoading/HomeLoading";

class Search extends Component {
  state = {
    searchText: "",
    posts: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.setState({ loading: true });
    let searchText = this.props.match.params.search;
    this.setState({ searchText: this.props.match.params.search });
    await axios
      .post(`${process.env.REACT_APP_PROXY}/posts/search`, {
        content: searchText,
      })
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ loading: false });
  }

  render() {
    let posts = Array(3)
      .fill()
      .map(Math.random)
      .map((a) => {
        return <Loading />;
      });
    if (this.state.posts) {
      if (this.state.posts.length === 0) {
        posts = (
          <div className="flex px-4">
            <div className="font-bold text-xl text-tekno3">
              Aradığınız sonuca ulaşılamadı. Lütfen tekrar deneyiniz.
            </div>
          </div>
        );
      } else {
        posts = <HomepagePosts posts={this.state.posts} />;
      }
    }
    if (this.state.loading) {
      posts = Array(3)
        .fill()
        .map(Math.random)
        .map((a) => {
          return <Loading />;
        });
    }
    return (
      <div className="flex-1 px-4 pt-3">
        <div className="font-bold text-xl lg:text-2xl text-purple-900 mb-4">
          {this.state.searchText} için Arama Sonuçları
        </div>
        <div className="flex-1 mb-4">{posts}</div>
      </div>
    );
  }
}

export default Search;
