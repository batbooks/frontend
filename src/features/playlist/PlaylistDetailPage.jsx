import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";

const PlaylistDetailPage = () => {
  useParams();
  const navigate = useNavigate();

  // داده‌های نمونه - در حالت واقعی از API دریافت می‌شود
  const playlist = {
    id: 1,
    title: "رمان‌های کلاسیک جهان",
    description: "برترین آثار ادبیات جهان از نویسندگان مطرح",
    genre: "ادبیات",
    books: [
      {
        id: 101,
        title: "جنگ و صلح",
        author: "لئو تولستوی",
        cover:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 102,
        title: "بینوایان",
        author: "ویکتور هوگو",
        cover:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      },
    ],
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <div
        dir="rtl"
        className="min-h-screen mt-20 bg-[#a3d5ff] mx-12 p-8 pb-14 rounded-2xl"
      >
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 transform rotate-180" // تغییر ml-1 به mr-1 و اضافه کردن transform rotate-180
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          بازگشت به پلی‌لیست‌ها
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {playlist.genre}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-3">
              {playlist.title}
            </h1>
            <p className="text-gray-600 mt-2">{playlist.description}</p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              کتاب‌های این پلی‌لیست
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlist.books.map((book) => (
                <div
                  key={book.id}
                  className="bg-blue-200 rounded-lg p-4 flex items-center"
                >
                  <img
                    src={book.cover}
                    alt={`جلد کتاب ${book.title}`}
                    className="w-16 h-16 object-cover rounded shadow mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaylistDetailPage;