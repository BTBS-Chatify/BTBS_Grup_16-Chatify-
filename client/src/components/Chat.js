import React, { useEffect, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import axios from "axios";

const Chat = ({ user, groupId, chatTitle }) => {
  const [groupMessages, setGroupMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchGroupMessages = () => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/messages";
      axios
        .post(serverUrl + endPoint, {
          groupId: groupId,
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
    console.log(groupId);
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

    if (message.trim() != "") {
      addMessage(groupId);
      setMessage("");
    }
  };

  useEffect(() => {
    fetchGroupMessages();
  }, [groupId]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  let firstLetter = "";
  if (chatTitle != undefined) {
    firstLetter = chatTitle[0];
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* chat header */}
      <div className="p-4 bg-white border-b border-gray-100 lg:p-6 left-0 right-0">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center space-x-2">
              <div className="col-span-3 flex items-center justify-center">
                <div className="h-14 w-14 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{firstLetter}</span>
                </div>
              </div>
              <div className="flex-grow overflow-hidden">
                <h5 className="mb-0">
                  <a href="#" className="text-gray-800">
                    {chatTitle}
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
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="chat-container" className="mb-28">
        <div className="flex flex-col">
          <div className="px-4 py-10 sm:px-6 lg:px-6 lg:py-4">
            {user != null
              ? groupMessages.map((el, index) => (
                  <MessageBubble
                    key={index}
                    message={el.message}
                    sentAt={el.createdAt}
                    isSender={el.userId == user.id}
                    senderPicture={el.user.picture}
                    sender={el.user.username}
                  />
                ))
              : null}
          </div>
        </div>
      </div>

      <div className="p-6 h-15 bg-white border-t border-gray-50">
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
  );
};

export default Chat;
