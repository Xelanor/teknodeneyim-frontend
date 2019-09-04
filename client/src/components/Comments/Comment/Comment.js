import React from 'react';

import './Comment.css'

const postSummary = (props) => {
  return (
    <comment>
      <div className="flex mt-16">
        <div class="flex font-normal text-md text-black">
          {props.content}
        </div>
      </div>
      <div class="flex items-center float-right">
        <div onClick={() => props.commentLike(props.id)} className="LikeBtn Btn items-center">
          <span className="BtnWrapper items-center">
            <span className="Count mr-1">{props.likes.length}</span>
            {props.likes.includes(props.user) ? <i style={{ color: "#e0245e" }} className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
          </span>
        </div>
        <div class="font-bold text-sm text-purple-900">
          {props.createdAt}
        </div>
        <div class="ml-4 font-normal text-sm text-black">
          {props.username}
        </div>
        <img class="w-10 h-10 rounded-full mx-4" src="https://tailwindcss.com/img/jonathan.jpg"
          alt="Avatar of Jonathan Reinink" />
      </div>
    </comment>
  );
}

export default postSummary;