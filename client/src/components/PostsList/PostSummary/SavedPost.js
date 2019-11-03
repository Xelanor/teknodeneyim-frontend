import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

const savedPost = (props) => {
  let saveButton
  if (props.loggedInUser === props.user._id) {
    saveButton = <div onClick={() => props.onPostSaved(props.id)} className="LikeBtn Btn items-center cursor-pointer ml-3">
      <span className="BtnWrapper items-center">
        {props.saved.includes(props.user._id) ? <FontAwesomeIcon icon={faStar} className="text-tekno3" /> : <FontAwesomeIcon icon={farStar} />}
      </span>
    </div>
  }
  return (
    <div className="flex-1 mb-8">
      <div className="flex items-center">
        <Link to={`/post/${props.slug}`}>
          <div className="font-semibold text-2xl text-tekno">
            {props.content}
          </div>
        </Link>
        {saveButton}
      </div>
      <div className="flex mt-2">
        <div className="font-normal text-md text-gray-600">
          {props.description}
        </div>
      </div>
      {/* <div className="flex items-center float-right">
        <div className="font-bold text-sm text-purple-900">
          {new Date(props.createdAt).toLocaleString()}
        </div>
        <div className="ml-4 font-normal text-sm text-black">
          {props.user.username}
        </div>
        <img
          src={props.user.avatar}
          alt={props.user.username}
          title={props.user.username}
          className="w-10 h-10 rounded-full ml-4"
        />
      </div> */}
    </div>
  );
}

export default savedPost;