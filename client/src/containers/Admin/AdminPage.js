import React, { Component } from 'react';

import CreatePost from './CreatePost'

class AdminPage extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>Konu Oluştur</h1>
        <CreatePost />
      </div>
    );
  }
}

export default AdminPage;