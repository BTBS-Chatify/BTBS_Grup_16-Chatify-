"use client";
import { Children, Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import SettingsNavigation from "@/components/SettingNavigation";
import isAuth from "@/middleware/isAuth";
import ChangePassword from "@/components/ChangePasword";
import { toast } from "react-toastify";
const Home = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    closeDialog();
  };

  const getUser = async (userId) => {
    const serverURL = process.env.SERVER_URL;
    const endPoint = "/settings/getUser";
    await axios
      .post(serverURL + endPoint, { userId: userId })
      .then((response) => {
        if (response.data.status == "success") {
          setUpdatedUser(response.data.user);
        }
      });
  };
  useEffect(() => {
    user != null ? getUser(user.id) : null;
  }, [user]);

  useEffect(() => {
    updatedUser != null ? console.log("updatedUser", updatedUser) : null;
    if (updatedUser) {
      setFullName(updatedUser.fullName || "");
      setMail(updatedUser.email || "");
    }
  }, [updatedUser]);

  const handleUsernameChange = (e) => {
    const inputText = e.target.value;
    setFullName(inputText);
  };

  const handleEmailChange = (e) => {
    const inputText = e.target.value;
    setMail(inputText);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const serverURL = process.env.SERVER_URL;
      const endPoint = "/settings/updateUser";
      await axios
        .post(serverURL + endPoint, {
          userId: user.id,
          fullName: fullName,
          email: mail,
        })
        .then((response) => {
          if (response.data.status == "success") {
            toast.success(response.data.message);
          }
        });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Navigation />

      <div className="lg:pl-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
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

        <main className="md:pl-96 sm:block">
          <div className="mt-8 px-6 max-w-3xl mx-auto">
            <h3 className="font-semibold text-lg py-3">Hesap Ayarları</h3>
            <div className="max-w-3xl bg-white rounded-lg px-8 py-6 mb-8 block">
              <span className="text-gray-500 text-sm">
                Yalnızca Adınız kullanıcılar tarafından görülür.
              </span>
              <form className="mt-5">
                <div class="mb-5 flex items-center">
                  <label for="fullname" class="mb-2 w-24 text-sm font-medium">
                    Ad Soyad:
                  </label>
                  <input
                    type="text" // type'ı text olarak güncellendi
                    name="fullname"
                    className="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2"
                    value={fullName}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>

                <hr className="py-2"></hr>
                <span className="text-gray-500 text-sm py-2">
                  E-postanız size bildirim göndermek için kullanılır.
                  Ziyaretçileriniz tarafından görülmez.
                </span>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">
                    E-posta*
                  </label>
                  <input
                    type="lastname"
                    class="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2"
                    value={mail}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <hr className="py-2"></hr>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">
                    Şifre
                  </label>
                  <button
                    type="button"
                    className="bg-blue-600 px-3 py-2 text-sm text-white font-semibold rounded-sm hover:bg-blue-500"
                    onClick={openDialog}
                  >
                    Şifre Değiştir
                  </button>
                </div>
                <ChangePassword
                  isOpen={isDialogOpen}
                  closeModal={closeDialog}
                  onSubmit={handleSubmit}
                />

                {/* ... (remaining code) */}
                <hr className="py-1 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <div className="block">
                    <span className="text-sm text-gray-500">
                      Hesabınızı kaldırmak mı istiyorsunuz?{" "}
                    </span>
                    <span>
                      <a href="#">
                        <i>
                          <u>Hesabımı sil</u>
                        </i>
                      </a>
                    </span>
                  </div>
                </div>
                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center max-sm:text-xs py-3">
                  <div className="block">
                    <button
                      className="bg-green-600 px-3 block py-2 text-sm max-sm:text-xs text-white font-semibold rounded-sm hover:bg-green-800"
                      onClick={handleSaveChanges}
                    >
                      Değişiklikleri Kaydet
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <SettingsNavigation />
    </div>
  );
};

export default isAuth(Home);
