import React from 'react';

import './Comment.css'

const postSummary = (props) => {
  return (
    <div style={{ backgroundColor: '#E5F0FF', marginBottom: '10px', width: '60%', display: 'block', marginLeft: "auto", marginRight: "auto" }}>
      <p><strong>{props.username}</strong></p>
      <p>{props.content}</p>
      <p>{props.createdAt}</p>
      <div onClick={()=>props.commentLike(props.id)} className="LikeBtn Btn">
        <span className="BtnWrapper">
          {props.likes.includes(props.user) ? <i style={{color:"#e0245e"}} className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
          <span className="Count">{props.likes.length}</span>
        </span>
      </div>
    </div>
  );
}

export default postSummary;