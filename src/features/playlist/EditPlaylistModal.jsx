import React, { useState, useEffect } from "react";

const EditPlaylistModal = ({ playlist, onSave, onClose }) => {
  const [editedPlaylist, setEditedPlaylist] = useState(playlist);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setEditedPlaylist(playlist);
  }, [playlist]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlaylist({ ...editedPlaylist, [name]: value });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedPlaylist.tags.includes(newTag.trim())) {
      setEditedPlaylist({
        ...editedPlaylist,
        tags: [...editedPlaylist.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditedPlaylist({
      ...editedPlaylist,
      tags: editedPlaylist.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedPlaylist);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0  bg-opacity-50 flex items-center backdrop-blur-xs justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              عنوان پلی‌لیست
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedPlaylist.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              name="description"
              value={editedPlaylist.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="genre"
            >
              ژانر
            </label>
            <select
              id="genre"
              name="genre"
              value={editedPlaylist.genre}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="ادبیات">ادبیات</option>
              <option value="عمومی">عمومی</option>
              <option value="توسعه فردی">توسعه فردی</option>
              <option value="تاریخ">تاریخ</option>
              <option value="علمی-تخیلی">علمی-تخیلی</option>
              <option value="فلسفه">فلسفه</option>
              <option value="روانشناسی">روانشناسی</option>
              <option value="مدیریت">مدیریت</option>
              <option value="سلامت">سلامت</option>
              <option value="داستان">داستان</option>
              <option value="سبک زندگی">سبک زندگی</option>
              <option value="تکنولوژی">تکنولوژی</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تگ‌ها
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="تگ جدید"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
              >
                افزودن
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedPlaylist.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="mr-1 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylistModal;
