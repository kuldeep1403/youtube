import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { SEARCH_API } from "../utils/contast";
import { PiMagnifyingGlass } from "react-icons/pi";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const getSearchSuggestion = async () => {
      const res = await fetch(SEARCH_API + searchQuery);
      const text = await res.text();
      const match = text.match(/\((.*)\)/);
      if (!match || !match[1]) {
        throw new Error("Invalid response format");
      }
      const data = JSON.parse(match[1]);
      setSuggestion(data[1]);
      dispatch(cacheResults({ key: searchQuery, data: data[1] }));
    };

    const timmer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timmer);
    };
  }, [searchQuery]);

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
      <div className="col-span-8 relative">
        <div className="flex justify-center">
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowSuggestions(false);
                }, 100);
              }}
              className="flex-grow border border-gray-300 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm"
            />

            <button className="border border-gray-300 bg-gray-100 px-5 py-2 rounded-r-full hover:bg-gray-200 transition duration-200 cursor-pointer">
              <Link to={`/search?q=${searchQuery}`}>
                <img
                  className="h-4 w-4"
                  alt="search"
                  src="https://www.vhv.rs/dpng/d/408-4081702_simple-grey-search-icon-transparent-background-search-icon.png"
                />
              </Link>
            </button>
          </div>
        </div>

        {searchQuery && showSuggestion && suggestion && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-xl z-50 max-h-150 overflow-y-auto">
            <ul className="text-sm">
              {suggestion?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/search?q=${item[0]}`}
                    onMouseDown={() => setSearchQuery(item[0])}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 text-gray-700 text-sm"
                  >
                    <PiMagnifyingGlass className="text-gray-500" />
                    <span>{item[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
