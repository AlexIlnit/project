"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // ================= AUTO LOGIN =================
  useEffect(() => {

    const token = localStorage.getItem("admin_token");

    if (token) {
      router.push("/admin");
    }

  }, [router]);

  // ================= AUTH =================
  const auth = async () => {

    setError("");

    // ====================================================
    // REGISTER
    // ====================================================
    if (isRegister) {

      if (!name || !email || !password) {
        setError("Заполните все поля");
        return;
      }

      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      // проверка существующего email
      const exists = users.find(
        (u: any) => u.email === email
      );

      if (exists) {
        setError("Пользователь уже существует");
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        approved: false,
        role: "user"
      };

      users.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      alert(
        "Аккаунт создан. Ожидайте подтверждения администратора."
      );

      setIsRegister(false);

      setName("");
      setEmail("");
      setPassword("");

      return;
    }

    // ====================================================
    // SUPER ADMIN
    // ====================================================
    if (
  email === "admin@eduguide.by" &&
  password === "admin123"
) {
  const superAdmin = {
    id: "superadmin",
    name: "Super Admin",
    email,
    role: "superadmin"
  };

  localStorage.setItem("admin_token", "logged");
  localStorage.setItem("admin_role", "superadmin");
  localStorage.setItem("admin_user", JSON.stringify(superAdmin));

  router.push("/admin");
  return;
}
   

    // ====================================================
    // USERS LOGIN
    // ====================================================
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u: any) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      setError("Неверный email или пароль");
      return;
    }

    // доступ запрещен
    if (!user.approved) {

      setError(
        "Главный администратор еще не выдал доступ"
      );

      return;
    }

    // логин
    localStorage.setItem("admin_user", JSON.stringify(user));
    localStorage.setItem(
      "admin_token",
      "logged"
    );

    localStorage.setItem(
      "admin_role",
      "user"
    );

    localStorage.setItem(
      "admin_name",
      user.name
    );

    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black flex flex-col">

      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-[36px] shadow-2xl border border-gray-100 overflow-hidden">

            {/* TOP */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-10 text-white text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center mb-5">
                <ShieldCheck size={42} />
              </div>

              <h1 className="text-4xl font-black mb-3">
                {isRegister
                  ? "Create Account"
                  : "Admin Login"}
              </h1>

              <p className="text-blue-100">
                {isRegister
                  ? "Создание аккаунта EduGuide"
                  : "Авторизация администратора EduGuide"}
              </p>
            </div>

            {/* FORM */}
            <div className="p-8 space-y-6">

              {/* NAME */}
              {isRegister && (
                <div>

                  <label className="text-sm font-semibold text-gray-500 block mb-2">
                    Имя
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Ваше имя"
                    className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition"
                  />
                </div>
              )}

              {/* EMAIL */}
              <div>

                <label className="text-sm font-semibold text-gray-500 block mb-2">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="admin@eduguide.by"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>

                <label className="text-sm font-semibold text-gray-500 block mb-2">
                  Пароль
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Введите пароль"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition"
                  />
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <button
                onClick={auth}
                className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200"
              >
                {isRegister
                  ? "🚀 Создать аккаунт"
                  : "🔐 Войти в админку"}
              </button>

              {/* SWITCH */}
              <div className="text-center">

                <button
                  onClick={() => {

                    setIsRegister(!isRegister);
                    setError("");

                  }}
                  className="text-blue-500 hover:text-blue-600 font-semibold transition"
                >
                  {isRegister
                    ? "Уже есть аккаунт? Войти"
                    : "Нет аккаунта? Зарегистрироваться"}
                </button>
              </div>

              {/* DEMO */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-600">

                <div className="font-semibold mb-2">
                  DEMO ACCESS
                </div>

                <div>
                  Email: admin@eduguide.by
                </div>

                <div>
                  Password: admin123
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}