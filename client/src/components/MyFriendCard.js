import React, { useEffect, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import axios from "axios";

const MyFriendCard = ({ friendId, picture, fullname, username }) => {
  const handleMsgClick = () => {};
  return (
    <div className="bg-slate-100 my-5 p-3 rounded-lg">
      <div className="w-full flex justify-between items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-700 font-bold">{fullname}</span>
          <span className="text-sm text-slate-700">@{username}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 ml-auto mr-3 cursor-pointer"
          onClick={handleMsgClick}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      </div>
    </div>
  );
};

export default MyFriendCard;
