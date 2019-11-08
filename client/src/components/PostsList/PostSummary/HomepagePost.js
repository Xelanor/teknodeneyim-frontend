import React from 'react';
import { Link } from "react-router-dom";

import Comment from '../../Comments/Comment/Comment'

const homepagePost = (props) => {
  let comments = props.comments.map(comment => {
    return (
      <Comment
        key={comment._id}
        id={comment._id}
        username={comment.username}
        content={comment.content}
        createdAt={comment.createdAt}
        likes={comment.likes}
        commentLike={props.commentLike}
        user={props.user}
        postId={props.slug}
      />
    )
  })
  return (
    <div className="mb-16">
      <div className="flex">
        <Link to={`/post/${props.slug}`}>
          <div className="font-semibold text-2xl text-tekno">
            {props.content}
          </div>
        </Link>
      </div>
      <div className="flex-1 mt-2 mb-8">
        <div className="font-normal text-md text-gray-600">
          {props.description}
        </div>
      </div>
      {comments}
    </div>
  );
}

export default homepagePost;