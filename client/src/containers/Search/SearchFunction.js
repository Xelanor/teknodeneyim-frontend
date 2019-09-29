import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside"
import { debounce } from 'lodash'
import * as _ from 'underscore';

class SearchFunction extends Component {
  state = {
    suggestions: [],
    searchText: ''
  }

  handleClickOutside = evt => {
    this.setState({ suggestions: [] })
  };

  debounceEventHandler = (...args) => {
    const debounced = _.debounce(...args)
    return function (e) {
      e.persist()
      return debounced(e)
    }
  }

  onTextChanged = e => {
    const value = e.target.value
    this.setState({ searchText: value })
    if (value.length > 0) {
      axios.post('/posts/autocomplete/', { content: value })
        .then(res => { this.setState({ suggestions: res.data }) })
        .catch(err => { console.log(err) })
    } else {
      this.setState({ suggestions: [] })
    }
  }

  renderSuggestions = () => {
    const { suggestions } = this.state
    if (suggestions.length === 0) {
      return null
    } else {
      return (
        <div className="text-left mt-1 bg-white z-30 absolute border-b border-l border-r ">
          {suggestions.map((item) => (
            <Link onClick={() => this.suggestionSelected(item)} key={item._id} to={`/post/${item._id}`}>
              <div className="flex hover:bg-gray-300 hover:underline">
                <div className="flex-1 p-2">
                  {item.content}
                </div>
                <div className="flex p-2 ml-4 float-right">
                  {item.commentsize}
                </div>
              </div>
            </Link>
          )
          )}
        </div>
      )
    }
  }

  suggestionSelected = value => {
    this.setState({ searchText: '', suggestions: [] })
  }

  onSearchSubmit = e => {
    e.preventDefault()
    let searchText = this.state.searchText
    this.setState({ searchText: "" })
    if (searchText.length !== 0) {
      this.props.history.push("/search/" + searchText)
    }
  }

  render() {
    const { searchText } = this.state
    return (
      <div className="text-sm lg:flex-grow">
        <form onSubmit={this.onSearchSubmit}>
          <input
            // onChange={this.debounceEventHandler(this.onTextChanged, 300)}
            onChange={this.onTextChanged}
            type="search"
            className={this.props.class}
            placeholder="Deneyim Bul..."
            value={this.state.searchText}
          />
          <button type="submit">
            <i style={{ color: "#F67e7d" }} className="fa fa-search ml-1 p-2"></i>
          </button>
          {this.renderSuggestions()}
        </form>
      </div>
    );
  }
}

export default withRouter(onClickOutside(SearchFunction));