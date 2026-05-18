"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Admin() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);


  

  useEffect(() => {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    router.push("/login");
    return;
  }

  const user = JSON.parse(localStorage.getItem("admin_user") || "{}");

  setCurrentUser(user); // 👈 ВОТ ЭТО ГЛАВНОЕ

  load();

  const storedUsers = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  setUsers(storedUsers);
}, []);
const filteredList = useMemo(() => {
  
  if (!currentUser) return [];

  if (currentUser.role === "superadmin") {
    return list;
  }

  return list.filter(
  (i) => String(i.ownerId) === String(currentUser.id)
);
}, [list, currentUser]);
const getOwnerName = (ownerId: string) => {

  if (ownerId === "superadmin") {
    return "Super Admin";
  }

  const owner = users.find(
    (u) => String(u.id) === String(ownerId)
  );

  return owner?.name || "Unknown";
};
  const toggleAccess = (id: number) => {

    const updated = users.map((u) =>
      u.id === id
        ? {
            ...u,
            approved: !u.approved
          }
        : u
    );

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );
  };

  const deleteUser = (id: number) => {

  const updated = users.filter(
    (u) => u.id !== id
  );

  setUsers(updated);

  localStorage.setItem(
    "users",
    JSON.stringify(updated)
  );
};

  // load users
  useEffect(() => {

    const saved = localStorage.getItem("users");

    if (saved) {
      setUsers(JSON.parse(saved));
    }

  }, []);

  

  const [file, setFile] = useState<File | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  const [selectedCity, setSelectedCity] = useState("Все");

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    website: "",
    contacts: "",
    specialties: "",
    subjects: "",
    interests: "",
    image: "",
    faculty: "",
    qualification: ""
  });
const handleEditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setEditFile(file);

  setEditing((prev: any) => ({
    ...prev,
    image: URL.createObjectURL(file) // превью
  }));
};
  

const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selected = e.target.files?.[0];
  if (!selected) return;

  setFile(selected);

  setForm(prev => ({
    ...prev,
    image: URL.createObjectURL(selected)
  }));
};



  const toArray = (v: string) =>
    v.split(",").map(s => s.trim()).filter(Boolean);

  const toString = (arr: string[]) =>
    Array.isArray(arr) ? arr.join(", ") : "";

  const load = async () => {
    const res = await fetch("http://localhost:3001/institutions");
    const data = await res.json();
    setList(data);
  };

  // ================= ADD =================
  const add = async () => {
  const formData = new FormData();
  const user = JSON.parse(
  localStorage.getItem("admin_user") || "{}"
  );

  formData.append("ownerId", String(user.id));

  formData.append("name", form.name);
  formData.append("city", form.city);
  formData.append("address", form.address);
  formData.append("website", form.website);
  formData.append("contacts", form.contacts);

  formData.append("faculty", form.faculty);
  formData.append("specialties", form.specialties);
  formData.append("qualification", form.qualification);
  formData.append("subjects", form.subjects);
  formData.append("interests", form.interests);
  

  if (file) {
    formData.append("image", file);
  }

  // await fetch("http://localhost:3001/institutions", {
  //   method: "POST",
  //   body: formData // ❗ НЕ JSON
  // });
const res = await fetch("http://localhost:3001/institutions", {
  method: "POST",
  body: formData
});

const data = await res.json();

console.log("CREATED:", data);

  setFile(null);

  setForm({
    name: "",
    city: "",
    address: "",
    website: "",
    contacts: "",
    specialties: "",
    subjects: "",
    interests: "",
    image: "",
    faculty: "",
    qualification: ""
  });

  load();
};

  // ================= DELETE =================
  const remove = async (id: string) => {
    await fetch(`http://localhost:3001/institutions/${id}`, {
      method: "DELETE"
    });
    load();
  };

  // ================= SAVE EDIT =================
const saveEdit = async () => {
  try {
    const formData = new FormData();

    formData.append("name", editing.name || "");
    formData.append("city", editing.city || "");
    formData.append("address", editing.address || "");
    formData.append("website", editing.website || "");
    formData.append("contacts", editing.contacts || "");

    formData.append("faculty", editing.faculty || "");
    formData.append("qualification", editing.qualification || "");
    formData.append("specialties", editing.specialties || "");
    formData.append("subjects", editing.subjects || "");
    formData.append("interests", editing.interests || "");

    // фото
    if (editFile) {
      formData.append("image", editFile);
    }

    const res = await fetch(
      `http://localhost:3001/institutions/${editing._id}`,
      {
        method: "PUT",
        body: formData
      }
    );

    const data = await res.json();

    console.log(data);

    setEditing(null);
    setEditFile(null);

    load();

  } catch (err) {
    console.error("SAVE EDIT ERROR:", err);
  }
};

  return (
    
<div className="min-h-screen bg-[#f4f7fb] text-black">

  <Header />

  <main className="max-w-7xl mx-auto px-6 py-10">

{/* ================= HERO ================= */}
<div className="mb-10">

  {/* TOP ROW */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">

    {/* HERO BADGE */}
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold w-fit">
      🛠 AI Admin Panel
    </div>

    {/* FILTER */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3 w-fit">

      <div className="text-sm font-semibold text-gray-500">
        🏙 Город:
      </div>

      <select
        id={selectedCity}
        name={selectedCity}
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        <option>Все</option>
        <option>Минск</option>
        <option>Брест</option>
        <option>Витебск</option>
        <option>Гомель</option>
        <option>Гродно</option>
        <option>Могилев</option>
      </select>

    </div>
  </div>

  {/* TITLE */}
  <h1 className="text-5xl font-black leading-tight mb-4">
    Управление
    <span className="text-blue-500"> университетами</span>
  </h1>

  <p className="text-gray-600 text-lg max-w-3xl">
    Добавляйте, редактируйте и управляйте университетами,
    специальностями и рекомендациями для AI платформы.
  </p>

</div>

    {/* ================= STATS ================= */}
    <div className="grid md:grid-cols-3 gap-6 mb-10">

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="text-4xl mb-3">🏫</div>

        <div className="text-3xl font-black">
          {filteredList.length}
        </div>

        <div className="text-gray-500 mt-1">
          Университетов
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="text-4xl mb-3">🎓</div>

        <div className="text-3xl font-black">
          AI
        </div>

        <div className="text-gray-500 mt-1">
          Smart система
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="text-4xl mb-3">📚</div>

        <div className="text-3xl font-black">
          EduGuide
        </div>

        <div className="text-gray-500 mt-1">
          Admin dashboard
        </div>
      </div>
    </div>
{/* ================= USERS ================= */}
{currentUser?.role === "superadmin" && (
<div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 mb-10">

  <div className="flex items-center justify-between mb-8">

    <div>
      <div className="text-sm font-semibold text-blue-500 mb-2">
        👥 USERS
      </div>

      <h2 className="text-3xl font-black">
        Зарегистрированные пользователи
      </h2>
    </div>

    <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold">
      {users.length} пользователей
    </div>
  </div>

  <div className="space-y-4">

    {users.length > 0 ? (
      users.map((user: any) => (

        <div
          key={user.id}
          className="flex items-center justify-between bg-gray-50 rounded-2xl p-5 border border-gray-100"
        >

          {/* USER INFO */}
          <div>
            <div className="font-bold text-lg">
              {user.name}
            </div>

            <div className="space-y-1 mt-2">

  <div className="text-sm">
    <span className="font-semibold">
      👤 Имя:
    </span>{" "}
    {user.name}
  </div>

  <div className="text-sm text-gray-600">
    <span className="font-semibold">
      📧 Email:
    </span>{" "}
    {user.email}
  </div>

  <div className="text-sm text-gray-600">
    <span className="font-semibold">
      🔑 Пароль:
    </span>{" "}
    {user.password}
  </div>

</div>

            <div className="mt-2">

              {user.approved ? (
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                  ДОСТУП РАЗРЕШЕН
                </span>
              ) : (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                  НЕТ ДОСТУПА
                </span>
              )}

            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">

            <button
              onClick={() => toggleAccess(user.id)}
              className={`px-5 py-3 rounded-2xl text-white font-semibold transition ${
                user.approved
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {user.approved
                ? "🚫 Запретить"
                : "✅ Разрешить"}
            </button>

            <button
              onClick={() => deleteUser(user.id)}
              className="px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:opacity-80 transition"
            >
              🗑 Удалить
            </button>

          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-10 text-gray-500">
        Пользователей пока нет
      </div>
    )}

  </div>
</div>
)}
    {/* ================= FORM ================= */}
    <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 mb-12">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center text-3xl">
          ➕
        </div>

        <div>
          <h2 className="text-3xl font-black">
            Добавить университет
          </h2>

          <p className="text-gray-500">
            Заполните информацию об учебном заведении
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* INPUT STYLE */}
        {[
          {
            label: "🏫 Название",
            value: form.name,
            key: "name"
          },
          {
            label: "🏙 Город",
            value: form.city,
            key: "city"
          },
          {
            label: "📍 Адрес",
            value: form.address,
            key: "address"
          },
          {
            label: "🌐 Сайт",
            value: form.website,
            key: "website"
          },
          {
            label: "📞 Контакты",
            value: form.contacts,
            key: "contacts"
          }
        ].map((field: any) => (
          <div key={field.key}>
            <label  htmlFor={field.key} className="text-sm font-medium text-gray-500 block mb-2">
              {field.label}
            </label>

            <input
              id={field.key}
              name={field.key}
              autoComplete="off"
              value={field.value}
              onChange={(e) =>
                setForm({
                  ...form,
                  [field.key]: e.target.value
                })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition"
            />
          </div>
        ))}

        {/* LARGE INPUTS */}
        {[
          {
            label: "🏛 Факультеты",
            value: form.faculty,
            key: "faculty"
          },
          {
            label: "🎓 Специальности",
            value: form.specialties,
            key: "specialties"
          },
          {
            label: "📜 Квалификация",
            value: form.qualification,
            key: "qualification"
          },
          {
            label: "📚 Предметы",
            value: form.subjects,
            key: "subjects"
          },
          {
            label: "🔥 Интересы",
            value: form.interests,
            key: "interests"
          }
        ].map((field: any) => (
          <div key={field.key} className="md:col-span-2">

            <label htmlFor={field.key} className="text-sm font-medium text-gray-500 block mb-2">
              {field.label}
            </label>

            <input
              id={field.key}
              name={field.key}
              autoComplete="off"
              value={field.value}
              onChange={(e) =>
                setForm({
                  ...form,
                  [field.key]: e.target.value
                })
              }
              placeholder="через запятую"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition"
            />
          </div>
        ))}

        {/* IMAGE */}
        <div className="md:col-span-2">

          <label htmlFor="image" className="text-sm font-medium text-gray-500 block mb-3">
            🖼 Фото университета
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 bg-gray-50">

            <input
              id="image"
              name="image"
              autoComplete="off"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full"
            />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-5 w-full h-[280px] object-cover rounded-2xl shadow"
              />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={add}
        className="w-full mt-8 bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200"
      >
        💾 Сохранить университет
      </button>
    </div>

    {/* ================= LIST ================= */}
<div className="space-y-8">

  {filteredList.map((i) => (

    <div
      key={i._id}
      className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-8"
    >

{/* TITLE */}
<div className="mb-8">

  <h2 className="text-4xl font-black mb-3">
  🏫 {i.name}
</h2>

{currentUser?.role === "superadmin" && (
  <div className="text-sm text-gray-500 mb-3 ml-2">
    👤 Создал:{" "}
    <span className="font-semibold text-blue-500 ">
      {getOwnerName(i.ownerId)}
    </span>
  </div>
)}

  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
    📍 {i.city}
  </div>
</div>

{/* MAIN CONTENT */}
<div className="flex flex-col lg:flex-row justify-between gap-10 items-start mb-10">

  {/* LEFT CONTENT */}
  <div className="flex-1 space-y-4">

    {/* CITY */}
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="font-semibold mb-1">
        🏙 Город
      </div>

      <div className="text-gray-600 text-sm">
        {i.city}
      </div>
    </div>

    {/* WEBSITE */}
    {i.website && (
      <div className="bg-gray-50 rounded-2xl p-4">

        <div className="font-semibold mb-1">
          🌐 Сайт
        </div>

        <a
          href={i.website}
          target="_blank"
          className="text-blue-500 underline break-all text-sm"
        >
          {i.website}
        </a>
      </div>
    )}

    {/* ADDRESS */}
    {i.address && (
      <div className="bg-gray-50 rounded-2xl p-4">

        <div className="font-semibold mb-1">
          📍 Адрес
        </div>

        <div className="text-gray-600 text-sm">
          {i.address}
        </div>
      </div>
    )}

    {/* CONTACTS */}
    {i.contacts && (
      <div className="bg-gray-50 rounded-2xl p-4">

        <div className="font-semibold mb-1">
          📞 Контакты
        </div>

        <div className="text-gray-600 text-sm">
          {i.contacts}
        </div>
      </div>
    )}
  </div>

  {/* RIGHT IMAGE */}
  <div className="flex-shrink-0">

    {i.image ? (
      <img
        src={i.image}
        alt={i.name}
        className="w-72 h-52 object-cover rounded-3xl shadow-xl border border-gray-200"
      />
    ) : (
      <div className="w-72 h-52 rounded-3xl bg-gray-100 flex items-center justify-center text-6xl">
        🏫
      </div>
    )}
  </div>
</div>


      {/* TAGS */}
      <div className="space-y-5">

        {[
          ["🏛 Факультеты", i.faculty],
          ["🎓 Специальности", i.specialties],
          ["📜 Квалификация", i.qualification],
          ["📚 Предметы", i.subjects],
          ["🔥 Интересы", i.interests]
        ].map(([title, value]: any, idx) => (

          <div key={idx}>

            <div className="font-semibold mb-3 text-lg">
              {title}
            </div>

            <div className="flex flex-wrap gap-2">

              {toString(value)
                .split(",")
                .filter(Boolean)
                .map((item: string, index: number) => (

                  <div
                    key={index}
                    className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium"
                  >
                    {item.trim()}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-10">

        <button
          onClick={() =>
            setEditing({
              _id: i._id,
              name: i.name || "",
              city: i.city || "",
              address: i.address || "",
              website: i.website || "",
              contacts: i.contacts || "",
              specialties: toString(i.specialties),
              subjects: toString(i.subjects),
              interests: toString(i.interests),
              image: i.image || "",
              qualification: toString(i.qualification),
              faculty: toString(i.faculty)
            })
          }
          className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold shadow-lg shadow-blue-200"
        >
          ✏️ Редактировать
        </button>

        <button
          onClick={() => remove(i._id)}
          className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition text-white font-semibold shadow-lg shadow-red-200"
        >
          🗑 Удалить
        </button>
      </div>

    </div>
  ))}
</div> 
  </main>
  {/* ================= EDIT MODAL ================= */}
{editing && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

      {/* HEADER */}
      <div className="p-8 border-b border-gray-100">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-black mb-2">
              ✏️ Редактирование
            </h2>

            <p className="text-gray-500">
              Изменение информации об университете
            </p>
          </div>

          <button
            onClick={() => setEditing(null)}
            className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-xl"
          >
            ✕
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-8 grid md:grid-cols-2 gap-6">

        {[
          ["🏫 Название", "name"],
          ["🏙 Город", "city"],
          ["📍 Адрес", "address"],
          ["🌐 Сайт", "website"],
          ["📞 Контакты", "contacts"],
        ].map(([label, key]: any) => (
          <div key={key}>

            <label htmlFor={key} className="text-sm font-medium text-gray-500 block mb-2">
              {label}
            </label>

            <input
              id={key}
              name={key}
              autoComplete="off"
              value={editing[key] || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  [key]: e.target.value
                })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
          </div>
        ))}

        {[
          ["🏛 Факультеты", "faculty"],
          ["🎓 Специальности", "specialties"],
          ["📜 Квалификация", "qualification"],
          ["📚 Предметы", "subjects"],
          ["🔥 Интересы", "interests"],
        ].map(([label, key]: any) => (
          <div key={key} className="md:col-span-2">

            <label htmlFor={key} className="text-sm font-medium text-gray-500 block mb-2">
              {label}
            </label>

            <input
              id={key}
              name={key}
              autoComplete="off"
              value={editing[key] || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  [key]: e.target.value
                })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
          </div>
        ))}

        {/* IMAGE */}
        <div className="md:col-span-2">

          <label htmlFor="image" className="text-sm font-medium text-gray-500 block mb-3">
            🖼 Фото
          </label>

          <input
            id="edit-image"
            name="edit-image"
            autoComplete="off"
            type="file"
            accept="image/*"
            onChange={handleEditFile}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3"
          />

          {editing.image && (
            <img
              src={editing.image}
              alt="preview"
              className="mt-5 w-full h-[260px] object-cover rounded-3xl"
            />
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-8 border-t border-gray-100 flex gap-4">

        <button
          onClick={saveEdit}
          className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-2xl font-bold"
        >
          💾 Сохранить
        </button>

        <button
          onClick={() => setEditing(null)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 transition py-4 rounded-2xl font-bold"
        >
          Отмена
        </button>
      </div>

    </div>
  </div>
)}
</div>
  );
}