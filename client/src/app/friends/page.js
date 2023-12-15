"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import isAuth from "@/middleware/isAuth";
import Header from "@/components/Header";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyFriendCard from "@/components/MyFriendCard";

import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Friends = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myFriends, setFriends] = useState([]);

  const fetchFriends = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/friend/friends";
      axios
        .post(serverUrl + endPoint, {
          userId: id,
        })
        .then(
          // Axios isteği bittiğinde çalışan fonksiyon
          (response) => {
            if (response.data.status === "success") {
              const currentFriends = response.data.friends;
              setFriends(currentFriends);
            }
            console.log(myFriends);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user != null ? fetchFriends(user.id) : null;
  }, [user]);

  return (
    <div>
      <Navigation />
      <div className="lg:pl-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <Header user={user} />
        </div>

        <main className="xl:pl-96 hidden lg:block"></main>
      </div>

      <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <span className="font-semibold text-lg text-slate-900">
              Arkadaşlarım
            </span>
            {myFriends.map((friend) => (
              <MyFriendCard
                friendId={friend.user2Id}
                fullname={friend.user2.fullName}
                username={friend.user2.username}
                picture={friend.user2.picture}
              />
            ))}
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8"></div>
      </aside>
    </div>
  );
};

export default isAuth(Friends);
