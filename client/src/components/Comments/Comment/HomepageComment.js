import React from 'react';

const homepageComment = (props) => {
  return (
    <comment>
      <div className="flex mt-12">
        <div className="flex font-normal text-md text-black">
          {props.comment.content}
        </div>
      </div>
      <div class="flex items-center float-right">
        <div class="font-bold text-sm text-purple-900">
          {props.comment.createdAt}
        </div>
        <div class="ml-4 font-normal text-sm text-black">
          {props.comment.username.username}
        </div>
        <img class="w-10 h-10 rounded-full mx-4" src="https://tailwindcss.com/img/jonathan.jpg"
          alt="Avatar of Jonathan Reinink" />
      </div>
    </comment>
  );
}

export default homepageComment;