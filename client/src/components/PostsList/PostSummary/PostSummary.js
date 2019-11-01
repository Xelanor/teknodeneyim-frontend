import React from 'react';
import { Link } from "react-router-dom";

const postSummary = (props) => {
  return (
    <Link to={`/post/${props.slug}`}>
      <div className="flex py-2 justify-between hover:bg-gray-100 relative items-center">
        <div className="w-10/12 font-semibold text-base text-tekno mr-2">{props.content}</div>
        <div className="font-semibold text-base text-purple-800 absolute right-0">{props.comments}</div>
      </div>
    </Link>
  );
}

export default postSummary;