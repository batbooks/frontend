import React from "react";
import UserCard from "../common/UserCard/UserCard";
import { motion } from "framer-motion";

const authors = [
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    favorites: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    favorites: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    favorites: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    favorites: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    favorites: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    favorites: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
];
export default function Most_active_authors() {
  return (
    <div dir="rtl" className="w-full mb-10 px-4 sm:px-8 lg:px-16 py-10">
      <motion.h1
        className="flex flex-row justify-between mb-15 text-3xl md:text-3xl font-extrabold text-right  relative  text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className=" absolute -bottom-3  ">فعالترین نویسنده ها</span>
        <span className="absolute  -bottom-6  w-62  h-2 bg-gradient-to-l from-[#6f6fff] to-[#2828db] rounded-full z-0"></span>
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mb-17  gap-6 ">
        {authors.map((author, index) => (
          <UserCard key={index} user={author} />
        ))}
      </div>
      <div>
        <button className=" btn2  w-[300px]! h-[50px]!  text-2xl ">
          <span className="span-btn">نمایش کل کاربران</span>
        </button>
      </div>
    </div>
  );
}
