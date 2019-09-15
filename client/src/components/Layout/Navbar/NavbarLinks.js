import React from 'react';
import { Link } from "react-router-dom";

const navbarLinks = (props) => {
  return (
    <>
      <li className="text-tekno3 text-md font-bold">
        <Link to={`/search/${props.to}`} title={props.title}>#{props.content}</Link>
      </li>
    </>
  );
}

export default navbarLinks;