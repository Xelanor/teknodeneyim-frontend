import React from "react";
import PropTypes from "prop-types";

import SavedPosts from "../../PostsList/SavedPosts/SavedPosts";

const LatestDeneyimler = props => {
  return (
    <div className="flex-1">
      <div className="font-bold text-3xl text-tekno3 mb-3">
        {props.auth.id === props.user._id
          ? "Favori Başlıkların"
          : props.user.username + " Kullanıcısının Favori Başlıkları"}
      </div>
      <SavedPosts
        posts={props.user.saved}
        onPostSaved={props.onPostSaved}
        user={props.user}
        loggedInUser={props.auth.id}
      />
    </div>
  );
};

LatestDeneyimler.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object,
  onPostSaved: PropTypes.func
};

export default LatestDeneyimler;
