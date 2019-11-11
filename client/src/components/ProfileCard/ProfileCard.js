import React from "react";
import EdiText from "react-editext";
import timeAgo from "../../utils/timeAgo";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import ProfilePictures from "./ProfilePictures/ProfilePictures";

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
          <ProfilePictures
            changeAvatar={props.changeAvatar}
            auth={props.auth}
            user={props.user}
            onChangeAvatar={props.onChangeAvatar}
            onChangeAvatarClick={props.onChangeAvatarClick}
          />
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
                  hideIcons={true}
                  editButtonContent={
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-tekno"
                      style={{ marginBottom: "2px" }}
                      size="xs"
                    />
                  }
                  editButtonClassName="p-0 bg-white border-0"
                  saveButtonContent={
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-tekno3 mr-2"
                      size="xs"
                    />
                  }
                  saveButtonClassName="p-0 bg-white border-0"
                  cancelButtonContent={
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500"
                      size="xs"
                    />
                  }
                  cancelButtonClassName="p-0 bg-white border-0"
                  viewProps={{
                    className: "text-base text-tekno3"
                  }}
                  inputProps={{
                    style: {
                      backgroundColor: "white",
                      color: "#843B62",
                      fontWeight: 700,
                      width: 150,
                      border: "1px solid",
                      borderColor: "#f5dbe9",
                      fontSize: "1rem"
                    },
                    name: "answer1"
                  }}
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
