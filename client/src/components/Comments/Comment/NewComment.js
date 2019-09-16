import React from 'react';

import Spinner from '../../UI/Spinner/Spinner'

const newComment = (props) => {
  return (
    <div className="mt-16 w-full md:w-1/2 mx-auto text-center items-center">
      <form onSubmit={props.submitForm}>
        <textarea disabled={props.loading} type="text" name="name" value={props.comment} onChange={props.onCommentChange} placeholder="Deneyim Paylaş..." rows="3" className="form-textarea outline-none bg-gray-100 shadow rounded-lg border-0 p-2 w-full block focus:border-tekno mb-2 mr-2 appearance-none" />
        {props.loading ? <Spinner /> : <button type="submit" value="submit" className="inline-block text-base px-4 py-2 mr-4 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent mt-2 lg:mt-0">Gönder</button>}
      </form>
    </div>
  );
}

export default newComment;