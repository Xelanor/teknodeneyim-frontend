import React from 'react';

const newComment = (props) => {
  return (
      <div className="mt-16 items-center">
        <form onSubmit={props.submitForm}>
          <input type="text" name="name" value={props.comment} onChange={props.onCommentChange} placeholder="Yorum Yap..." class="outline-none bg-purple-white shadow rounded-lg border-0 p-8 pr-32 focus:border-tekno mb-2"/><br />
          <button type="submit" value="submit" className="inline-block text-base px-4 py-2 mr-4 leading-none border rounded-lg bg-tekno text-white border-white hover:border-tekno hover:text-tekno hover:bg-transparent mt-2 lg:mt-0">Gönder</button>
        </form>
      </div>
  );
}

export default newComment;