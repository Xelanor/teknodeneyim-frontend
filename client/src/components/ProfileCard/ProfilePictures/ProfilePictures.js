import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ProfileAvatars from "../../ProfileAvatars/ProfileAvatars";
import classnames from "classnames";
import onClickOutside from "react-onclickoutside";

class ProfilePictures extends Component {
  handleClickOutside = evt => {
    this.props.onChangeAvatarClick(false);
  };
  render() {
    return (
      <>
        <div className="flex p-6 justify-center items-center">
          <div className="w-32 h-32 rounded-full bg-white">
            <img
              onClick={() =>
                this.props.onChangeAvatarClick(!this.props.changeAvatar)
              }
              src={this.props.user.avatar}
              className="w-32 h-32 rounded-full"
              className={classnames("w-32 h-32 rounded-full", {
                "cursor-pointer": this.props.auth.id === this.props.user._id
              })}
            />
          </div>
        </div>
        <CSSTransition
          in={this.props.changeAvatar}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          {this.props.auth.id === this.props.user._id ? (
            <div className="flex flex-wrap w-auto mr-4 md:mr-0 md:w-64 p-1 mb-4 absolute z-50 border border-gray-300 bg-white justify-center text-center">
              <div className="font-bold text-xl text-tekno3 mb-3 w-full">
                Profil Resmini Değiştir
              </div>
              <ProfileAvatars change={this.props.onChangeAvatar} />
            </div>
          ) : null}
        </CSSTransition>
      </>
    );
  }
}

export default onClickOutside(ProfilePictures);
