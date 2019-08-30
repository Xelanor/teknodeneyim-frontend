import React, { Component } from 'react';
import axios from 'axios'

import Entries from '../components/Entries/Entries'
import Spinner from '../components/UI/Spinner/Spinner'

class HomePage extends Component {
  state = {
    username: "",
    content: "",
    data: null
  }

  componentDidMount() {
    axios.get('entries')
      .then(res => { this.setState({ data: res.data }) })
      .catch(err => { console.log(err) })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmitHandler = async e => {
    e.preventDefault()

    const entry = {
      username: this.state.username,
      content: this.state.content
    }

    await axios.post('entries/add', entry)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    axios.get('entries')
      .then(res => { this.setState({ data: res.data }) })
      .catch(err => { console.log(err) })
  }

  render() {
    let entries = <Spinner />
    if (this.state.data) {
      entries = <Entries data={this.state.data} />
    }
    return (
      <div style={{ width: '100%', }}>
        <div style={{ width: '25%', float: 'left' }}>
          <h3>Konular</h3>
          {entries}
        </div>
        <div style={{ width: '75%', float: 'right' }}>
          <div style={{ width: '50%', margin: '0 auto' }}>
            <form onSubmit={this.onFormSubmitHandler}>
              <label for="name">Yazar</label>
              <input className="u-full-width" type="text" id="name" name="username" onChange={this.handleChange}></input>
              <label for="content">Konu İsmi</label>
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