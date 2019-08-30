import React from 'react';

import Post from './Post/Post'

const posts = (props) => {
  let data = props.posts
  let posts = data.map(post => {
    return <Post key={post._id} author={post.author} content={post.content} createdAt={post.createdAt} />
  })
  return (
    <>
      {posts}
    </>
  );
}

export default posts;