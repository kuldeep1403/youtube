import React, { useEffect, useState } from "react";
import { getCommentsThreadAPI, getRepliesAPI } from "../utils/contast";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import Replies from "./Replies";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = ({ videoId }) => {
  const [commentData, setCommentData] = useState([]);
  const [repliesData, setRepliesData] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);

  const fetchComments = async (pageToken = "") => {
    const res = await fetch(
      `${getCommentsThreadAPI}${videoId}&pageToken=${pageToken}`
    );
    const data = await res.json();
    if (pageToken) {
      setCommentData((prev) => [...prev, ...data.items]);
    } else {
      setCommentData(data.items);
    }
    setNextPageToken(data.nextPageToken);
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const getReplies = async (parentId) => {
    if (!showReplies) {
      const res = await fetch(getRepliesAPI + parentId);
      const data = await res.json();
      setRepliesData(data.items);
    }
    setShowReplies((prev) => !prev);
  };

  const fetchMoreComments = async () => {
    if (nextPageToken) {
      await fetchComments(nextPageToken);
    }
  };

  return (
    <InfiniteScroll
      dataLength={commentData.length}
      next={fetchMoreComments}
      hasMore={!!nextPageToken}
      scrollThreshold={0.7}
      loader={<h4 className="text-center py-4">Loading more comments...</h4>}
    >
      {commentData.map((comment) => (
        <div key={comment?.etag} className="flex gap-3 py-4">
          <img
            src={
              comment?.snippet?.topLevelComment?.snippet
                ?.authorProfileImageUrl ||
              "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            }
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">
                {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
              </span>
              <span className="text-gray-500 text-xs">
                {formatDistanceToNow(
                  new Date(
                    comment?.snippet?.topLevelComment?.snippet?.publishedAt
                  ),
                  { addSuffix: true }
                )}
              </span>
            </div>
            <p className="text-sm mt-1">
              {comment?.snippet?.topLevelComment?.snippet?.textDisplay}
            </p>

            <div className="flex gap-4 mt-2 text-sm text-gray-600 items-center">
              <button className="flex items-center gap-1 hover:text-black cursor-pointer">
                <BiLike className="text-xl" />
                {comment?.snippet?.topLevelComment?.snippet?.likeCount > 0 && (
                  <span>
                    {comment?.snippet?.topLevelComment?.snippet?.likeCount}
                  </span>
                )}
              </button>
              <button className="cursor-pointer">
                <BiDislike className="text-xl" />
              </button>
            </div>

            {comment?.snippet?.totalReplyCount > 0 && (
              <>
                <div
                  className="flex items-center text-blue-600 font-bold space-x-1 cursor-pointer mt-3 ml-3"
                  onClick={() => getReplies(comment?.id)}
                >
                  <IoIosArrowDown className="text-base mr-2" />
                  <span>
                    {comment.snippet.totalReplyCount}{" "}
                    {comment.snippet.totalReplyCount === 1
                      ? "Reply"
                      : "Replies"}
                  </span>
                </div>

                {repliesData &&
                  showReplies &&
                  repliesData.map((reply) => (
                    <Replies comment={reply} key={reply?.etag} />
                  ))}
              </>
            )}
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Comments;
