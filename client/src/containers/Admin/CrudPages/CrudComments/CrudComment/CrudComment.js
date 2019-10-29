import React from 'react';
import { Link } from 'react-router-dom'

import timeAgo from '../../../../../utils/timeAgo'

const crudComment = (props) => {
  let data = props.comments
  let comments = data.map((comment, index) => {
    return (
      <tr key={comment._id}>
        <td>{index + 1}</td>
        <td>{timeAgo(new Date(comment.updatedAt).getTime())}</td>
        <td>{comment.target.content}</td>
        <td>{comment.content}</td>
        <td>{comment.username.username}</td>
        <td>{comment.likes.length}</td>
        <td>
          <Link to={`/admin/comments/edit/${comment._id}`}>
            <div
              className="inline-block text-base px-4 py-2 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent"
            >Edit
          </div>
          </Link>
        </td>
        <td>
          <div
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.delete(comment._id) }}
            className="inline-block cursor-pointer text-base px-4 py-2 leading-none border rounded-lg bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent"
          >Delete
          </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      {comments}
    </>
  );
}

export default crudComment;