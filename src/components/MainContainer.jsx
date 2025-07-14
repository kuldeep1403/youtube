import React from "react";
import FilterButtonList from "./FilterButtonList";
import VideoContainer from "./VideoContainer";

export const MainContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-4">
      <FilterButtonList />
      <VideoContainer />
    </div>
  );
};
