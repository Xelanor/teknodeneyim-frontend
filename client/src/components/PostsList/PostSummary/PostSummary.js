import React from 'react';
import { Link } from "react-router-dom";

const postSummary = (props) => {
  return (
    <Link to={`/posts/${props.id}`}>
      <div style={{ backgroundColor: '#E5F0FF' }}>
        <h4>{props.username.username}</h4>
        <h5>{props.content}</h5>
        <h6>{props.createdAt}</h6>
      </div>
    </Link>
  );
}

export default postSummary;