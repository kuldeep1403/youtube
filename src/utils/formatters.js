// utils/formatters.js
export const formatViewCount = (viewCount) => {
  const count = parseInt(viewCount);
  if (count >= 1000000000) {
    return `${(count / 1000000000).toFixed(1)}B views`;
  } else if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
};

export const formatPublishedDate = (publishedAt) => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffTime = Math.abs(now - published);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return "Today";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  } else if (diffDays < 365) {
    return `${Math.ceil(diffDays / 30)} months ago`;
  } else {
    return `${Math.ceil(diffDays / 365)} years ago`;
  }
};

export const formatDuration = (duration) => {
  if (!duration) return "0:00";

  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  if (hours) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  } else {
    return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
  }
};
