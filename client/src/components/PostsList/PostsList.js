import React from 'react';

import PostSummary from './PostSummary/PostSummary'
import './PostsList.css'

const postsList = (props) => {
  let data = props.posts
  let posts = data.map(post => {
    return <PostSummary
      key={post._id}
      id={post._id}
      username={post.username}
      content={post.content}
      createdAt={post.createdAt}
    />
  })
  return (
    <div id="index-section">
      <div id="leftCol">
        {posts}
      </div>
    </div>
  );
}

export default postsList;