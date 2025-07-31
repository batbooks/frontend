import React, { useState, useEffect } from "react";
import TagExplorer from "../CreateBook/TagExplorer";

const EditPlaylistModal = ({ playlist, onSave, onClose }) => {
  const [name, setName] = useState(playlist.name || "");
  const [description, setDescription] = useState(playlist.description || "");
  const [isPublic, setIsPublic] = useState(playlist.is_public || false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchGenresAndTags = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const [genresRes, tagsRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/tag/genres/`),
          fetch(`http://127.0.0.1:8000/tag/tag-categories/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        const genresData = await genresRes.json();
        const tagsData = await tagsRes.json();

        setAllGenres(genresData.genres || []);

        const allTagsFlat = (tagsData.tag_categories || []).flatMap(
          (category) => category.tags
        );
        setAllTags(allTagsFlat);
      } catch (err) {
        console.error("Error fetching genres or tags:", err);
        setError("خطا در بارگذاری ژانرها یا تگ‌ها");
      }
    };
    fetchGenresAndTags();
  }, []);

  useEffect(() => {
    const genreIds = playlist.genres
      .map((genre) => {
        const found = allGenres.find((g) => g.title === genre.title);
        return found ? found.id : null;
      })
      .filter(Boolean);
    setSelectedGenres(genreIds);
    console.log(allTags);

    const matchedTags = playlist.tags
      .map((tag) => {
        return allTags.find((t) => t.title === tag.title);
      })
      .filter(Boolean);
    setSelectedTags(matchedTags);
  }, [allGenres, allTags, playlist.genres, playlist.tags]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access_token");

    const payload = {
      name,
      description,
      is_public: isPublic,
      tag_ids: selectedTags.map((tag) => tag.id),
      genre_ids: selectedGenres,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/playlists/${playlist.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "خطا در بروزرسانی پلی‌لیست");
      }

      const updated = await response.json();
      onSave(updated); // update parent state
      onClose(); // close modal
    } catch (err) {
      setError(err.message || "مشکلی پیش آمده است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-opacity-50 flex items-center backdrop-blur-xs justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">ویرایش پلی‌لیست</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              عنوان پلی‌لیست
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              توضیحات
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 flex items-center gap-2">
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
            initialTags={selectedTags}
            initialGenres={selectedGenres}
          />

          {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistModal;
