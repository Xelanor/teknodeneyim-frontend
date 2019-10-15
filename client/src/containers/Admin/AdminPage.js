import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import CreatePost from './CreatePost'

class AdminPage extends Component {
  state = {}
  render() {
    return (
      <div className="w-full justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-sm items-center mx-auto">
          <Link to="/admin/posts">
            <button className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
              Konular
          </button>
          </Link>
          <Link to="/admin/comments">
            <button className="bg-tekno hover:bg-tekno text-white font-bold ml-4 py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
              Yorumlar
          </button>
          </Link>
          <CreatePost />
        </div>
      </div>
    );
  }
}

export default AdminPage;