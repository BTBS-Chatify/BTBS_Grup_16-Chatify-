export default function MessageBubble({ message, sentAt }) {
  // const bubbleClasses = isSender
  //     ? "bg-blue-500 text-white rounded-br-none rounded-lg"
  //     : "bg-gray-200 text-gray-800 rounded-bl-none rounded-lg";

  // Saati alma işlemi
  const convertedTime = new Date(sentAt).toLocaleTimeString("tr-TR", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    // ${isSender ? "text-right" : "text-left"}
    <div className={`mb-2`}>
      <div className={`px-4 py-2 inline-block`}>
        <div>{message}</div>
        <div
          // ${isSender ? "text-gray-200" : "text-gray-500"}
          className={`text-xs`}
        >
          {convertedTime}
        </div>
      </div>
    </div>
  );
}
