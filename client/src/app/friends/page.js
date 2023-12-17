"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import isAuth from "@/middleware/isAuth";
import Header from "@/components/Header";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyFriendCard from "@/components/MyFriendCard";

import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Friends = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myFriends, setFriends] = useState([]);

  const fetchFriends = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/friend/friends";
      axios
        .post(serverUrl + endPoint, {
          userId: id,
        })
        .then(
          // Axios isteği bittiğinde çalışan fonksiyon
          (response) => {
            if (response.data.status === "success") {
              const currentFriends = response.data.friends;
              setFriends(currentFriends);
            }
            console.log(myFriends);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    user != null ? fetchFriends(user.id) : null;
  }, [user]);
  

  const InfiniteScroll = () => {
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Scroll sonuna ulaşıldığında daha fazla arkadaş yükleme işlemini buraya ekleyebilirsiniz
        if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight) {
          fetchMoreData();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  };
  const compactGroupListStyle = {
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  };
  return (
    <div>
      <Navigation />
      <div className="lg:pl-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden sticky top-0"
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

        <main className="xl:pl-96 hidden lg:block"></main>
      </div>
      
      <aside className="fixed top-16 lg:left-20 w-96 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <span className="font-semibold text-lg text-slate-900">
              Arkadaşlarım
            </span>
            {myFriends.map((friend) => (
            <MyFriendCard
              key={friend.user2Id}
              friendId={friend.user2Id}
              fullname={friend.user2.fullName}
              username={friend.user2.username}
              picture={friend.user2.picture}
              onAddFriend={() => addFriend(friend.user2Id)}
            />
          ))}
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8"></div>
      </aside>

     {/* *<!-- Content -->************************************************************************************************* */}
     
     <div className="flex-1 px-2 sm:px-0 pb-20" style={{ marginLeft: "465px", marginRight: "20px" }}>
    <div className="groups-container hidden lg:block">
      <div className="sticky top-0 z-10 bg-white px-4 shadow-sm" style={{ padding: "16px" }}>
        <h3 className="text-4xl font-semibold text-slate-950">Daha Fazla Kişi İle Tanış</h3>
      </div>
      <div class="mb-5 sm:mb-0 mt-7 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={compactGroupListStyle}>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/1.jpg" alt="1" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">A</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
          </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/2.jpg" alt="2" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">B</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
        </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/3.jpg" alt="3" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">C</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
        </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/4.jpg" alt="4" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">D</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
          </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/5.jpg" alt="5" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">E</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
        </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/6.jpg" alt="6" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">F</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
</div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/7.jpg" alt="7" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">G</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
      </div>
        </div> 
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/8.jpg" alt="8" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">H</h4>
             <div class="absolute inset-x-0 bottom-7 flex justify-center">
             <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
      </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/1.jpg" alt="1" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">A</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
          </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/2.jpg" alt="2" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">B</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
        </div>
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/3.jpg" alt="3" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">C</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
        </div>
        
        </div>
        <div class="relative group bg-slate-300 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
          <img class="w-20 h-20 object-cover object-center rounded-full" src="/assets/4.jpg" alt="4" />
          <h4 class="text-white text-2xl font-bold capitalize text-center">D</h4>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
            <button class="bg-green-500 text-black group-hover:text-white group-hover:smooth-hover flex w-28 h-10 rounded-full items-center justify-center">
            <span class="text-xs font-medium mr-0">Arkadaş Ekle</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" StrokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          </button>
          </div>
        </div>
       
        
      </div>
      
    </div>
     {/* ************************************************************************************************** */}
    </div>
</div>
 

  );
};

export default isAuth(Friends);
