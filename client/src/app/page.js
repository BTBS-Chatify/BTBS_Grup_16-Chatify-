"use client"
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ProfileDropdown from "@/components/ProfileDropdown";
import Navigation from "@/components/Navigation";
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
      <>
        <div>
          <Navigation />


          <div className="lg:pl-20">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                      className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                      aria-hidden="true"
                  />
                  <input
                      id="search-field"
                      className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      type="search"
                      name="search"
                  />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Separator */}
                  <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                  {/* Profile dropdown */}
                  <ProfileDropdown />
                </div>
              </div>
            </div>

            <main className="xl:pl-96">
              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{/* Main area */}</div>
            </main>
          </div>

          <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 lg:block bg-white">
            <div className="flex flex-row justify-between items-center bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
                <div>
                  <span className="font-semibold text-lg text-slate-900">Akış</span>
                </div>
                <div>
                  <Tippy content="Merhaba">
                    <button className="bg-blue-500 rounded-full text-white hover:bg-blue-600 h-8 w-8 flex flex-row justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                      </svg>
                    </button>
                  </Tippy>
                </div>
            </div>
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              Gruplar ve Mesajlar
            </div>
          </aside>
        </div>
      </>
  )
}
