import React from 'react';

const newComment = (props) => {
  return (
    <div>
      <form onSubmit={props.submitForm}>
        <input type="text" name="name" value={props.comment} onChange={props.onCommentChange} /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default newComment;