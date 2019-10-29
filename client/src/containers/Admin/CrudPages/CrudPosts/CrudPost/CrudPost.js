import React from 'react';
import { Link } from 'react-router-dom'

import timeAgo from '../../../../../utils/timeAgo'

const crudPost = (props) => {
  let data = props.posts
  let posts = data.map((post, index) => {
    return (
      <tr key={post._id}>
        <td>{index + 1}</td>
        <td>{timeAgo(new Date(post.updatedAt).getTime())}</td>
        <td>{post.content}</td>
        <td className="description-zip">{post.description}</td>
        <td>{post.subjects.join(", ")}</td>
        <td>{post.username.username}</td>
        <td>{post.likes.length}</td>
        <td>{post.comments.length}</td>
        <td>{post.saved.length}</td>
        <td>
          <Link to={`/admin/posts/edit/${post._id}`}>
            <div
              className="inline-block text-base px-4 py-2 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent"
            >Edit
          </div>
          </Link>
        </td>
        <td>
          <div
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.delete(post._id) }}
            className="inline-block cursor-pointer text-base px-4 py-2 leading-none border rounded-lg bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent"
          >Delete
          </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      {posts}
    </>
  );
}

export default crudPost;