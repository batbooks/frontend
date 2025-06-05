import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";

const PlaylistDetailPage = () => {
  useParams();
  const navigate = useNavigate();

  // داده‌های اولیه با state برای امکان تغییر
  const [playlist, setPlaylist] = useState({
    id: 1,
    title: "رمان‌های کلاسیک جهان",
    description: "برترین آثار ادبیات جهان از نویسندگان مطرح",
    genre: "ادبیات",
    books: [
      {
        id: 101,
        title: "جنگ و صلح",
        author: "لئو تولستوی",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.9,
        rank: 1
      },
      {
        id: 102,
        title: "بینوایان",
        author: "ویکتور هوگو",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        rank: 2
      },
      {
        id: 103,
        title: "آنا کارنینا",
        author: "لئو تولستوی",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        rank: 3
      },
      {
        id: 104,
        title: "جنایت و مکافات",
        author: "فئودور داستایفسکی",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        rank: 4
      }
    ]
  });

  const handleBack = () => {
    navigate(-1);
  };

  // تابع برای تغییر رتبه کتاب
  const updateRank = (bookId, newRank) => {
    if (newRank < 1 || newRank > playlist.books.length) return;

    setPlaylist(prev => {
      const updatedBooks = [...prev.books];
      
      // پیدا کردن کتاب فعلی و کتابی که رتبه‌اش تغییر می‌کند
      const currentBookIndex = updatedBooks.findIndex(b => b.id === bookId);
      const swappedBookIndex = updatedBooks.findIndex(b => b.rank === newRank);
      
      if (currentBookIndex === -1) return prev;
      
      // ذخیره رتبه قبلی
      const oldRank = updatedBooks[currentBookIndex].rank;
      
      // اگر کتابی با رتبه جدید وجود دارد، رتبه‌ها را عوض می‌کنیم
      if (swappedBookIndex !== -1) {
        updatedBooks[swappedBookIndex].rank = oldRank;
      }
      
      // به‌روزرسانی رتبه کتاب فعلی
      updatedBooks[currentBookIndex].rank = newRank;
      
      // مرتب‌سازی بر اساس رتبه جدید
      updatedBooks.sort((a, b) => a.rank - b.rank);
      
      return {
        ...prev,
        books: updatedBooks
      };
    });
  };

  // تابع برای افزایش رتبه
  const increaseRank = (bookId) => {
    const book = playlist.books.find(b => b.id === bookId);
    if (book && book.rank > 1) {
      updateRank(bookId, book.rank - 1);
    }
  };

  // تابع برای کاهش رتبه
  const decreaseRank = (bookId) => {
    const book = playlist.books.find(b => b.id === bookId);
    if (book && book.rank < playlist.books.length) {
      updateRank(bookId, book.rank + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div dir="rtl" className="min-h-screen mt-20 bg-[#a3d5ff] mx-4 sm:mx-8 md:mx-12 p-4 sm:p-6 md:p-8 pb-14 rounded-2xl">
        <button
          onClick={handleBack}
          className="mb-4 sm:mb-6 flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-1 transform rotate-180"
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

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {playlist.genre}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-3">
              {playlist.title}
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              {playlist.description}
            </p>
          </div>

          <div className="border-t pt-3 sm:pt-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              کتاب‌های این پلی‌لیست (مرتب‌شده بر اساس رتبه)
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">رتبه</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">جلد کتاب</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">عنوان</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">نویسنده</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">امتیاز</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">تغییر رتبه</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {playlist.books.sort((a, b) => a.rank - b.rank).map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full 
                          ${book.rank === 1 ? 'bg-yellow-400 text-yellow-800' : 
                            book.rank === 2 ? 'bg-gray-300 text-gray-800' : 
                            book.rank === 3 ? 'bg-amber-600 text-white' : 'bg-blue-100 text-blue-800'}`}>
                          {book.rank}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <img
                          src={book.cover}
                          alt={`جلد کتاب ${book.title}`}
                          className="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded shadow"
                        />
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 font-medium text-gray-800 text-sm sm:text-base">
                        {book.title}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">
                        {book.author}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1 text-sm sm:text-base">
                            {book.rating.toFixed(1)}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            onClick={() => increaseRank(book.id)}
                            disabled={book.rank === 1}
                            className={`p-1 sm:p-2 rounded ${book.rank === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            onClick={() => decreaseRank(book.id)}
                            disabled={book.rank === playlist.books.length}
                            className={`p-1 sm:p-2 rounded ${book.rank === playlist.books.length ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaylistDetailPage;