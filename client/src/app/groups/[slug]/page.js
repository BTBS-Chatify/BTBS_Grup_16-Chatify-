"use client";
import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import isAuth from "@/middleware/isAuth";
import Header from "@/components/Header";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyGroupCard from "@/components/MyGroupCard";
import { toast } from "react-toastify";

import GroupSettings from "@/components/GroupSettings";

import axios from "axios";
import io from "socket.io-client";
import MessageBubble from "@/components/MessageBubble";

const Page = ({ params, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [socket, setSocket] = useState(null);
  const [group, setGroup] = useState(null);
  const [groupMessages, setGroupMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchGroups = async () => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/myGroups";
      const data = {
        userId: user.id,
      };
      axios.post(serverUrl + endPoint, data).then((response) => {
        if (response.data.status === "success") {
          setMyGroups(response.data.groups);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchGroup = async (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/group";
      const data = {
        groupId: parseInt(id),
      };
      axios.post(serverUrl + endPoint, data).then((response) => {
        if (response.data.status === "success") {
          setGroup(response.data.group);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchGroupMessages = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/messages";
      axios
        .post(serverUrl + endPoint, {
          groupId: id,
        })
        .then(
          // Axios isteği bittiğinde çalışan fonksiyon
          (response) => {
            const currentMessages = response.data.messages;

            setGroupMessages(currentMessages);
            console.log(groupMessages);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = async (groupId) => {
    await axios
      .post(process.env.SERVER_URL + "/group/message/add", {
        groupId: groupId,
        userId: user.id,
        message: message,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          fetchGroupMessages(groupId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.trim() !== "") {
      addMessage(group.id);
      try {
        socket.emit(
          "groupMessage",
          user.username,
          group.id,
          message.trim(message)
        );
      } catch (error) {
        toast.error(error.message);
      }
      setMessage("");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    user != null ? fetchGroups(user.id) : null;
    user != null ? fetchGroup(params.slug) : null;
    console.log(myGroups);
  }, [user]);

  useEffect(() => {
    group != null ? fetchGroupMessages(group.id) : null;

    const serverUrl = "http://localhost:3005";
    const newSocket = io(serverUrl);

    newSocket.on("connect", () => {
      console.log("Socket.IO bağlantısı başarılı.");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket.IO bağlantı hatası:", error);
    });

    setSocket(newSocket);

    group != null ? newSocket.emit("joinRoom", group.id) : null;

    return () => {
      newSocket.disconnect();
    };
  }, [group]);

  useEffect(() => {
    if (socket != null) {
      socket.on("groupMessage", (message) => {
        const serverUrl = process.env.SERVER_URL;
        const endPoint = "/group/messages";
        axios
          .post(serverUrl + endPoint, {
            groupId: group.id,
          })
          .then((response) => {
            if (response.data.status === "success") {
              const currentMessages = response.data.messages;
              setGroupMessages(currentMessages);
            }
          });
      });
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, [groupMessages]);

  document.body.style.overflow = "hidden";
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
          <div className="relative w-full overflow-hidden flex flex-col h-screen">
            {/* chat header */}
            <div
              className={
                groupMessages.length > 0
                  ? "p-4 bg-white border-b border-gray-100 lg:p-6 left-0 right-0 mt-16"
                  : "p-4 bg-white border-b border-gray-100 lg:p-6 left-0 right-0"
              }
            >
              <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex items-center space-x-2">
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="h-14 w-14 bg-red-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {group != null ? group.name[0] : null}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow overflow-y-hidden">
                      <h5 className="mb-0">
                        <a href="#" className="text-gray-800">
                          {group != null ? group.name : null}
                        </a>
                        <i className="text-green-500 ri-record-circle-fill text-10"></i>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                  <ul className="flex items-center justify-end lg:gap-4">
                    <li className="mr-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <i className="ri-settings-4-fill"></i>
                      </button>
                    </li>
                    <li>
                      <button className="text-gray-400 hover:text-gray-600">
                        <i className="ri-more-2-fill"></i>
                      </button>
                      <GroupSettings
                        user={user}
                        groupId={group != null ? group.id : null}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              id="chat-container"
              className="flex-grow overflow-auto px-4 py-10 sm:px-6 lg:px-6 lg:py-4"
            >
              {user != null
                ? groupMessages.map((el, index) => (
                    <MessageBubble
                      key={index}
                      message={el.message}
                      sentAt={el.createdAt}
                      isSender={el.userId == user.id}
                      senderPicture={el.user.picture}
                      sender={el.user.username}
                      messageRef={messagesEndRef}
                    />
                  ))
                : null}
            </div>

            <div
              className={
                groupMessages.length > 0
                  ? "p-6 h-15 bg-white border-t border-gray-50"
                  : "p-6 h-15 bg-white border-t border-gray-50 mb-16"
              }
            >
              <form onSubmit={handleSubmit} className="flex justify-between">
                <input
                  type="text"
                  value={message}
                  onChange={handleChange}
                  placeholder="Mesajınızı buraya yazın..."
                  className="w-full mx-5 px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:outline-none focus:ring-indigo-500 focus:border focus:rounded-lg "
                />
                <button
                  type="submit"
                  className="bg-slate-600 hover:bg-slate-500 p-3 rounded-full border-0 outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="white"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <span className="font-semibold text-lg text-slate-900">
              Gruplarım
            </span>
            {myGroups.map((group) => (
              <MyGroupCard
                group={group}
                userId={user.id}
                fetchGroups={fetchGroups}
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

export default isAuth(Page);
