const VideoCardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden cursor-pointer">
      <div className="relative aspect-video rounded-xl shimmer"></div>

      <div className="flex p-3">
        <div className="w-9 h-9 rounded-full shimmer mr-3 flex-shrink-0"></div>
        <div className="flex flex-col flex-1 space-y-2">
          <div className="h-4 rounded shimmer w-4/5"></div>
          <div className="h-3 rounded shimmer w-3/5"></div>
          <div className="h-3 rounded shimmer w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
