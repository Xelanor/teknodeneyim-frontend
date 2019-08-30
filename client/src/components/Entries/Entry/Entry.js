import React from 'react';

const entry = (props) => {
  return (
    <div style={{ backgroundColor: '#E5F0FF' }}>
      <h4>{props.username}</h4>
      <h5>{props.content}</h5>
      <h6>{props.createdAt}</h6>
    </div>
  );
}

export default entry;