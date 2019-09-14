import React from 'react';
import { Link } from "react-router-dom";

const postSummary = (props) => {
  return (
    <div className="flex mt-4 justify-between">
      <Link to={`/posts/${props.id}`}><div className="font-semibold text-base text-tekno mr-2">{props.content}</div></Link>
      <div className="font-semibold text-base text-purple-800">{props.comments}</div>
    </div>
  );
}

export default postSummary;