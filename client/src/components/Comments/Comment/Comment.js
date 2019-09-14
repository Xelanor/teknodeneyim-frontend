import React from 'react';
import { Link } from 'react-router-dom'

const comment = (props) => {
  return (
    <>
      <div className="flex mt-16">
        <div className="flex font-normal text-md text-black">
          {props.content}
        </div>
      </div>
      <div className="flex items-center float-right">
        <div onClick={() => props.commentLike(props.id)} className="LikeBtn Btn items-center cursor-pointer mr-3">
          <span className="BtnWrapper items-center">
            <span className="Count mr-1">{props.likes.length}</span>
            {props.likes.includes(props.user) ? <i style={{ color: "#e0245e" }} className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
          </span>
        </div>
        <div className="font-bold text-sm text-purple-900">
          {new Date(props.createdAt).toLocaleString()}
        </div>
        <Link to={`/profil/${props.username.username}`}>
          <div className="ml-4 font-normal text-sm text-black">
            {props.username.username}
          </div>
        </Link>
        <Link to={`/profil/${props.username.username}`}>
          <img
            src={props.username.avatar}
            alt={props.username.username}
            title={props.username.username}
            className="w-10 h-10 rounded-full mx-4"
          />
        </Link>
      </div>
    </>
  );
}

export default comment;