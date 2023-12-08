"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isWideScreen, setIsWideScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1150);
    };

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde çağrılır
    window.addEventListener("resize", handleResize);

    // İlk render'dan sonra temizleme
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    var action = e.target.action;

    var userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post("http://localhost:3005/auth/login", userData)
      .then((res) => {
        var response = JSON.parse(res.request.response);
        if (response.status === "success") {
          toast.success(response.message);
        }

        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        router.push("/");
      })
      .catch((res) => {
        var response = JSON.parse(res.request.response);
        response.details.body.forEach((bodyData) => {
          toast.error(bodyData.message);
        });
      });
  }

  return (
    <div className="flex min-h-full flex-col bg-white justify-center  items-center">
      ,
      <div className="flex min-h-full flex-1 justify  items-center  ">
        <div
          class=" absolute left-40 top-20 transform -translate-x-3 -translate-y-1/5 w-66 h-66 rounded-full animate-bounce duration-100"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-1.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          class="absolute left-600 right-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/5 w-15 h-15 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-2.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div
          class="absolute left-80 top-1/3 transform -translate-x-1/2 -translate-y-1/5 w-35 h-35 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-3.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          class="absolute left-60 top-3/4 transform -translate-x-1/2 -translate-y-1/5 w-27 h-27 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-5.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          class="absolute left-10 top-1/7 transform -translate-x-1/2 -translate-y-1/5 w-20 h-20 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-7.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          class="absolute right-24 top-20 transform -translate-x-1/2 -translate-y-1/5 w-30 h-30 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-4.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          class="absolute right-1/4 top-3/4 transform -translate-x-1/2 -translate-y-1/5 w-31 h-31 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-6.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div
          class="absolute right-60 top-90 transform -translate-x-1/3 -translate-y-1/5 w-20 h-20 rounded-full animate-bounce duration-200"
          style={{ display: isWideScreen ? "block" : "none" }}
        >
          <img
            src="https://freeio-app-nextjs.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fhome20-hero-8.png&w=96&q=75"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&amp;shade=600"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Hesabınıza giriş yapın
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 space-x-2">
                <span>Hesabınız yok mu?</span>
                <Link
                  href={"register"}
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  kaydol
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={onSubmit} method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      E-posta adresi yada Kullanıcı adı
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        required=""
                        className="block w-full rounded-md border-0 py-1.5 px-3 outline-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Şifre
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required=""
                        className="block w-full rounded-md border-0 py-1.5 px-3 outline-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Beni hatırla
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Oturum aç
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
