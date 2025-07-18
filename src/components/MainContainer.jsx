import React, { useEffect } from "react";
import FilterButtonList from "./FilterButtonList";
import VideoContainer from "./VideoContainer";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";

export const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openMenu());
  }, []);
  return (
    <div className="flex-1 overflow-y-auto bg-white p-4">
      <FilterButtonList />
      <VideoContainer />
    </div>
  );
};
