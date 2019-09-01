import React from 'react';

const homepageComment = (props) => {
  return (
    <div>
      <p><strong>{props.comment.content}</strong></p>
      <p>{props.comment.username.username}</p>
      <p>{props.comment.createdAt}</p>
    </div>
  );
}

export default homepageComment;