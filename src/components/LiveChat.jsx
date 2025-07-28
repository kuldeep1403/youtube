import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChats } from "../utils/ChatSlice";
import { getRandomMessage, getRandomName } from "../utils/Helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const chat = useSelector((store) => store.chat.liveChat);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        addChats({ name: getRandomName(), message: getRandomMessage() })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    const threshold = 50;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;

    setIsAtBottom(isNearBottom);
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container || !isAtBottom) return;

    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 100);
  }, [chat, isAtBottom]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addChats({ name: "You", message: input }));
    setInput("");
    setIsAtBottom(true);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[650px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">Top chat</span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
            0XP
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-scroll"
        onScroll={handleScroll}
      >
        <div className="px-2 py-2 space-y-1 min-h-full flex flex-col justify-end">
          {chat.map((item, idx) => (
            <div
              className="flex items-start space-x-2 px-2 py-1 hover:bg-gray-50 rounded transition-colors duration-150"
              key={idx}
            >
              <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                <img
                  src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-900 mr-1">
                  {item.name}
                </span>
                <span className="text-sm text-gray-700">{item.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 p-3">
        <form onSubmit={sendMessage} className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Say something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={200}
            />
          </div>
          <button
            type="submit"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={!input.trim()}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
