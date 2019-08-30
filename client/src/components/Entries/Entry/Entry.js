import React from 'react';

const entry = (props) => {
  return (
    <div>
      <h1>{props.username}</h1>
      <h3>{props.content}</h3>
      <h5>{props.createdAt}</h5>
    </div>
  );
}

export default entry;