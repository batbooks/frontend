import React from "react";
import { FaBook, FaHeart } from "react-icons/fa";

export default function UserCard({ user }) {
  return (
    <div className="bg-[#A4C0ED]   p-4 rounded-2xl shadow-md flex items-center justify-between hover:scale-105 transition-all duration-300 curso">
      {console.log(user)}
      <div className="flex items-center gap-4 ">
        <img
          className="min-w-15 w-20 h-20 sm:min-w-15 sm:h-23 sm:w-23 lg:min-w-30 lg:h-30 lg:w-30 rounded-full object-cover border-2 border-white cursor-pointer"
          src={
            user.image != null
              ? `/api/${user.image}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s"
          }
          alt={user.user}
        />
        <div className="text-right">
          <h2 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 max-w-[150px] truncate">
            {user.user}
          </h2>
          <p className="text-md text-gray-800 flex items-center gap-1 mb-2 justify-start">
            <FaBook className="text-gray-600   " /> {user.book_count} کتاب
          </p>
          <p className="text-[15px] text-gray-800 flex items-center gap-1 justify-start">
            <FaHeart className="text-red-500" /> {user.favorite_count} پسند
          </p>
        </div>
      </div>
      <button className=" text-nowrap px-2 lg:px-4 py-2 bg-[#2663CD] text-white text-[13px] md:text-sm lg:text-md rounded-md hover:bg-blue-700 transition cursor-pointer h-fit">
        دنبال کردن
      </button>
    </div>
  );
}
