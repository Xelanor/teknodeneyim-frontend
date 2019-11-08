import React, { Component } from 'react';
import axios from 'axios'

import UserCards from '../../../../components/UserCards/UserCards'

class CrudUsers extends Component {
  state = {
    users: null
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.get('/admin/users/show')
      .then(res => this.setState({ users: res.data }))
      .catch(err => { console.log(err) })
  }

  render() {
    return (
      <div className="flex-1 w-full justify-center px-1 py-2">
        <div className="app">
          <div className="font-bold text-3xl text-tekno3 mb-4">
            Üyeler
          </div>
          <div className="flex flex-wrap">
            {this.state.users ? <UserCards users={this.state.users}/> : "yükleniyor" }
          </div>
        </div>
      </div>

    );
  }
}

export default CrudUsers;