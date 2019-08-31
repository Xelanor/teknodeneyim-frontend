import React from 'react';

import Comment from './Comment/Comment'

const comments = (props) => {
  let data = props.comments
  let comments = data.map(comment => {
    return <Comment 
              key={comment._id} 
              id={comment._id} 
              username={comment.username.username} 
              content={comment.content} 
              createdAt={comment.createdAt} 
              likes={comment.likes}
              commentLike={props.commentLike} 
              user={props.user}
              />
  })
  return (
    <>
      {comments}
    </>
  );
}

export default comments;