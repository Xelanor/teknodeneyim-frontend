import React from 'react';

import Spinner from '../../UI/Spinner/Spinner'

const newComment = (props) => {
  return (
    <div className="mt-16 items-center">
      <form onSubmit={props.submitForm}>
        <input disabled={props.loading} type="text" name="name" value={props.comment} onChange={props.onCommentChange} placeholder="Yorum Yap..." className="outline-none bg-purple-white shadow rounded-lg border-0 p-8 pr-32 focus:border-tekno mb-2" />
        {props.loading ? <Spinner /> : <button type="submit" value="submit" className="inline-block text-base px-4 py-2 mr-4 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent mt-2 lg:mt-0">Gönder</button>}
      </form>
    </div>
  );
}

export default newComment;