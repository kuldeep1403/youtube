import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { getChannelDetails, getVideoUrl } from "../utils/contast";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaDownload,
  FaRegHeart,
} from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Comments from "./Comments";
import LiveChat from "./LiveChat";

export const WatchPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(closeMenu());

    const fetchVideoDetails = async () => {
      const videoUrl = getVideoUrl(videoId);
      const response = await fetch(videoUrl);
      const data = await response.json();
      setVideoData(data);
      const channelId = data.items[0].snippet.channelId;
      fetchChannelDetails(channelId);
    };

    const fetchChannelDetails = async (id) => {
      const channelUrl = getChannelDetails(id);
      const response = await fetch(channelUrl);
      const data = await response.json();
      setChannelData(data);
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [dispatch, videoId]);

  console.log(videoData);

  return (
    <div className="w-full flex min-h-screen overflow-y-scroll">
      <div className="w-3/4 p-4">
        <div className="h-[650px] w-full mb-2">
          <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="text-lg lg:text-xl font-semibold mb-4">
          {videoData?.items[0]?.snippet?.title}
        </h1>
        <div className="flex justify-between flex-col lg:flex-row gap-6">
          <div className="flex items-start gap-4 flex-wrap">
            <img
              src={
                channelData?.items[0]?.snippet?.thumbnails?.default?.url ||
                "https://via.placeholder.com/48"
              }
              alt="Channel Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-base">
                {channelData?.items[0]?.snippet?.title || "Loading..."}
              </span>
              <span className="text-xs text-gray-400">
                {channelData?.items[0]?.statistics?.subscriberCount
                  ? (() => {
                      const subs = parseInt(
                        channelData.items[0].statistics.subscriberCount,
                        10
                      );

                      if (subs >= 1_000_000) {
                        return `${(subs / 1_000_000).toFixed(2)}M subscribers`;
                      } else if (subs >= 1_000) {
                        return `${(subs / 1_000).toFixed(1)}K subscribers`;
                      } else {
                        return `${subs} subscribers`;
                      }
                    })()
                  : "Subscribers"}
              </span>
            </div>
            <div className="flex gap-2 ml-2 mt-2 lg:mt-0">
              <button className="bg-gray-100 text-black text-base px-4 py-1 rounded-full cursor-pointer font-semibold">
                Join
              </button>
              <button className="bg-black text-white font-semibold text-base px-4 py-1 rounded-full cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-black flex-wrap">
            {[
              {
                icon: <FaThumbsUp />,
                label: videoData?.items[0]?.statistics?.likeCount
                  ? (() => {
                      const likes = parseInt(
                        videoData.items[0].statistics.likeCount,
                        10
                      );

                      if (likes >= 1_000_000) {
                        return `${Math.round(likes / 1_000_000)}M`;
                      } else if (likes >= 1_000) {
                        return `${Math.round(likes / 1_000)}K`;
                      } else {
                        return `${likes}`;
                      }
                    })()
                  : "",
              },
              { icon: <FaThumbsDown /> },
              { icon: <FaShare />, label: "Share" },
              { icon: <FaDownload />, label: "Download" },
              { icon: <FaRegHeart />, label: "Thanks" },
            ].map(({ icon, label }, idx) => (
              <button
                key={idx}
                className="flex items-center bg-gray-100 gap-2 px-4 py-2 rounded-full transition cursor-pointer"
              >
                {icon}
                {label && <span className="font-bold">{label}</span>}
              </button>
            ))}
            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full transition">
              <CiMenuKebab size={18} />
            </button>
          </div>
        </div>
        <div>
          <div className="font-bold mt-4 text-2xl">
            {videoData?.items[0]?.statistics?.commentCount} Comments
          </div>
          <Comments videoId={videoId} />
        </div>
      </div>

      <div className="w-1/4 mr-3">
        <div className="overflow-y-auto p-4 ">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};
