export default function GroupCard() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 flex items-center justify-center">
        <div className="h-14 w-14 bg-red-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">G</span>
        </div>
      </div>
      <div className="col-span-9 space-y-1">
        <div className="flex flex-row justify-between">
          <span className="font-medium text-gray-700">Grup Adı</span>
          <span className="text-sm text-gray-400">12:00</span>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <span className="text-sm text-gray-400">Metin: Merhaba"</span>
          <div className="">
            <div className="h-5 w-5 rounded-full flex justify-center items-center bg-[#6366f1] text-sm text-white">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
