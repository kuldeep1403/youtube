import { formatDistanceToNow } from "date-fns";
import { BiLike, BiDislike } from "react-icons/bi";
import React from "react";

const Replies = ({ comment }) => {
  return (
    <div key={comment?.etag} className="flex gap-3 py-4">
      <img
        src={
          comment?.snippet?.authorProfileImageUrl
            ? comment?.snippet?.authorProfileImageUrl
            : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        }
        alt="Avatar"
        className="w-6 h-6 rounded-full"
      />

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">
            {comment?.snippet?.authorDisplayName}
          </span>
          <span className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(comment?.snippet?.publishedAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm mt-1">{comment?.snippet?.textDisplay}</p>

        <div className="flex gap-4 mt-2 text-sm text-gray-600 items-center">
          <button className="flex items-center gap-1 hover:text-black cursor-pointer">
            <BiLike className="text-xl" />
            {comment?.snippet?.likeCount > 0 ? (
              <span>{comment?.snippet?.likeCount}</span>
            ) : (
              <></>
            )}
          </button>
          <button className="cursor-pointer">
            <BiDislike className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Replies;
