import { Fragment } from 'react'
import {Menu, Transition} from "@headlessui/react";
import Link from 'next/link';

import {
    ChatBubbleLeftIcon,
    ArrowRightCircleIcon,
    ChevronDownIcon,
    UsersIcon,
    HeartIcon,
    PencilSquareIcon,
    UserIcon,
    UserPlusIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'

const userNavigation = [
    { name: 'Profil', href: '#' },
    { name: 'Çıkış yap', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProfileDropdown = ({ user }) => {
    return (
        <>
            <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        {user ? user.username : null}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="/settings"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm'
                                        )}
                                    >
                                        <PencilSquareIcon
                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        Hesabımı Düzenle
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm'
                                        )}
                                    >
                                        <UsersIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                        Arkadaşlar
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm'
                                        )}
                                    >
                                        <ChatBubbleLeftIcon
                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        Mesajlar
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href="/logout" className={`group flex items-center px-4 py-2 text-sm ${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    }`}>
                                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" aria-hidden="true" />
                                            Çıkış yap
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default ProfileDropdown;