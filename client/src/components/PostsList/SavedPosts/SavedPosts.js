import React from 'react';

import SavedPost from '../PostSummary/SavedPost'

const savedPosts = (props) => {
  let data = props.posts
  let posts = data.map(post => {
    return <SavedPost
      key={post._id}
      id={post._id}
      content={post.content}
      description={post.description}
      onPostSaved={props.onPostSaved}
      saved={post.saved}
      createdAt={post.createdAt}
      user={props.user}
      loggedInUser={props.loggedInUser}
    />
  })
  return (
    <div>
      {posts}
    </div>
  );
}

export default savedPosts;