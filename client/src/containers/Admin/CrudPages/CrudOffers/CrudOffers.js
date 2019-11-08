import React, { Component } from 'react';
import axios from 'axios'

import CrudOffer from './CrudOffer/CrudOffer'
import '../DisplayPosts.css'

class DisplayOffers extends Component {
  state = {
    posts: null,
  }

  getData() {
    axios.get('/admin/posts/show-passive')
      .then(res => this.setState({ posts: res.data }))
      .catch(err => { console.log(err) })
  }

  componentDidMount() {
    this.getData()
  }

  acceptPost = (postId) => {
    axios.post('/admin/posts/accept', { postId })
      .then(res => console.log(res))
      .catch(err => { console.log(err) })

    window.location.reload();
  }

  declinePost = (postId) => {
    axios.post('/admin/posts/decline', { postId })
      .then(res => console.log(res))
      .catch(err => { console.log(err) })

    window.location.reload();
  }

  render() {
    return (
      <div className="flex-1 w-full justify-center px-1 py-2">
        {this.state.posts ?
          (
            <div className={"app"}>
              <div>
                <div className="font-bold text-3xl text-tekno3">
                  Konular
                </div>
                <table className={"table"}>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Hashtags</th>
                      <th>Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CrudOffer
                      posts={this.state.posts}
                      accept={this.acceptPost}
                      decline={this.declinePost}
                    />
                  </tbody>
                </table>
              </div>
            </div>) : null}
      </div>
    );
  }
}

export default DisplayOffers;