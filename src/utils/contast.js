const GOOGLE_API_KEY = "AIzaSyA-GV0clsnSjXn5rOtir153doEbn_s0vBc";
export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&key=" +
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
