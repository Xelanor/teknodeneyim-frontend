import React from "react";
import { useRef } from "react";
import PropTypes from "prop-types";

import LatestDeneyimler from "./LatestDeneyimler/LatestDeneyimler";
import FavoritePosts from "./FavoritePosts/FavoritePosts";

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const ProfileFeeds = props => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  let page;
  switch (props.profileTab) {
    case "latest":
      page = <LatestDeneyimler user={props.user} auth={props.auth} />;
      break;
    case "favs":
      page = (
        <FavoritePosts
          user={props.user}
          auth={props.auth}
          onPostSaved={props.onPostSaved}
        />
      );
      break;
  }

  return (
    <div className="flex-1 mt-4 md:mt-0">
      <div className="flex-1 mb-4">
        <div
          onClick={() => {
            executeScroll();
            props.changeTab("latest");
          }}
          className="flex-1 inline-block text-base px-1 py-1 border rounded-sm bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent text-center cursor-pointer"
          ref={myRef}
        >
          Son Deneyimler
        </div>
        <div
          onClick={() => {
            executeScroll();
            props.changeTab("favs");
          }}
          className="flex-1 inline-block text-base px-1 py-1 border rounded-sm bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent text-center cursor-pointer"
        >
          Favori Başlıklar
        </div>
        {/* <div
          onClick={() => props.changeTab("products")}
          className="flex-1 inline-block text-base px-1 py-1 border rounded-sm bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent text-center cursor-pointer"
        >
          Kullandığı Ürünler
        </div>
        <div
          onClick={() => props.changeTab("settings")}
          className="flex-1 inline-block text-base px-1 py-1 border rounded-sm bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent text-center cursor-pointer"
        >
          Profil Ayarları
        </div> */}
      </div>
      {page}
    </div>
  );
};

ProfileFeeds.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object,
  changeTab: PropTypes.func,
  onPostSaved: PropTypes.func,
  profileTab: PropTypes.string
};

export default ProfileFeeds;
