"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

const interests = [
  {
    title: "IT и технологии",
    icon: "💻",
    value: "IT",
    desc: "Программирование, AI, разработка"
  },
  {
    title: "Медицина",
    icon: "🩺",
    value: "Медицина",
    desc: "Врач, стоматология, фармация"
  },
  {
    title: "Инженерия",
    icon: "⚙️",
    value: "Инженерия",
    desc: "Техника, строительство, энергетика"
  },
  {
    title: "Бизнес",
    icon: "💼",
    value: "Бизнес",
    desc: "Экономика, менеджмент, маркетинг"
  },
  {
    title: "Право",
    icon: "⚖️",
    value: "Право",
    desc: "Юриспруденция и госуправление"
  },
  {
    title: "Творчество",
    icon: "🎨",
    value: "Творчество",
    desc: "Дизайн, архитектура, искусство"
  },
  {
    title: "Педагогика",
    icon: "📚",
    value: "Педагогика",
    desc: "Образование и психология"
  },
  {
    title: "Спорт",
    icon: "🏆",
    value: "Спорт",
    desc: "Физическая культура и тренерство"
  }
];

const subjects = [
  {
    title: "Математика",
    icon: "📐",
    value: "Математика"
  },
  {
    title: "Физика",
    icon: "⚡",
    value: "Физика"
  },
  {
    title: "Информатика",
    icon: "🖥",
    value: "Информатика"
  },
  {
    title: "Биология",
    icon: "🧬",
    value: "Биология"
  },
  {
    title: "Химия",
    icon: "🧪",
    value: "Химия"
  },
  {
    title: "Языки",
    icon: "🌍",
    value: "Языки"
  },
  {
    title: "История",
    icon: "🏛",
    value: "История"
  },
  {
    title: "Литература",
    icon: "📖",
    value: "Литература"
  }
];

const cities = [
  {
    name: "Минск",
    icon: "🏙",
    desc: "Самый большой выбор вузов"
  },
  {
    name: "Гродно",
    icon: "🏰",
    desc: "Медицинские и гуманитарные вузы"
  },
  {
    name: "Брест",
    icon: "🌉",
    desc: "Технические и спортивные направления"
  },
  {
    name: "Гомель",
    icon: "🏢",
    desc: "Инженерия и медицина"
  },
  {
    name: "Витебск",
    icon: "🎭",
    desc: "Творческие и педагогические вузы"
  },
  {
    name: "Могилёв",
    icon: "📘",
    desc: "Классическое образование"
  }
];

export default function Onboarding() {
  const router = useRouter();

  const setCity = useStore((s) => s.setCity);
  const selectedCity = useStore((s) => s.city);

  const toggleInterest = useStore((s) => s.toggleInterest);
  const selectedInterests = useStore((s) => s.interests);

  const toggleSubject = useStore((s) => s.toggleSubject);
  const selectedSubjects = useStore((s) => s.subjects);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black flex flex-col">

      <Header />

      <main className="flex-1 px-6 py-14">

        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
              🎓 AI Профориентация
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Осознанный выбор
              <span className="text-blue-500"> будущей профессии</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              AI анализирует ваши интересы, любимые предметы и город обучения,
              чтобы подобрать лучшие университеты, факультеты и специальности.
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-[36px] shadow-2xl border border-gray-100 p-8 md:p-12">

            {/* INTERESTS */}
            <section className="mb-16">

              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">
                  💡 Что вам интересно?
                </h2>

                <p className="text-gray-500">
                  Выберите направления, которые вам действительно нравятся
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                {interests.map((i) => (

                  <button
                    key={i.value}
                    onClick={() => toggleInterest(i.value)}
                    className={`text-left rounded-3xl p-6 border transition-all duration-300 ${
                      selectedInterests.includes(i.value)
                        ? "bg-blue-500 text-white border-blue-500 scale-[1.03] shadow-2xl shadow-blue-200"
                        : "bg-gray-50 hover:bg-blue-50 border-gray-200 hover:border-blue-200"
                    }`}
                  >

                    <div className="text-4xl mb-4">
                      {i.icon}
                    </div>

                    <div className="font-bold text-lg mb-2">
                      {i.title}
                    </div>

                    <div
                      className={`text-sm ${
                        selectedInterests.includes(i.value)
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {i.desc}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* SUBJECTS */}
            <section className="mb-16">

              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">
                  📚 Любимые предметы
                </h2>

                <p className="text-gray-500">
                  Они помогут AI понять ваши сильные стороны
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                {subjects.map((s) => (

                  <button
                    key={s.value}
                    onClick={() => toggleSubject(s.value)}
                    className={`rounded-3xl p-5 border transition-all duration-300 text-left ${
                      selectedSubjects.includes(s.value)
                        ? "bg-green-500 text-white border-green-500 scale-[1.03] shadow-2xl shadow-green-200"
                        : "bg-gray-50 hover:bg-green-50 border-gray-200 hover:border-green-200"
                    }`}
                  >

                    <div className="text-4xl mb-4">
                      {s.icon}
                    </div>

                    <div className="font-bold text-lg">
                      {s.title}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* CITIES */}
            <section>

              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">
                  📍 Где хотите учиться?
                </h2>

                <p className="text-gray-500">
                  Выберите город для поиска университетов
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                {cities.map((c) => (

                  <button
                    key={c.name}
                    onClick={() => setCity(c.name)}
                    className={`rounded-3xl p-6 border text-left transition-all duration-300 ${
                      selectedCity === c.name
                        ? "bg-purple-500 text-white border-purple-500 scale-[1.03] shadow-2xl shadow-purple-200"
                        : "bg-gray-50 hover:bg-purple-50 border-gray-200 hover:border-purple-200"
                    }`}
                  >

                    <div className="text-4xl mb-4">
                      {c.icon}
                    </div>

                    <div className="font-bold text-xl mb-2">
                      {c.name}
                    </div>

                    <div
                      className={`text-sm ${
                        selectedCity === c.name
                          ? "text-purple-100"
                          : "text-gray-500"
                      }`}
                    >
                      {c.desc}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row gap-5 justify-between mt-16">

              <button
                onClick={() => router.push("/")}
                className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition font-semibold text-lg"
              >
                ← Назад
              </button>

              <button
                onClick={() => router.push("/results")}
                className="px-10 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-bold text-lg shadow-2xl shadow-blue-200"
              >
                🚀 Подобрать университет
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}