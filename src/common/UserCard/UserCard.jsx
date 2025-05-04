import React from "react";
import { FaBook, FaHeart } from "react-icons/fa";

export default function UserCard({ user }) {
  return (
    <div className="bg-[#A4C0ED]   p-4 rounded-2xl shadow-md flex items-center justify-between hover:scale-105 transition-all duration-300 curso">
      <div className="flex items-center gap-4 ">
        <img
          className="w-30 h-30 rounded-full object-cover border-2 border-white cursor-pointer"
          src={user.image}
          alt={user.name}
        />
        <div className="text-right">
          <h2 className="font-semibold text-lg mb-2">{user.name}</h2>
          <p className="text-md text-gray-800 flex items-center gap-1 mb-2 justify-start">
            <FaBook className="text-gray-600   " /> {user.number_of_books} کتاب
          </p>
          <p className="text-[15px] text-gray-800 flex items-center gap-1 justify-end">
            <FaHeart className="text-red-500" /> {user.favorites} پسند
          </p>
        </div>
      </div>
      <button className="ml-4 px-6 py-2 bg-[#2663CD] text-white text-[17px] rounded-md hover:bg-blue-700 transition cursor-pointer">
        دنبال کردن
      </button>
    </div>
  );
}
