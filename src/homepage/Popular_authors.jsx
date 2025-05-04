import React from "react";
import UserCard from "../common/UserCard/UserCard";
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
export default function Popular_authors() {
  return (
    <div dir="rtl" className="w-full mb-12 px-4 sm:px-8 lg:px-16 py-10 ">
      <h2 className="text-3xl font-bold text-right mb-10">
        محبوب ترین نویسنده ها
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mb-17  gap-6 ">
        {authors.map((author, index) => (
          <UserCard key={index} user={author} />
        ))}
      </div>
      <div>
        <button className=" btn2  w-[500px]! h-[50px]!  text-2xl "> نمایش کل کاربران </button>
      </div>
    </div>
  );
}
