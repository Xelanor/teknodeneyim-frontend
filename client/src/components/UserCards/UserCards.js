import React from 'react';

import UserCard from './UserCard/UserCard'

const UserCards = (props) => {
  return (
    <>
    {props.users.map(user=> {
      return <UserCard key={user._id} user={user}/>
    })}
    </>
  );
}

export default UserCards;