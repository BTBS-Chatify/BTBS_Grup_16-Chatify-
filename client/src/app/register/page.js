"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Register()
{

    // const [candidat, setCandidat] = useState({
    //
    // })

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     console.log("Register")
    //
    //     // await fetch("/api/myform", {
    //     //     method: "POST",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify(candidat),
    //     // }).then(res=>res.json()).then(data=>setUser(data.user))
    // };

    async function onSubmit(e) {
        e.preventDefault();

        var action = e.target.action;

        var userData = JSON.stringify({
            email: e.target.email.value,
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            passwordConfirmation: e.target.passwordConfirmation.value
        })

        const response = axios.post('http://localhost:3005/auth/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return response;

    }

    return (
        <div className="flex min-h-full flex-col bg-white">
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img className="h-10 w-auto"
                                 src="https://tailwindui.com/img/logos/mark.svg?color=blue&amp;shade=600"
                                 alt="Your Company"/>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Hesabınıza oluşturun</h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500 space-x-2">
                                <span>Zaten hesabınız var mı?</span>
                                <Link href={'login'} className="font-semibold text-blue-600 hover:text-blue-500">giriş yap</Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form onSubmit={onSubmit} action="http://localhost:3005/auth/register"  method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-posta adresi</label>
                                        <div className="mt-2">
                                            <input id="email" name="email" type="text" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tam adınız</label>
                                        <div className="mt-2">
                                            <input id="name" name="name" type="text" autoComplete="name"
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Kullanıcı adı</label>
                                        <div className="mt-2">
                                            <input id="username" name="username" type="text" autoComplete="username"
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>


                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-6 text-gray-900">Şifre</label>
                                        <div className="mt-2">
                                            <input id="password" name="password" type="password" autoComplete="password"
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="passwordConfirmation"
                                               className="block text-sm font-medium leading-6 text-gray-900">Tekrar şifre</label>
                                        <div className="mt-2">
                                            <input id="passwordConfirmation" name="passwordConfirmation" type="password" autoComplete="passwordConfirmation"
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit"
                                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                            Kaydol
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img className="absolute inset-0 h-full w-full object-cover"
                         src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1908&amp;q=80"
                         alt=""/>
                </div>
            </div>
        </div>
    )
}