import React, { Component } from 'react';

import CreatePost from './CreatePost'

class AdminPage extends Component {
  state = {}
  render() {
    return (
      <div className="w-full justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-sm items-center mx-auto">
          <CreatePost />
        </div>
      </div>
    );
  }
}

export default AdminPage;