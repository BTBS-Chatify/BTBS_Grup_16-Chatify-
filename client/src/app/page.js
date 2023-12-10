"use client";
import { useEffect, useState, useReducer } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import GroupCard from "@/components/GroupCard";
import MessageCard from "@/components/MessageCard";
import Chat from "@/components/Chat";
import Header from "@/components/Header";
import isAuth from "@/middleware/isAuth";
import GroupCreateModal from "@/components/GroupCreateModal";
import axios from "axios";
import { toast } from "react-toastify";

const Home = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const number = 0;

  async function fetchGroups() {
    let serverUrl = process.env.SERVER_URL;
    let endpoint = "/group/all";

    if (user != null) {
      try {
        await axios
          .post(serverUrl + endpoint, {
            userId: user.id,
          })
          .then((response) => {
            let status = response.data.status;
            if (status === "success") {
              let responseGroups = response.data.groups;

              //Eğer gruplar geldiyse, groups listesine atıyoruz.
              setGroups(responseGroups);
            } else {
              toast.error(JSON.stringify(response.data.message));
            }
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    fetchGroups();
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

        <main className="xl:pl-96 hidden lg:block">
          <Chat />
        </main>
      </div>

      <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
          <div>
            <span className="font-semibold text-lg text-slate-900">Akış</span>
          </div>
          <div>
            <GroupCreateModal user={user} fetchGroups={fetchGroups} />
          </div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              groupName={group.name}
              latestSender="Deneme"
              latestMsg="bu bir deneme mesajıdır"
              latestMsgTime="15:35"
            />
          ))}
          <MessageCard
            unreadMsgCount="1"
            senderFullname="Enes Öztekin"
            latestMsg="Kanka projeyi naptın?"
            latestMsgTime="15:35"
          />
        </div>
      </aside>
    </div>
  );
};

export default isAuth(Home);
