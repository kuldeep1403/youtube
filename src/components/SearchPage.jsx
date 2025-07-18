import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchDetailsAPI } from "../utils/contast";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const dispatch = useDispatch();

  const fetchData = async (token = "") => {
    if (loading) return;
    setLoading(true);
    try {
      const endPointUrl = getSearchDetailsAPI(searchParams.get("q"));
      const url = token ? `${endPointUrl}&pageToken=${token}` : endPointUrl;
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data.items)) {
        setVideoData((prev) => [...prev, ...data.items]);
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (err) {
      console.error("❌ Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setVideoData([]); // Clear on new search
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    dispatch(openMenu());
  }, [dispatch]);

  return (
    <div className="overflow-y-auto">
      <InfiniteScroll
        dataLength={videoData.length}
        next={() => fetchData(nextPageToken)}
        hasMore={!!nextPageToken}
        loader={<p className="text-center py-4">Loading more videos...</p>}
      >
        {videoData.map((video) => {
          if (video?.id?.kind !== "youtube#video") return null;

          return (
            <Link to={`/watch?v=${video?.id?.videoId}`} key={video?.etag}>
              <div className="flex gap-4 p-4 max-w-7xl cursor-pointer">
                <div className="relative w-120 h-75 flex-shrink-0">
                  <img
                    src={video?.snippet?.thumbnails?.high?.url}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                    8:36
                  </span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold leading-snug">
                    {video?.snippet?.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    24M views • 6 months ago
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src="https://yt3.ggpht.com/ytc/AAUvwnhZZZZZZZ=s88-c-k-c0x00ffffff-no-rj"
                      alt="Channel Logo"
                      className="w-10 h-10 rounded-full"
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
