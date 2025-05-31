import React, { useEffect, useState } from "react";
import UserCard from "../common/UserCard/UserCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPopularAuthors = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://www.batbooks.ir/popular/author/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("asd");
        if (response.ok) {
          const data = await response.json();
          setPopularAuthors(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularAuthors();
  }, []);
  return (
    <div
      dir="rtl"
      className="w-full mb-8 px-4 sm:px-8 lg:px-16 py-10 bg-[#D9F0FF]"
    >
      <motion.h1
        className="flex flex-col items-center gap-2 lg:flex-row justify-between mb-15 text-center lg:text-right text-2xl sm:text-3xl font-extrabold relative  text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className=" lg:absolute -bottom-3 ">محبوب ترین نویسنده ها</span>
        <span className="lg:absolute  -bottom-8 w-59 sm:w-73  h-2 bg-gradient-to-l from-[#6f6fff] to-[#2828db] rounded-full z-0"></span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-17  gap-6 ">
        {popularAuthors.map((author, index) => (
          <UserCard key={index} user={author} />
        ))}
      </div>
      <div>
        <button
          onClick={() => navigate("/people")}
          className=" btn  w-[300px]! h-[50px]!  text-2xl "
        >
          <span className="span-btn">نمایش کل کاربران</span>
        </button>
      </div>
    </div>
  );
}
