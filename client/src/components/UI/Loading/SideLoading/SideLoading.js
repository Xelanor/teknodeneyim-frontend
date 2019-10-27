import React from 'react';

import './SideLoading.css'

const SideLoading = (props) => {
  return (
    <>
      <div className="flex mb-4 single-post justify-between">
        <div className="title"></div>
        <div className="content-side"></div>
      </div>
      <div className="flex mb-4 single-post justify-between">
        <div className="title-long"></div>
        <div className="content-side"></div>
      </div>
    </>
  );
}

export default SideLoading;