import React from "react";
import PropTypes from "prop-types";

import Comment from "../../Comments/Comment/Comment";

const FavoritePosts = props => {
  let sliced_comments = props.user.comments.slice(1, 11);
  let comments = sliced_comments.map(comment => {
    return (
      <Comment
        key={comment._id}
        id={comment._id}
        username={comment.username}
        content={comment.content}
        createdAt={comment.createdAt}
        likes={comment.likes}
        commentLike={props.commentLike}
        user={props.user}
        postId={props.slug}
        profile={true}
        target={comment.target}
      />
    );
  });
  return (
    <div className="flex-1">
      <div className="font-bold text-3xl text-tekno3 mb-3">
        {props.auth.id === props.user._id
          ? "Son Deneyimlerin"
          : props.user.username + " Kullanıcısının Son Deneyimleri"}
      </div>
      {comments}
    </div>
  );
};

FavoritePosts.propTypes = {
  user: PropTypes.object
};

export default FavoritePosts;
