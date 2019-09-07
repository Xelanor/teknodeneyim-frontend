import React from 'react';
import { Link } from "react-router-dom";

import Comment from '../../Comments/Comment/Comment'

const homepagePost = (props) => {
  let comments = props.comments.map(comment => {
    return (
      <Comment 
        key={comment._id} 
        id={comment._id} 
        username={comment.username.username} 
        content={comment.content} 
        createdAt={comment.createdAt} 
        likes={comment.likes}
        commentLike={props.commentLike} 
        user={props.user}
        />
    )
  })
  return (
    <div className="mb-16">
      <div className="flex">
        <Link to={`/posts/${props.id}`}>
          <div className="font-semibold text-2xl text-tekno">
            {props.content}
          </div>
        </Link>
      </div>
      <div className="flex mt-2">
        <div className="font-normal text-md text-gray-600">
          İster dışarıda parlak güneşin altında, ister karanlıkta
          sinematik izleme deneyiminin keyfini çıkarın. Dinamik Ton
          Haritalama teknolojisi ile HDR10+ sertifikalıdır, videoları
          gerçek renk ve kontrastla oynatır, böylece YouTube'da HDR10+
          içerikleri izlemek canlı ve heyecanlı hale gelir.
        </div>
      </div>
      {comments}
    </div>
  );
}

export default homepagePost;