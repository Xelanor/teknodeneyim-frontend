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
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.accept(post._id) }}
            className="inline-block cursor-pointer text-base px-4 py-2 leading-none border rounded-lg bg-green-700 text-white border-white hover:border-green-700 hover:text-tekno3 hover:bg-transparent"
          >Onayla
          </div>
        </td>
        <td>
          <div
            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.decline(post._id) }}
            className="inline-block cursor-pointer text-base px-4 py-2 leading-none border rounded-lg bg-red-600 text-white border-white hover:border-red-600 hover:text-tekno3 hover:bg-transparent"
          >Reddet
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