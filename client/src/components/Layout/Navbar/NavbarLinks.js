import React from 'react';
import { Link } from "react-router-dom";

const navbarLinks = (props) => {
  return (
    <>
      <li className="text-tekno3 md:text-xs lg:text-base font-bold" style={{ fontSize: '0.6rem' }}>
        <Link to={`/search/${props.to}`} title={props.title}>#{props.content}</Link>
      </li>
    </>
  );
}

export default navbarLinks;