import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Music",
  "Battlegrounds Mobile India",
  "Mixes",
  "Esports",
  "Live",
  "Recently Uploaded",
  "Gaming",
  "News",
  "Podcasts",
  "Comedy",
  "Technology",
  "Education",
  "Movies",
  "Trailers",
  "Science",
  "DIY",
  "Fitness",
  "Travel",
  "Watched",
  "New to you",
];

const FilterButtonList = () => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap px-4 py-2">
      {list.map((item) => (
        <Button key={item} name={item} />
      ))}
    </div>
  );
};

export default FilterButtonList;
