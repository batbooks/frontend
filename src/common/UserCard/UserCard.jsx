import React from "react";
import { FaBook, FaHeart } from "react-icons/fa";

export default function UserCard({ user }) {
  return (
    <div className="bg-[#A4C0ED] p-4 rounded-2xl shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full object-cover border-2 border-white"
          src={user.image}
          alt={user.name}
        />
        <div className="text-right">
          <h2 className="font-semibold text-base">{user.name}</h2>
          <p className="text-sm text-gray-800 flex items-center gap-1 justify-start">
            <FaBook className="text-gray-600" /> {user.number_of_books} کتاب
          </p>
          <p className="text-sm text-gray-800 flex items-center gap-1 justify-end">
            <FaHeart className="text-red-500" /> {user.favorites} پسند
          </p>
        </div>
      </div>
      <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
        دنبال کردن
      </button>
    </div>
  );
}
