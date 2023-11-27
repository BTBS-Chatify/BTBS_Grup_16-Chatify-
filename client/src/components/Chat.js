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
    <div className="flex flex-col bg-white h-screen">
      <div className="flex flex-row justify-between items-center w-full px-4 py-10 sm:px-6 lg:px-6 lg:py-4 border-b-2 shadow-[0_8px_20px_-15px_rgba(0,0,0,0.2)]">
        <div className="flex flex-row gap-4 items-center mr-auto">
          <img
            className="h-14 w-14 rounded-full"
            src="https://bgcp.bionluk.com/images/avatar/200x200/560da9fe-cb7c-42f7-adc7-3755df667792.jpg"
            alt="Profile Picture"
          />
          <div className="flex flex-col">
            <span className="font-semibold">Enes Öztekin</span>
            <span className="text-sm text-gray-400">Çevrimiçi</span>
          </div>
        </div>
        <span className="font-semibold cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </span>
      </div>
      <div className="h-96 px-4 py-10 sm:px-6 lg:px-6 lg:py-4">
        {messages.map((msg, index) => (
          <MessageBubble message={msg.text} isSender={msg.isSender} />
        ))}
      </div>
      <div className="bg-slate-50 px-4 py-10 sm:px-6 lg:px-6 lg:py-4 flex flex-row items-center justify-between">
        <input
          type="text"
          className="rounded bg-slate-50 outline-none w-full"
          placeholder="Bir şeyler yaz..."
        />
        <button className="rounded-full bg-slate-800 w-12 h-12 flex items-center justify-center">
          <PaperAirplaneIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
