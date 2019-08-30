import React, { Component } from 'react';
import axios from 'axios'

class HomePage extends Component {
  state = {
    username: "",
    content: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmitHandler = e => {
    e.preventDefault()

    const entry = {
      username: this.state.username,
      content: this.state.content
    }

    axios.post('entries/add', entry)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <h1>Hello World!</h1>
        <form onSubmit={this.onFormSubmitHandler}>
          <label for="name">Name</label>
          <input className="u-full-width" type="text" id="name" name="username" onChange={this.handleChange}></input>
          <label for="content">Content</label>
          <textarea className="u-full-width" type="text" id="content" name="content" onChange={this.handleChange}></textarea>
          <button className="button-primary">Konu Yarat</button>
        </form>
      </div>
    );
  }
}

export default HomePage;