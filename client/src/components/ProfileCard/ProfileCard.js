import React from "react";
import EdiText from "react-editext";
import timeAgo from "../../utils/timeAgo";
import classnames from "classnames";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import ProfileAvatars from "../ProfileAvatars/ProfileAvatars";

import "./ProfileCard.css";

const ProfileCard = props => {
  return (
    <div className="justify-center w-full md:w-auto">
      <div
        className="md:w-64 md:ml-4 h-auto rounded overflow-hidden bg-split border"
        style={{ borderColor: "#f5dbe9" }}
      >
        <div className="flex-col">
          <div className="flex items-center justify-center">
            <div className="font-bold text-xl mt-1 mb-2 text-white text-center">
              Kişisel Bilgiler
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="font-semibold text-sm text-white text-center">
              Üyelik Tarihi
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="font-semibold text-sm mb-2 text-white text-center">
              {timeAgo(new Date(props.user.createdAt).getTime())}
            </div>
          </div>
          <div className="flex p-6 justify-center items-center">
            <div className="w-32 h-32 rounded-full bg-white">
              <img
                onClick={props.onChangeAvatarClick}
                src={props.user.avatar}
                className="w-32 h-32 rounded-full"
                className={classnames("w-32 h-32 rounded-full", {
                  "cursor-pointer": props.auth.id === props.user._id
                })}
              />
            </div>
          </div>
          <CSSTransition
            in={props.changeAvatar}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            {props.auth.id === props.user._id ? (
              <div className="flex flex-wrap w-auto mr-4 md:mr-0 md:w-64 p-1 mb-4 absolute z-50 border border-gray-300 bg-white justify-center text-center">
                <div className="font-bold text-xl text-tekno3 mb-3 w-full">
                  Profil Resmini Değiştir
                </div>
                <ProfileAvatars change={props.onChangeAvatar} />
              </div>
            ) : null}
          </CSSTransition>
          <div className="flex items-center justify-center">
            <div className="font-bold text-3xl md:mt-1 text-tekno text-center">
              {props.user.username}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="font-bold text-xl mt-1 mb-2 text-gray-600 text-center">
              {props.auth.id === props.user._id ? (
                <EdiText
                  type="text"
                  value={props.user.description}
                  onSave={props.changeUserDescription}
                />
              ) : (
                props.user.description
              )}
            </div>
          </div>
          <div className="px-6 pt-8 md:pt-32 pb-6">
            <div className="flex justify-center">
              <div className="flex-col items-center w-24 justify-content p-4 mr-8 md:mr-0 border border-gray-300 shadow-lg">
                <div className="block text-tekno text-2xl font-bold text-center">
                  {props.user.posts.length}
                </div>
                <div className="block text-tekno3 text-base font-bold text-center">
                  Açılan Konu
                </div>
              </div>
              <div className="flex-col items-center w-24 justify-content p-4 border border-gray-300 shadow-lg">
                <div className="block text-tekno text-2xl font-bold text-center">
                  {props.user.comments.length}
                </div>
                <div className="block text-tekno3 text-base font-bold text-center">
                  Yapılan Yorum
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object,
  changeUserDescription: PropTypes.func,
  onChangeAvatarClick: PropTypes.func,
  changeAvatar: PropTypes.bool,
  onChangeAvatar: PropTypes.func
};

export default ProfileCard;
