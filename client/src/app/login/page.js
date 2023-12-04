"use client";

import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login()
{

    const router = useRouter();

    async function onSubmit(e) {
        e.preventDefault();

        var action = e.target.action;

        var userData = ({
            email: e.target.email.value,
            password: e.target.password.value,
        })

        axios.post('http://localhost:3005/auth/login', userData)
            .then(res => {
                var response = JSON.parse(res.request.response);
                if (response.status === 'success') {
                    toast.success(response.message);
                }

                localStorage.setItem('token', response.accessToken);

                router.push('/');

            })
            .catch(res => {
                var response = JSON.parse(res.request.response);
                response.details.body.forEach(bodyData => {
                    toast.error(bodyData.message);
                })
            });

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
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Hesabınıza
                                giriş yapın</h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500 space-x-2">
                                <span>Hesabınız yok mu?</span>
                                <Link href={'register'} className="font-semibold text-blue-600 hover:text-blue-500">kaydol</Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form onSubmit={onSubmit} method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">E-posta
                                            adresi yada Kullanıcı adı</label>
                                        <div className="mt-2">
                                            <input id="email" name="email" type="text" autoComplete="email" required=""
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-6 text-gray-900">Şifre</label>
                                        <div className="mt-2">
                                            <input id="password" name="password" type="password"
                                                   autoComplete="current-password" required=""
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox"
                                                   className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"/>
                                            <label htmlFor="remember-me"
                                                   className="ml-3 block text-sm leading-6 text-gray-700">Beni
                                                hatırla</label>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit"
                                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Oturum
                                            aç
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