import React, { Component } from 'react';

class HomePage extends Component {
  state = {
    username: "",
    content: "",
    posts: null,
    data: null
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmitHandler = async e => {
    e.preventDefault()
  }

  render() {
    return (
      <div style={{ width: '100%', }}>
        <div style={{ width: '75%', float: 'right' }}>
          <div style={{ width: '50%', margin: '0 auto' }}>
            <form onSubmit={this.onFormSubmitHandler}>
              <label htmlFor="name">Yazar</label>
              <input className="u-full-width" type="text" id="name" name="username" onChange={this.handleChange}></input>
              <label htmlFor="content">Konu İsmi</label>
              <textarea className="u-full-width" type="text" id="content" name="content" onChange={this.handleChange}></textarea>
              <button className="button-primary">Konu Yarat</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;