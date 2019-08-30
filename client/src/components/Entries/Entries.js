import React from 'react';

import Entry from './Entry/Entry'

const entries = (props) => {
  let data = props.data
  let entries = data.map(entry => {
    return <Entry key={entry._id} username={entry.username} content={entry.content} createdAt={entry.createdAt} />
  })
  return (
    <>
      {entries}
    </>
  );
}

export default entries;