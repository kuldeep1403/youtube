import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getSearchDetailsAPI,
  getVideoStatistics,
  getChannelDetails,
} from "../utils/contast";
import {
  formatViewCount,
  formatPublishedDate,
  formatDuration,
} from "../utils/formatters";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoShimmer from "../utils/VideoShimmer";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const dispatch = useDispatch();

  const fetchVideoStatistics = async (videoIds) => {
    try {
      const url = getVideoStatistics(videoIds.join(","));
      const res = await fetch(url);
      const data = await res.json();
      return data.items || [];
    } catch (err) {
      console.error("❌ Error fetching video statistics:", err);
      return [];
    }
  };

  const fetchChannelDetails = async (channelIds) => {
    try {
      const channelPromises = channelIds.map(async (channelId) => {
        const url = getChannelDetails(channelId);
        const res = await fetch(url);
        const data = await res.json();
        return data.items?.[0] || null;
      });

      const results = await Promise.all(channelPromises);
      return results.filter(Boolean);
    } catch (err) {
      console.error("❌ Error fetching channel details:", err);
      return [];
    }
  };

  const fetchData = async (token = "") => {
    if (loading) return;
    setLoading(true);
    try {
      const endPointUrl = getSearchDetailsAPI(searchParams.get("q"));
      const url = token ? `${endPointUrl}&pageToken=${token}` : endPointUrl;
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data.items)) {
        const videoIds = data.items
          .filter((item) => item?.id?.kind === "youtube#video")
          .map((item) => item.id.videoId);

        const channelIds = [
          ...new Set(
            data.items
              .filter((item) => item?.id?.kind === "youtube#video")
              .map((item) => item.snippet.channelId)
          ),
        ];

        const [statisticsData, channelData] = await Promise.all([
          fetchVideoStatistics(videoIds),
          fetchChannelDetails(channelIds),
        ]);

        const enrichedVideos = data.items.map((video) => {
          const stats = statisticsData.find(
            (stat) => stat.id === video.id.videoId
          );
          const channel = channelData.find(
            (ch) => ch.id === video.snippet.channelId
          );

          return {
            ...video,
            statistics: stats?.statistics || {},
            contentDetails: stats?.contentDetails || {},
            channelDetails: channel?.snippet || {},
          };
        });

        setVideoData((prev) => [...prev, ...enrichedVideos]);
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (err) {
      console.error("❌ Error fetching videos:", err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    setVideoData([]);
    setInitialLoading(true);
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    dispatch(openMenu());
  }, [dispatch]);

  // Show shimmer during initial load
  if (initialLoading) {
    return (
      <div className="overflow-y-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <VideoShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <InfiniteScroll
        dataLength={videoData.length}
        next={() => fetchData(nextPageToken)}
        hasMore={!!nextPageToken}
        loader={
          <div className="py-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <VideoShimmer key={`loader-${index}`} />
            ))}
          </div>
        }
      >
        {videoData.map((video) => {
          if (video?.id?.kind !== "youtube#video") return null;

          return (
            <Link to={`/watch?v=${video?.id?.videoId}`} key={video?.etag}>
              <div className="flex gap-4 p-4 max-w-7xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="relative w-120 h-75 flex-shrink-0">
                  <img
                    src={video?.snippet?.thumbnails?.high?.url}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />

                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                    {formatDuration(video?.contentDetails?.duration)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold leading-snug hover:text-blue-600">
                    {video?.snippet?.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {video?.statistics?.viewCount
                      ? formatViewCount(video.statistics.viewCount)
                      : "Views unavailable"}{" "}
                    • {formatPublishedDate(video?.snippet?.publishedAt)}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={
                        video?.channelDetails?.thumbnails?.default?.url ||
                        video?.channelDetails?.thumbnails?.medium?.url ||
                        "https://yt3.ggpht.com/ytc/AAUvwnhZZZZZZZ=s88-c-k-c0x00ffffff-no-rj"
                      }
                      alt="Channel Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://yt3.ggpht.com/ytc/AAUvwnhZZZZZZZ=s88-c-k-c0x00ffffff-no-rj";
                      }}
                    />
                    <p className="text-sm text-gray-700">
                      {video?.snippet?.channelTitle}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {video?.snippet?.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default SearchPage;
