import React, { Component } from 'react';

class CreatePost extends Component {
  state = {

  }
  render() {
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <form onSubmit={this.onFormSubmitHandler}>
          <label htmlFor="name">Yazar</label>
          <input className="u-full-width" type="text" id="name" name="username" onChange={this.handleChange}></input>
          <label htmlFor="content">Konu İsmi</label>
          <textarea className="u-full-width" type="text" id="content" name="content" onChange={this.handleChange}></textarea>
          <button className="button-primary">Konu Yarat</button>
        </form>
      </div>
    );
  }
}

export default CreatePost;