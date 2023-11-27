export default function MessageBubble({ message, isSender }) {
  const bubbleClasses = isSender
    ? "bg-blue-500 text-white rounded-br-none rounded-lg"
    : "bg-gray-200 text-gray-800 rounded-bl-none rounded-lg";

  // Saati alma işlemi
  const currentTime = new Date().toLocaleTimeString("tr-TR", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={`mb-2 ${isSender ? "text-right" : "text-left"}`}>
      <div className={`px-4 py-2 inline-block ${bubbleClasses}`}>
        <div>{message}</div>
        <div
          className={`text-xs ${isSender ? "text-gray-200" : "text-gray-500"}`}
        >
          {currentTime}
        </div>
      </div>
    </div>
  );
}
