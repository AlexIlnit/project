"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent");

    if (!saved) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const data = {
      necessary: true,
      analytics: true,
      marketing: true,
      accepted: true
    };

    localStorage.setItem("cookie_consent", JSON.stringify(data));

    setVisible(false);
  };

  const rejectAll = () => {
    const data = {
      necessary: true,
      analytics: false,
      marketing: false,
      accepted: false
    };

    localStorage.setItem("cookie_consent", JSON.stringify(data));

    setVisible(false);
  };

  const saveSettings = () => {
    const data = {
      necessary: true,
      analytics,
      marketing,
      accepted: true
    };

    localStorage.setItem("cookie_consent", JSON.stringify(data));

    setVisible(false);
  };

  const openSettings = () => {
  setVisible(true);
  setShowSettings(true);
};

  if (!visible) {
  return (
    <button
      onClick={openSettings}
      className="fixed bottom-5 left-5 z-40 bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition px-5 py-3 rounded-2xl font-semibold text-sm text-gray-700 backdrop-blur-sm"
    >
      🍪 Настройки cookies
    </button>
  );
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-[32px] bg-white shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

        <div className="p-5">

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center text-3xl">
              🍪
            </div>

            <div>
              <h2 className="text-3xl font-black text-black">
                Cookie Policy
              </h2>

              <p className="text-gray-500 mt-1">
                Мы используем cookies для улучшения работы платформы.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-600 leading-5 mb-6">
            Наш сайт использует обязательные cookies для корректной работы,
            а также аналитические и маркетинговые cookies для улучшения
            сервиса, статистики и персонализации.

            <br /><br />

            Вы можете принять все cookies, отказаться или настроить
            предпочтения.
          </div>

          {!showSettings ? (
            <div className="flex flex-col md:flex-row gap-3">

              <button
                onClick={acceptAll}
                className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white font-bold py-4 rounded-2xl"
              >
                ✅ Принять все
              </button>

              <button
                onClick={rejectAll}
                className="flex-1 bg-gray-100 hover:bg-gray-200 transition font-bold py-4 rounded-2xl"
              >
                ❌ Отклонить
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 transition font-bold py-4 rounded-2xl"
              >
                ⚙️ Настройки
              </button>
            </div>
          ) : (
            <div>

              <div className="space-y-2 mb-1">

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                  <div>
                    <div className="font-bold text-black">
                      🔒 Обязательные cookies
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      Нужны для работы сайта
                    </div>
                  </div>

                  <div className="text-green-600 font-bold">
                    Всегда активны
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                  <div>
                    <div className="font-bold text-black">
                      📊 Аналитика
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      Помогает улучшать платформу
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                  <div>
                    <div className="font-bold text-black">
                      🎯 Маркетинг
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      Персонализированные рекомендации
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">

                <button
                  onClick={saveSettings}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white font-bold py-4 rounded-2xl"
                >
                  💾 Сохранить настройки
                </button>

                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 transition font-bold py-4 rounded-2xl"
                >
                  Назад
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-400 leading-6">
            Продолжая использование платформы, вы соглашаетесь
            с политикой обработки данных и использованием cookies.
          </div>
        </div>
      </div>
    </div>
  );
}
