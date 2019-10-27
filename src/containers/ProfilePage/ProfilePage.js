import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import EdiText from 'react-editext'

import SavedPosts from '../../components/PostsList/SavedPosts/SavedPosts'

import { savePost } from '../../store/actions/likeAction'
import { changeUserDescription } from '../../store/actions/fetchActions'

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

  onPostSaved = (postId) => {
    if (this.props.auth.isAuthenticated) {
      this.props.savePost(postId, this.props.auth.user.id)
      this.getData()
    }
  }

  getData = () => {
    const userName = this.props.match.params.userName
    this.setState({ userName })
    axios.get(`${process.env.REACT_APP_API_URL}/users/` + userName)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => { console.log(err) })
  }

  changeUserDescription = val => {
    this.props.changeUserDescription(this.state.user._id, val)
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
              <div className="font-medium text-xl text-gray-500 ml-8 mt-2">
                {this.props.auth.user.id === user._id ? <EdiText
                  type='text'
                  value={user.description}
                  onSave={this.changeUserDescription}
                /> : user.description}
              </div>
            </div>
          </div>
          <div className="flex-1 px-8">
            <div className="font-bold text-3xl text-tekno3 mb-3">
              {this.props.auth.user.id === user._id ? "Favori Başlıkların" : user.username + " Kullanıcısının Favori Başlıkları"}
            </div>
            <SavedPosts
              posts={user.saved}
              onPostSaved={this.onPostSaved}
              user={user}
              loggedInUser={this.props.auth.user.id}
            />
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

export default connect(mapStateToProps, { savePost, changeUserDescription })(ProfilePage);