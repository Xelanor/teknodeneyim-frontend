import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import EdiText from 'react-editext'
import jwt_decode from "jwt-decode";
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group';

import SavedPosts from '../../components/PostsList/SavedPosts/SavedPosts'
import ProfileAvatars from '../../components/ProfileAvatars/ProfileAvatars'
import setAuthToken from '../../utils/setAuthToken'
import './ProfilePage.css'

import { savePost } from '../../store/actions/likeAction'
import { changeUserDescription } from '../../store/actions/fetchActions'
import { setCurrentUser } from '../../store/actions/authentication'
const jwt = require('jsonwebtoken');

class ProfilePage extends Component {
  state = {
    userName: null,
    user: null,
    changeAvatar: false
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
    axios.get('/users/' + userName)
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

  onChangeAvatar = (avatar) => {
    axios.post('/users/change-avatar', { userId: this.state.user._id, avatar })
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      decoded.avatar = avatar

      jwt.sign(decoded, 'secret', (err, token) => {
        token = `Bearer ${token}`
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        this.props.setCurrentUser(decoded);
      })
    }
    window.location.reload();
  }

  render() {
    let { user } = this.state
    let page
    if (user) {
      page = (
        <div className="flex-1">
          <div className="flex m-8" onClick={() => { this.setState({ changeAvatar: !this.state.changeAvatar }) }}>
            <img
              src={user.avatar}
              alt={user.username}
              title={user.username}
              className={classnames("w-24 h-24 rounded-full", { "cursor-pointer": this.props.auth.user.id === user._id })}
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
          <CSSTransition
            in={this.state.changeAvatar}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            {this.props.auth.user.id === user._id ?
              <div className="flex flex-wrap px-8 py-4">
                <ProfileAvatars change={this.onChangeAvatar} />
              </div> : null}
          </CSSTransition>
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

export default connect(mapStateToProps, { savePost, changeUserDescription, setCurrentUser })(ProfilePage);