import React, { useState } from "react";
import TagExplorer from "../CreateBook/TagExplorer";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function AdvancedSearch({ onSearchResults }) {
  const [params, setParams] = useState({
    search: "",
    name: "",
    description: "",
    user: "",
    book_count_min: "",
    book_count_max: "",
  });

  const [dateAfter, setDateAfter] = useState(null);
  const [dateBefore, setDateBefore] = useState(null);

  const [orderingField, setOrderingField] = useState("created_at");
  const [orderingDir, setOrderingDir] = useState("desc");

  const [tagMode, setTagMode] = useState("or");
  const [genreMode, setGenreMode] = useState("or");

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    if (dateAfter) {
      query.append(
        "date_after",
        dateAfter.toDate().toISOString().split("T")[0]
      );
    }

    if (dateBefore) {
      query.append(
        "date_before",
        dateBefore.toDate().toISOString().split("T")[0]
      );
    }

    if (selectedTags.length > 0) {
      query.append(
        tagMode === "or" ? "tag_or" : "tag_and",
        selectedTags.map((t) => t.id).join(",")
      );
    }

    if (selectedGenres.length > 0) {
      query.append(
        genreMode === "or" ? "genre_or" : "genre_and",
        selectedGenres.join(",")
      );
    }

    const orderingValue = `${orderingDir === "desc" ? "-" : ""}${orderingField}`;
    query.append("ordering", orderingValue);

    try {
      const res = await fetch(
        `https://batbooks.liara.run/user/playlists/search/?${query.toString()}`
      );

      if (!res.ok) throw new Error("خطا در پاسخ سرور");

      const data = await res.json();
      console.log("نتایج:", data);

      if (onSearchResults) {
        onSearchResults(data);
      }
    } catch (err) {
      console.error("خطا:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-center" dir="rtl">
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-6">جستجوی پیشرفته</h2>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "search", label: "جستجو" },
            { name: "name", label: "نام" },
            { name: "description", label: "توضیحات" },
            { name: "user", label: "کاربر" },
            {
              name: "book_count_min",
              label: "حداقل تعداد کتاب",
              type: "number",
            },
            {
              name: "book_count_max",
              label: "حداکثر تعداد کتاب",
              type: "number",
            },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={params[name]}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded p-2"
              />
            </div>
          ))}

          {/* Date pickers (Shamsi) */}
          <div>
            <label className="block text-sm font-medium">تاریخ قبل از</label>
            <DatePicker
              value={dateBefore}
              onChange={setDateBefore}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              className="w-full mt-1"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">تاریخ بعد از</label>
            <DatePicker
              value={dateAfter}
              onChange={setDateAfter}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              className="w-full mt-1"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Ordering Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">ترتیب</label>
            <select
              value={orderingDir}
              onChange={(e) => setOrderingDir(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
            >
              <option value="asc">صعودی</option>
              <option value="desc">نزولی</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">براساس</label>
            <select
              value={orderingField}
              onChange={(e) => setOrderingField(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
            >
              <option value="created_at">تاریخ ایجاد</option>
              <option value="name">نام</option>
              <option value="book_count">تعداد کتاب‌ها</option>
            </select>
          </div>
        </div>

        {/* Tag and Genre Modes */}
        <div className="mt-8 flex flex-row gap-4 flex-wrap">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-lg font-bold">تگ‌ها:</h3>
            <button
              className={`text-sm border px-3 py-1 rounded ${
                tagMode === "or"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setTagMode("or")}
            >
              OR
            </button>
            <button
              className={`text-sm border px-3 py-1 rounded ${
                tagMode === "and"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setTagMode("and")}
            >
              AND
            </button>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-lg font-bold">ژانرها:</h3>
            <button
              className={`text-sm border px-3 py-1 rounded ${
                genreMode === "or"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setGenreMode("or")}
            >
              OR
            </button>
            <button
              className={`text-sm border px-3 py-1 rounded ${
                genreMode === "and"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setGenreMode("and")}
            >
              AND
            </button>
          </div>
        </div>

        {/* Tag Explorer */}
        <TagExplorer
          onSelectTags={setSelectedTags}
          onSelectGenre={setSelectedGenres}
        />

        <div className="mt-6 text-left">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            جستجو
          </button>
        </div>
      </div>
    </div>
  );
}
