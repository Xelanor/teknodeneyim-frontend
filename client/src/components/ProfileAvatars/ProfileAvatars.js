import React from 'react';

import { AVATARS } from '../../store/actions/types'

const ProfileAvatars = (props) => {
  return (
    <>
      {AVATARS.map(avatar => {
        return (
          <div key={avatar} onClick={() => props.change(avatar)} className="flex-auto justify-center cursor-pointer">
            <img
              src={avatar}
              className="w-16 h-16 rounded-full"
            />
          </div>
        )
      })}
    </>
  );
}

export default ProfileAvatars;