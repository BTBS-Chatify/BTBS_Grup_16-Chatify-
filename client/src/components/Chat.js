import {
  EllipsisVerticalIcon,
  InboxIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import MessageBubble from "@/components/MessageBubble";

export default function Chat() {
  const messages = [
    { text: "Merhaba!", isSender: true },
    { text: "Selam!", isSender: false },
    { text: "Nasılsın?", isSender: false },
    // ... Diğer mesajlar
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100 lg:p-6">
        <div className="grid items-center grid-cols-12">
          <div className="col-span-8 sm:col-span-4">
            <div className="flex items-center space-x-2">
              <div className=""></div>
                <img
                  src="https://bgcp.bionluk.com/images/avatar/200x200/560da9fe-cb7c-42f7-adc7-3755df667792.jpg"
                  className="rounded-full h-9 w-9"
                  alt=""
                />
              </div>
              <div className="flex-grow overflow-hidden">
                <h5 className="mb-0">
                  <a href="#" className="text-gray-800">
                    Enes
                  </a>
                  <i className="text-green-500 ri-record-circle-fill text-10"></i>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-8">
            <ul className="flex items-center justify-end lg:gap-4">test</ul>
          </div>
        </div>
      </div>
      {/* end Header */}

      <div className="h-[77vh] p-4 lg:p-6">
        <ul className="mb-0">
          {messages.map((msg, index) => (
            <MessageBubble message={msg.text} isSender={msg.isSender} />
          ))}
        </ul>
      </div>

      <div className="z-40 w-full fixed -bottom-1 p-6 bg-white border-t lg:mb-1 border-gray-50">
        <div className="flex gap-2">
          <div className="flex-grow">
            <input
              type="text"
              className=" w-full border-transparent rounded h-10 bg-gray-50 placeholder:text-14 text-14"
              placeholder="Enter Message..."
            />
          </div>
          <div>
            <div>
              <ul className="mb-0">
                <li className="inline-block" title="Emoji">
                  <button
                    type="button"
                    className="border-transparent group/tooltip btn relative group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16"
                  >
                    <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                      <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                        Emoji
                      </span>
                    </div>
                    <i className="ri-emotion-happy-line"></i>
                  </button>
                </li>
                <li className="inline-block" title="Attached File">
                  <button
                    type="button"
                    className="border-transparent btn group/tooltip group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16"
                  >
                    <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                      <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                        Attached File
                      </span>
                    </div>
                    <i className="ri-attachment-line"></i>
                  </button>
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
}
