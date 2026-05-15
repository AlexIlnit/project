"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Admin() {
  const [list, setList] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

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

  useEffect(() => {
    load();
  }, []);

  // ================= ADD =================
  const add = async () => {
  const formData = new FormData();

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

  await fetch("http://localhost:3001/institutions", {
    method: "POST",
    body: formData // ❗ НЕ JSON
  });

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
    <div className="min-h-screen bg-gray-100  text-black">
      <Header />

      <h1 className="text-2xl font-bold mb-6">
        🛠 Админка университетов
      </h1>

      {/* ================= FORM ================= */}
<div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

  <h2 className="text-xl font-bold mb-6">
    ➕ Добавить университет
  </h2>

  <div className="grid grid-cols-2 gap-4">

    {/* NAME */}
    <div className="col-span-2">
      <label htmlFor="name" className="text-sm text-gray-500">🏫 Название</label>
      <input
        id="name"
        name="name"
        autoComplete="organization"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* CITY */}
    <div>
      <label htmlFor="city" className="text-sm text-gray-500">🏙 Город</label>
      <input
        id="city"
        name="city"
        autoComplete="address-level2"
        value={form.city}
        onChange={e => setForm({ ...form, city: e.target.value })}
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* ADDRESS */}
    <div>
      <label htmlFor="address" className="text-sm text-gray-500">📍 Адрес</label>
      <input
        id="address"
        name="address"
        autoComplete="street-address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* WEBSITE */}
    <div>
      <label htmlFor="website" className="text-sm text-gray-500">🌐 Сайт</label>
      <input
        id="website"
        name="website"
        autoComplete="url"
        value={form.website}
        onChange={e => setForm({ ...form, website: e.target.value })}
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* CONTACTS */}
    <div>
      <label htmlFor="contacts" className="text-sm text-gray-500">📞 Контакты</label>
      <input
        id="contacts"
        name="contacts"
        autoComplete="tel"
        value={form.contacts}
        onChange={e => setForm({ ...form, contacts: e.target.value })}
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* FACULTY */}
    <div className="col-span-2">
      <label htmlFor="faculty" className="text-sm text-gray-500">🏛 Факультеты</label>
      <input
        id="faculty"
        name="faculty"
        autoComplete="off"
        value={form.faculty}
        onChange={e => setForm({ ...form, faculty: e.target.value })}
        placeholder="через запятую"
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* SPECIALTIES */}
    <div className="col-span-2">
      <label htmlFor="specialties" className="text-sm text-gray-500">🎓 Специальности</label>
      <input
        id="specialties"
        name="specialties"
        autoComplete="off"
        value={form.specialties}
        onChange={e => setForm({ ...form, specialties: e.target.value })}
        placeholder="через запятую"
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* QUALIFICATION */}
    <div className="col-span-2">
      <label htmlFor="qualification" className="text-sm text-gray-500">📜 Квалификация</label>
      <input
        id="qualification"
        name="qualification"
        autoComplete="off"
        value={form.qualification}
        onChange={e => setForm({ ...form, qualification: e.target.value })}
        placeholder="через запятую"
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* SUBJECTS */}
    <div className="col-span-2">
      <label htmlFor="subjects" className="text-sm text-gray-500">📚 Предметы</label>
      <input
        id="subjects"
        name="subjects"
        autoComplete="off"
        value={form.subjects}
        onChange={e => setForm({ ...form, subjects: e.target.value })}
        placeholder="через запятую"
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* INTERESTS */}
    <div className="col-span-2">
      <label htmlFor="interests" className="text-sm text-gray-500">🔥 Интересы</label>
      <input
        id="interests"
        name="interests"
        autoComplete="off"
        value={form.interests}
        onChange={e => setForm({ ...form, interests: e.target.value })}
        placeholder="через запятую"
        className="w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    {/* IMAGE */}
    <div className="col-span-2">
      <label htmlFor="image" className="text-sm text-gray-500">🖼 Фото</label>
      <input
        id="image"
        name="image"
        autoComplete="off"
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="w-full border p-2 rounded-lg mt-1"
      />

      {form.image && (
        <img
          src={form.image}
          alt="preview"
          className="mt-3 w-full h-40 object-cover rounded-xl"
        />
      )}
    </div>

  </div>

  <button
    onClick={add}
    className="w-full mt-6 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
  >
    💾 Сохранить университет
  </button>

</div>
      {/* ================= LIST ================= */}
      <div className="space-y-4">
        
        {list.map(i => (
          
<div key={i._id} className="bg-white p-4 rounded-xl shadow flex gap-4">

  {/* LEFT: TEXT */}
  <div className="flex-1">

    <div className="text-lg font-semibold">{i.name}</div>
    <div className="text-sm text-gray-500">Город: {i.city}</div>

    <div className="text-sm mt-2">📍Адрес:  {i.address}</div>
    <div className="text-sm mt-2">🌐 Вебсайт:  {i.website}</div>
    <div className="text-sm mt-2">📞 Контакты: {i.contacts}</div>


     <div className="text-sm mt-2">
  🏛️ Факультеты: {toString(i.faculty)}
</div>

<div className="text-sm mt-2">
  🎓 Специальности: {toString(i.specialties)}
</div>

<div className="text-sm mt-2">
  📜 Квалификация: {toString(i.qualification)}
</div>

    <div className="text-sm mt-2">
      📚 Предметы: {toString(i.subjects)}
    </div>

    <div className="text-sm mt-2">
      🔥 Интересы: {toString(i.interests)}
    </div>

    <div className="flex gap-2 mt-3">
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
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        ✏️ Edit
      </button>

      <button
        onClick={() => remove(i._id)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        🗑 Delete
      </button>
    </div>

  </div>

  {/* RIGHT: IMAGE */}
  {i.image && (
    <img
      src={i.image}
      alt={i.name}
      className="w-40 h-32 object-cover rounded-xl border"
    />
  )}

</div>
        ))}
      </div>

{/* ================= MODAL ================= */}
{editing && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

    <div className="bg-white p-6 rounded-xl w-[420px] max-h-[90vh] overflow-y-auto space-y-3">

      <h2 className="text-lg font-bold mb-2">
        ✏️ Редактирование университета
      </h2>

      {/* NAME */}
      <div>
  <label htmlFor="nameEdit" className="text-sm text-gray-500">
    🏫 Название
  </label>

  <input
    id="nameEdit"
    name="name"
    autoComplete="organization"
    value={editing.name || ""}
    onChange={e => setEditing({ ...editing, name: e.target.value })}
    className="w-full border p-2 rounded"
  />
</div>

      {/* CITY */}
      <div>
  <label htmlFor="cityEdit" className="text-sm text-gray-500">
    🏙 Город
  </label>

  <input
    id="cityEdit"
    name="city"
    autoComplete="address-level2"
    value={editing.city || ""}
    onChange={e => setEditing({ ...editing, city: e.target.value })}
    className="w-full border p-2 rounded"
  />
</div>

      {/* ADDRESS */}
      <div>
  <label htmlFor="addressEdit" className="text-sm text-gray-500">
    📍 Адрес
  </label>

  <input
    id="addressEdit"
    name="address"
    autoComplete="street-address"
    value={editing.address || ""}
    onChange={e => setEditing({ ...editing, address: e.target.value })}
    className="w-full border p-2 rounded"
  />
</div>
      {/* WEBSITE */}
      <div>
        <div className="text-sm text-gray-500">🌐 Сайт</div>
        <input
          id="websiteEdit"
          name="website"
          autoComplete="url"
          value={editing.website || ""}
          onChange={e => setEditing({ ...editing, website: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* CONTACTS */}
      <div>
        <div className="text-sm text-gray-500">📞 Контакты</div>
        <input
          id="contactsEdit"
          name="contacts"
          autoComplete="tel"
          value={editing.contacts || ""}
          onChange={e => setEditing({ ...editing, contacts: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      {/* facultys */}
      <div>
        <div className="text-sm text-gray-500">🎓 Факультеты</div>
        <input
          autoComplete="off"
          id="facultyEdit"
          name="faculty"
          value={editing.faculty || ""}
          onChange={e => setEditing({ ...editing, faculty: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      {/* SPECIALTIES */}
      <div>
        <div className="text-sm text-gray-500">🎓 Специальности</div>
        <input
        autoComplete="off"
          id="specialtiesEdit"
          name="specialties"
          value={editing.specialties || ""}
          onChange={e => setEditing({ ...editing, specialties: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
       {/* qualifications*/}
      <div>
        <div className="text-sm text-gray-500">🎓 Квалификации</div>
        <input
        autoComplete="off"
          id="qualificationEdit"
          name="qualification"
          value={editing.qualification || ""}
          onChange={e => setEditing({ ...editing, qualification: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      {/* SUBJECTS */}
      <div>
        <div className="text-sm text-gray-500">📚 Предметы</div>
        <input
        autoComplete="off"
          id="subjectsEdit"
          name="subjects"
          value={editing.subjects || ""}
          onChange={e => setEditing({ ...editing, subjects: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* INTERESTS */}
      <div>
        <div className="text-sm text-gray-500">🔥 Интересы</div>
        <input
        autoComplete="off"
          id="interestsEdit"
          name="interests"
          value={editing.interests || ""}
          onChange={e => setEditing({ ...editing, interests: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      {/* IMAGE */}
{/* IMAGE EDIT */}
<div>
  <label htmlFor="imageEdit" className="text-sm text-gray-500">
    🖼 Фото
  </label>

  <input
    id="imageEdit"
    name="image"
    type="file"
    accept="image/*"
    autoComplete="off"
    onChange={handleEditFile}
    className="w-full border p-2 rounded"
  />

  {editing.image && (
    <img
      src={editing.image}
      alt="preview"
      className="w-full h-40 object-cover rounded mt-2"
    />
  )}
</div>

      {/* BUTTONS */}
      <div className="flex gap-2 pt-3">
        <button
          onClick={saveEdit}
          className="flex-1 bg-green-500 text-white py-2 rounded"
        >
          💾 Сохранить
        </button>

        <button
          onClick={() => setEditing(null)}
          className="flex-1 bg-gray-400 text-white py-2 rounded"
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