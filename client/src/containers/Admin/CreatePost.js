import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class CreatePost extends Component {
  state = {
    content: ""
  }

  handleChange = e => {
    this.setState({ content: e.target.value })
  }

  onFormSubmitHandler = async e => {
    e.preventDefault()
    let post = {
      username: this.props.auth.user.id,
      content: this.state.content,
    }
    console.log(post)
    await axios.post('/posts/add', post)
      .then(res => console.log(res))
      .catch((error) => { console.log(error); })
    this.setState({ content: "" })
  }

  render() {
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <form onSubmit={this.onFormSubmitHandler}>
          <label htmlFor="name">Konu Adı</label>
          <input className="u-full-width" type="text" id="content" name="content" value={this.state.content} onChange={this.handleChange}></input>
          <button className="button-primary">Konu Yarat</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreatePost);