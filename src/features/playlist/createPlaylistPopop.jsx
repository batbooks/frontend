import React, { useState } from "react";
import TagExplorer from "../CreateBook/TagExplorer";

const CreatePlaylistPopup = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access_token");

    const payload = {
      name: name,
      description: description,
      is_public: isPublic,
      tag_ids: selectedTags.map((tag) => tag.id),
      genre_ids: selectedGenres,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/playlists/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.detail || "خطا در ایجاد پلی‌لیست");
      }

      const createdPlaylist = await response.json();

      if (onCreate) {
        onCreate(createdPlaylist);
      }
      onClose();
    } catch (err) {
      setError(err.message || "مشکلی پیش آمده است");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-right mb-4">
          ایجاد پلی‌لیست جدید
        </h2>

        <div className="space-y-4 text-right">
          <div>
            <label className="block mb-1 font-medium">نام پلی‌لیست</label>
            <input
              type="text"
              dir="rtl"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">توضیحات</label>
            <textarea
              dir="rtl"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div dir="rtl" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label htmlFor="isPublic" className="font-medium">
              عمومی
            </label>
          </div>

          <TagExplorer
            onSelectTags={setSelectedTags}
            onSelectGenre={setSelectedGenres}
          />

          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            {loading ? "در حال ارسال..." : "ایجاد پلی‌لیست"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPopup;
