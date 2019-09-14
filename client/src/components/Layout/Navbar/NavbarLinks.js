import React from 'react';
import { Link } from "react-router-dom";

const navbarLinks = (props) => {
  return (
    <>
      <li>
        <Link to={`/search/${props.to}`} title={props.title}>#{props.content}</Link>
      </li>
    </>
  );
}

export default navbarLinks;