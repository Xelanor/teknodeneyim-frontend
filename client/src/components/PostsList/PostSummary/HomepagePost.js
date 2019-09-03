import React from 'react';
import { Link } from "react-router-dom";

import HomepageComment from '../../Comments/Comment/HomepageComment'

const homepagePost = (props) => {
  console.log(props.comments)
  let comments = props.comments.map(comment => {
    return (
      <HomepageComment comment={comment} />
    )
  })
  return (
    <div className="mb-16">
      <div className="flex">
        <Link to={`/posts/${props.id}`}>
          <div class="font-semibold text-2xl text-tekno">
            {props.content}
          </div>
        </Link>
      </div>
      <div class="flex mt-2">
        <div class="font-normal text-md text-gray-600">
          İster dışarıda parlak güneşin altında, ister karanlıkta
          sinematik izleme deneyiminin keyfini çıkarın. Dinamik Ton
          Haritalama teknolojisi ile HDR10+ sertifikalıdır, videoları
          gerçek renk ve kontrastla oynatır, böylece YouTube'da HDR10+
          içerikleri izlemek canlı ve heyecanlı hale gelir.
        </div>
      </div>
      {comments}
    </div>
  );
}

export default homepagePost;