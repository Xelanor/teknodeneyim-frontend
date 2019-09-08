import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios'

class ProfilePage extends Component {
  state = {
    userName: null,
    user: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userName !== this.props.match.params.userName) {
      this.getData()
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const userName = this.props.match.params.userName
    this.setState({ userName })
    axios.get('/users/' + userName)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => { console.log(err) })
  }

  render() {
    let { user } = this.state
    let page
    if (user) {
      page = (
        <div className="flex-1">
          <div className="flex p-8">
            <img
              src={user.avatar}
              alt={user.username}
              title={user.username}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <div className="font-bold text-3xl text-tekno ml-8 -mt-1">
                {user.username}
              </div>
              <div className="font-medium text-xl text-gray-400 ml-8 mt-2">
                Kısa Bir Kişisel Tanıtım
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="font-bold text-3xl text-tekno3 ml-8 mt-2">
              Favori Başlıkların
            </div>
          </div>
        </div>
      )
    }
    return (
      <>
        {page}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfilePage);