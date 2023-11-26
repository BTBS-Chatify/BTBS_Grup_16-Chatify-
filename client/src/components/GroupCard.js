export default function GroupCard(props) {
  const { groupName, latestSender, latestMsg, latestMsgTime } = props;
  let firstLetter = "";
  if (groupName != undefined) {
    firstLetter = groupName[0];
  }

  return (
    <div className="grid grid-cols-12 gap-4 cursor-pointer">
      <div className="col-span-3 flex items-center justify-center">
        <div className="h-14 w-14 bg-red-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{firstLetter}</span>
        </div>
      </div>
      <div className="col-span-9 space-y-1">
        <div className="flex flex-row justify-between">
          <span className="font-medium text-gray-700">{groupName}</span>
          <span className="text-sm text-gray-400">{latestMsgTime}</span>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <span className="text-sm text-gray-400">
            <span className="font-medium">{latestSender}:</span> {latestMsg}
          </span>
          <div className="">
            {
              /* Mesaj sayısı 0'dan küçükse aşağıdaki divi göstermemek için kodu yaz: */
              props.unreadMsgCount > 0 ? (
                <div className="h-5 w-5 rounded-full flex justify-center items-center bg-[#6366f1] text-sm text-white">
                  {props.unreadMsgCount}
                </div>
              ) : (
                ""
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
