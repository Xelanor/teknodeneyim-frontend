import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MediaQuery from "react-responsive";

import setAuthToken from "../../utils/setAuthToken";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileFeeds from "../../components/ProfileFeeds/ProfileFeeds";
import "./ProfilePage.css";

import { savePost } from "../../store/actions/likeAction";
import { changeUserDescription } from "../../store/actions/fetchActions";
import { setCurrentUser } from "../../store/actions/authentication";
const jwt = require("jsonwebtoken");

class ProfilePage extends Component {
  state = {
    userName: null,
    user: null,
    changeAvatar: false,
    profileTab: "latest"
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userName !== this.props.match.params.userName) {
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  onPostSaved = postId => {
    if (this.props.auth.isAuthenticated) {
      this.props.savePost(postId, this.props.auth.user.id);
      this.getData();
    }
  };

  getData = () => {
    const userName = this.props.match.params.userName;
    this.setState({ userName });
    axios
      .get("/users/" + userName)
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  changeUserDescription = val => {
    this.props.changeUserDescription(this.state.user._id, val);
  };

  onChangeAvatar = avatar => {
    axios.post("/users/change-avatar", { userId: this.state.user._id, avatar });
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      decoded.avatar = avatar;

      jwt.sign(decoded, "secret", (err, token) => {
        token = `Bearer ${token}`;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        this.props.setCurrentUser(decoded);
      });
    }
    window.location.reload();
  };

  onChangeAvatarClick = change => {
    if (this.props.auth.user.id === this.state.user._id) {
      this.setState({
        changeAvatar: change
      });
    }
  };

  onChangeTab = tab => {
    this.setState({ profileTab: tab });
  };

  render() {
    let { user } = this.state;
    let page;
    if (user) {
      page = (
        <div className="md:flex px-4 md:pl-4">
          <MediaQuery minWidth={768}>
            <ProfileFeeds
              changeTab={this.onChangeTab}
              user={this.state.user}
              auth={this.props.auth.user}
              onPostSaved={this.onPostSaved}
              profileTab={this.state.profileTab}
            />
            <ProfileCard
              user={this.state.user}
              auth={this.props.auth.user}
              changeUserDescription={this.changeUserDescription}
              onChangeAvatarClick={this.onChangeAvatarClick}
              changeAvatar={this.state.changeAvatar}
              onChangeAvatar={this.onChangeAvatar}
            />
          </MediaQuery>
          <MediaQuery maxWidth={767}>
            <ProfileCard
              user={this.state.user}
              auth={this.props.auth.user}
              changeUserDescription={this.changeUserDescription}
              onChangeAvatarClick={this.onChangeAvatarClick}
              changeAvatar={this.state.changeAvatar}
              onChangeAvatar={this.onChangeAvatar}
            />
            <ProfileFeeds
              changeTab={this.onChangeTab}
              user={this.state.user}
              auth={this.props.auth.user}
              onPostSaved={this.onPostSaved}
              profileTab={this.state.profileTab}
            />
          </MediaQuery>
        </div>
      );
    }
    return (
      <>
        <div className="lg:flex-1">{page}</div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { savePost, changeUserDescription, setCurrentUser }
)(ProfilePage);
