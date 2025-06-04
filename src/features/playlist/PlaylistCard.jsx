import React from "react";

const PlaylistCard = ({ playlist, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative h-full flex flex-col">
      <button
        onClick={() => onDelete(playlist.id)}
        className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
        title="حذف پلی‌لیست"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div dir="rtl" className="p-4 text-right flex-grow flex flex-col">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2 self-start">
          {playlist.genre}
        </span>

        <h2 className="text-xl font-semibold text-gray-800">
          {playlist.title}
        </h2>
        <p className="text-gray-600 mt-2 text-sm flex-grow">
          {playlist.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {playlist.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {playlist.bookCount} کتاب
          </span>
          <button
            onClick={onView}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300"
          >
            مشاهده
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;