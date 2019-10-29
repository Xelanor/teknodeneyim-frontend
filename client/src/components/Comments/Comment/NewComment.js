import React from 'react';

import Spinner from '../../UI/Spinner/Spinner'

const newComment = (props) => {
  return (
    <div id="deneyim" className="mt-16 w-full md:w-3/4 mx-auto text-center items-center">
      <form onSubmit={props.submitForm}>
        <textarea
          disabled={props.loading}
          type="text"
          name="name"
          value={props.comment}
          onChange={props.onCommentChange}
          placeholder="Deneyim Paylaş..."
          rows="5"
          className="form-textarea outline-none bg-gray-100 shadow rounded-lg border-0 p-4 w-full block focus:border-tekno mb-2 mr-2 appearance-none" />
        <div className="flex mt-2 lg:mt-0 h-10 float-right w-full justify-between">
          {props.loading ? <Spinner /> :
            <button
              type="submit"
              value="submit"
              className="inline-block text-xs md:text-base px-2 md:px-4 py-2 mr-4 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent"
              disabled={props.numChar > props.maxChar}
            >Gönder
            </button>}
          <div id="counter" className="flex items-center">
            <div className="text-sm">Karakter Sayısı: {props.numChar}/{props.maxChar}</div>
            <svg className="h-10 w-16">
              <circle id="gray" cx="50%" cy="50%" r="15"></circle>
              <circle id="colored" cx="50%" cy="50%" r="15" style={props.ringStyle}></circle>
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}

export default newComment;