import Link from "next/link";
export default function Login()
{
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
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">E-posta
                                            adresi</label>
                                        <div className="mt-2">
                                            <input id="email" name="email" type="email" autoComplete="email" required=""
                                                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="username"
                                               className="block text-sm font-medium leading-6 text-gray-900">Kullanıcı adı</label>
                                        <div className="mt-2">
                                            <input id="email" name="email" type="email" autoComplete="email" required=""
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
                                    <div>
                                        <label htmlFor="repassword"
                                               className="block text-sm font-medium leading-6 text-gray-900">Tekrar şifre</label>
                                        <div className="mt-2">
                                            <input id="repassword" name="repassword" type="password"
                                                   autoComplete="current-password" required=""
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