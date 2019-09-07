import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/UI/Spinner/Spinner'
import HomepagePosts from '../../components/PostsList/HomepagePosts'

class Search extends Component {
  state = {
    searchText: "",
    posts: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      this.getData()
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    let searchText = this.props.match.params.search
    this.setState({ searchText: this.props.match.params.search })
    axios.get('/posts/search/' + searchText)
      .then(res => { this.setState({ posts: res.data }) })
      .catch(err => { console.log(err) })
  }

  render() {
    let posts = <Spinner />
    if (this.state.posts) {
      if (this.state.posts.length === 0) {
        posts = <div className="flex px-4 py-10">
        <div className="font-bold text-3xl text-purple-900">
        Aradığınız sonuca ulaşılamadı. Lütfen tekrar deneyiniz.
        </div>
      </div>
      } else {
        posts = <HomepagePosts posts={this.state.posts} />
      }
    }
    return (
      <div style={{ width: '75%', float: 'right' }}>
        {posts}
      </div>
    );
  }
}

export default Search;