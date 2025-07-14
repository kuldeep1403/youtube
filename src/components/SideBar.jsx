import React from "react";
import {
  MdHome,
  MdHistory,
  MdPlaylistPlay,
  MdLibraryBooks,
  MdWatchLater,
  MdThumbUp,
  MdDownload,
  MdTrendingUp,
  MdShoppingCart,
  MdMusicNote,
  MdLiveTv,
  MdSportsEsports,
  MdArticle,
  MdSportsSoccer,
  MdSchool,
  MdFace,
  MdPodcasts,
  MdSubscriptions,
  MdAudiotrack,
  MdVideoLibrary as MdYourVideos,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="w-64 p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <ul className="space-y-2">
          <Link to="/">
            <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              <MdHome /> Home
            </li>
          </Link>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <SiYoutubeshorts /> Shorts
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdSubscriptions /> Subscriptions
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdAudiotrack /> YouTube Music
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2 text-gray-700">You</h1>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdHistory /> History
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdPlaylistPlay /> Playlist
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdYourVideos /> Your videos
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdLibraryBooks /> Your courses
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdWatchLater /> Watch later
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdThumbUp /> Liked videos
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdDownload /> Downloads
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Explore</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdTrendingUp /> Trending
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdShoppingCart /> Shopping
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdMusicNote /> Music
          </li>
          {/* Removed duplicate "Music" */}
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdLiveTv /> Live
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdSportsEsports /> Gaming
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdArticle /> News
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdSportsSoccer /> Sports
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdSchool /> Courses
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdFace /> Fashion & Beauty
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdPodcasts /> Podcasts
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
