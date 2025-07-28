const GOOGLE_API_KEY = import.meta.env.VITE_API_KEY;
console.log(GOOGLE_API_KEY);
export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const getVideoUrl = (id) => {
  const GET_VIDEO_DETAILS =
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=` +
    GOOGLE_API_KEY;
  return GET_VIDEO_DETAILS;
};

export const getChannelDetails = (id) => {
  const GET_CHANNEL_DETAILS =
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=` +
    GOOGLE_API_KEY;

  return GET_CHANNEL_DETAILS;
};

export const SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=";

export const getSearchDetailsAPI = (query) => {
  const GET_SEARCH_DETAILS =
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=` +
    GOOGLE_API_KEY;

  return GET_SEARCH_DETAILS;
};

export const getCommentsThreadAPI = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${GOOGLE_API_KEY}&videoId=`;

export const getRepliesAPI = `https://www.googleapis.com/youtube/v3/comments?part=snippet&key=${GOOGLE_API_KEY}&parentId=`;

export const getVideoStatistics = (videoIds) => {
  return `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${GOOGLE_API_KEY}`;
};
