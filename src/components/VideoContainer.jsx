import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { YOUTUBE_VIDEO_API } from "../utils/contast";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import VideoCardSkeleton from "./VideoCardSkeleton";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(12);

  const fetchVideos = async (token = "") => {
    if (loading) return;

    setLoading(true);
    const startTime = new Date().toLocaleTimeString();
    const perfStart = performance.now();
    console.log(
      `⏱️ API call STARTED at: ${startTime} (token: ${token || "first page"})`
    );

    try {
      const url = token
        ? `${YOUTUBE_VIDEO_API}&pageToken=${token}`
        : YOUTUBE_VIDEO_API;

      const res = await fetch(url);
      const videosList = await res.json();

      if (Array.isArray(videosList.items)) {
        setVideos((prev) => [...prev, ...videosList.items]);
      }

      setNextPageToken(videosList.nextPageToken || null);
    } catch (err) {
      console.error("❌ Error fetching videos:", err);
    } finally {
      const endTime = new Date().toLocaleTimeString();
      const perfEnd = performance.now();
      const duration = (perfEnd - perfStart).toFixed(2);
      console.log(`✅ API call ENDED at: ${endTime} — Duration: ${duration}ms`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const calculateSkeletonCount = () => {
    const cardHeight = 300;
    const cardWidth = 280;
    const rows = Math.ceil(window.innerHeight / cardHeight);
    const columns = Math.floor(window.innerWidth / cardWidth);
    return rows * (columns || 1);
  };

  useEffect(() => {
    const updateSkeletonCount = () => {
      const count = calculateSkeletonCount();
      setSkeletonCount(count);
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);

  return (
    <div className="min-h-screen px-4 pt-6 pb-10">
      <InfiniteScroll
        dataLength={videos.length}
        next={() => {
          console.log("🔄 InfiniteScroll triggered next()");
          fetchVideos(nextPageToken);
        }}
        hasMore={!!nextPageToken}
        loader={
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] mt-6">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <VideoCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        }
        scrollThreshold="200px"
        useWindow={true}
      >
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]">
          {videos.map((video) => (
            <Link to={`/watch?v=${video.id}`} key={video.id}>
              <VideoCard info={video} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default VideoContainer;
