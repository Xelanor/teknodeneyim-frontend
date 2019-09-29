import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
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
      axios.get('/posts/search/' + value)
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
        <ul className="text-left bg-gray-300 z-30 absolute">
          {suggestions.map((item) => (
            <Link key={item._id} to={`/post/${item._id}`}><li key={item._id} onClick={() => this.suggestionSelected(item)}>{item.content}</li></Link>
          )
          )}
        </ul>
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

export default onClickOutside(SearchFunction);