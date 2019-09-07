import React from 'react';

const homepageComment = (props) => {
  return (
    <>
      <div className="flex mt-12">
        <div className="flex font-normal text-md text-black">
          {props.comment.content}
        </div>
      </div>
      <div className="flex items-center float-right">
        <div className="font-bold text-sm text-purple-900">
          {new Date(props.createdAt).toLocaleString()}          
        </div>
        <div className="ml-4 font-normal text-sm text-black">
          {props.comment.username.username}
        </div>
        <img className="w-10 h-10 rounded-full mx-4" src="https://tailwindcss.com/img/jonathan.jpg"
          alt="Avatar of Jonathan Reinink" />
      </div>
    </>
  );
}

export default homepageComment;