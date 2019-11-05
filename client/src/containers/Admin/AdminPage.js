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
            <div className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 mb-2 text-center rounded focus:outline-none focus:shadow-outline">
              Konular
            </div>
          </Link>
          <Link to="/admin/comments">
            <div className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 mb-2 text-center rounded focus:outline-none focus:shadow-outline">
              Yorumlar
            </div>
          </Link>
          <Link to="/admin/offers">
            <div className="bg-tekno hover:bg-tekno text-white font-bold py-2 px-6 text-center rounded focus:outline-none focus:shadow-outline">
              Öneriler
            </div>
          </Link>
          <CreatePost />
        </div>
      </div>
    );
  }
}

export default AdminPage;