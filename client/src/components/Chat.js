import React, { useEffect, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import axios from "axios";

const Chat = ({ chatTitle }) => {
  const [groupMessages, setGroupMessages] = useState([]);

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
    console.log(messages);
  };

  useEffect(() => {
    fetchGroupMessages(2);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-100 lg:p-6">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center space-x-2">
              <div className="">
                <img
                  src="https://bgcp.bionluk.com/images/avatar/200x200/560da9fe-cb7c-42f7-adc7-3755df667792.jpg"
                  className="rounded-full h-9 w-9"
                  alt=""
                />
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

      <div id="chat-container">
        <div id="messages">
          {groupMessages.map((el, index) => (
            <MessageBubble
              key={index}
              message={el.message}
              sentAt={el.createdAt}
            />
          ))}
        </div>
      </div>

      <div className="z-40 w-full fixed bottom-0 p-6 bg-white border-t lg:mb-1 border-gray-50">
        <div className="flex gap-2">
          <form className="flex-grow">
            <input
              type="text"
              className="w-full border-transparent rounded h-10 bg-gray-50 placeholder:text-14 text-14"
              placeholder="Enter Message..."
            />
          </form>
          <div>
            <div>
              <ul className="mb-0">
                <li className="inline-block" title="Emoji">
                  {/* Emoji button */}
                </li>
                <li className="inline-block" title="Attached File">
                  {/* Attached File button */}
                </li>
                <li className="inline-block">
                  <button
                    type="submit"
                    className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600"
                  >
                    <i className="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
