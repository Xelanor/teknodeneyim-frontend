import React from 'react';

import HomepagePost from './PostSummary/HomepagePost'
import './PostsList.css'

const homepagePosts = (props) => {
  let data = props.posts
  let posts = data.map(post => {
    return <HomepagePost
      key={post._id}
      id={post._id}
      username={post.username}
      content={post.content}
      createdAt={post.createdAt}
      comments={post.comments}
    />
  })
  return (
    <div>
      {posts}
    </div>
  );
}

export default homepagePosts;