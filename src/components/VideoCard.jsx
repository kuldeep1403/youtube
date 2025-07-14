import React from "react";
import { formatDistanceToNow } from "date-fns";
const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const { viewCount } = statistics;

  const formatViews = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return num;
    }
  };

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    const formatted =
      hours > 0
        ? `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`
        : `${minutes}:${String(seconds).padStart(2, "0")}`;

    return formatted;
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] duration-200">
      <div className="relative aspect-video">
        <img
          src={thumbnails?.high?.url}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(info.contentDetails.duration)}
        </span>
      </div>

      <div className="flex p-3">
        <div className="w-9 h-9 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-black line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{channelTitle}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatViews(parseInt(viewCount))} views •{" "}
            {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
