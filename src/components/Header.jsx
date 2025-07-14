import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dipatch = useDispatch();

  const toggleMenuHandler = () => {
    dipatch(toggleMenu());
  };

  return (
    <div className="grid grid-cols-12 items-center p-4 px-6">
      <div className="flex items-center col-span-2 space-x-3">
        <img
          onClick={toggleMenuHandler}
          className="h-8 w-8 object-contain cursor-pointer"
          alt="menu"
          src="https://cdn-icons-png.flaticon.com/512/9663/9663120.png"
        />
        <a href="/">
          <img
            className="h-6 object-contain cursor-pointer"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-8 flex justify-center">
        <div className="flex w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow border border-gray-300 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm"
          />
          <button className="border border-gray-300 bg-gray-100 px-5 py-2 rounded-r-full hover:bg-gray-200 transition duration-200 cursor-pointer">
            <img
              className="h-4 w-4"
              alt="search"
              src="https://www.vhv.rs/dpng/d/408-4081702_simple-grey-search-icon-transparent-background-search-icon.png"
            />
          </button>
        </div>
      </div>
      <div className="flex justify-end col-span-2">
        <img
          className="h-8 w-8 rounded-full object-cover"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Header;
