import React from 'react';
import { Link } from "react-router-dom";

import HomepageComment from '../../Comments/Comment/HomepageComment'

const homepagePost = (props) => {
  console.log(props.comments)
  let comments = props.comments.map(comment => {
    return (
      <HomepageComment comment={comment} />
    )
  })
  return (
    // <Link to={`/posts/${props.id}`}>
    <div className="border1" style={{ backgroundColor: '#E5F0FF' }}>
      <h6>{props.content}</h6>
      <p>{props.username.username}</p>
      <h6>{props.createdAt}</h6>
      {comments}
    </div>
    // </Link>
  );
}

export default homepagePost;