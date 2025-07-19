import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChats } from "../utils/ChatSlice";
import { getRandomMessage, getRandomName } from "../utils/Helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const chat = useSelector((store) => store.chat.liveChat);
  console.log(chat);

  useEffect(() => {
    const interval = setInterval(() => {
      //API CALL
      console.log("API polling");

      dispatch(
        addChats({ name: getRandomName(), message: getRandomMessage() })
      );
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="border border-gray-800 h-[650px] rounded-xl p-4 overflow-y-scroll flex flex-col-reverse">
      {chat.map((item, index) => {
        return (
          <div className="flex items-center gap-2 p-2" key={index}>
            <img
              className="h-6 w-6 rounded-full object-cover"
              alt="user-icon"
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            />
            <span className="font-medium text-sm text-gray-800">
              {item.name}
            </span>
            <span className="text-sm text-gray-700">{item.message} 🚀</span>
          </div>
        );
      })}
    </div>
  );
};

export default LiveChat;
