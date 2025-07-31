import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import SearchDropdown from "./searchDropdown";

const PlaylistDetailPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [playlist, setPlaylist] = useState({
    id: null,
    name: "",
    description: "",
    books: [],
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const auth = token ? `Bearer ${token}` : "";

        const response = await fetch(
          `https://batbooks.liara.run/user/playlists/${playlistId}/books/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPlaylist(data);
        }
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const updateRank = async (bookId, newRank) => {
    if (newRank < 1 || newRank > playlist.books.length) return;

    const token = localStorage.getItem("access_token");
    const auth = token ? `Bearer ${token}` : "";

    const currentBook = playlist.books.find((b) => b.book.id === bookId);
    const currentRank = currentBook?.rank;

    const swappedBook = playlist.books.find((b) => b.rank === newRank);

    try {
      await fetch(
        `https://batbooks.liara.run/user/playlists/${playlist.id}/books/${bookId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ rank: newRank }),
        }
      );

      if (swappedBook && swappedBook.book.id !== bookId) {
        await fetch(
          `https://batbooks.liara.run/user/playlists/${playlist.id}/books/${swappedBook.book.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({ rank: currentRank }),
          }
        );
      }

      setPlaylist((prev) => {
        const updatedBooks = [...prev.books];
        const currentBookIndex = updatedBooks.findIndex(
          (b) => b.book.id === bookId
        );
        const swappedBookIndex = updatedBooks.findIndex(
          (b) => b.rank === newRank
        );

        if (currentBookIndex === -1) return prev;

        if (swappedBookIndex !== -1) {
          updatedBooks[swappedBookIndex].rank = currentRank;
        }

        updatedBooks[currentBookIndex].rank = newRank;
        updatedBooks.sort((a, b) => a.rank - b.rank);

        return {
          ...prev,
          books: updatedBooks,
        };
      });
    } catch (err) {
      console.error("Error updating rank:", err);
      alert("خطا در تغییر رتبه کتاب");
    }
  };

  const increaseRank = (bookId) => {
    const book = playlist.books.find((b) => b.book.id === bookId);
    if (book && book.rank > 1) {
      updateRank(bookId, book.rank - 1);
    }
  };

  const decreaseRank = (bookId) => {
    const book = playlist.books.find((b) => b.book.id === bookId);
    if (book && book.rank < playlist.books.length) {
      updateRank(bookId, book.rank + 1);
    }
  };

  const handleDeleteBook = async (bookId, playlistId) => {
    const confirmDelete = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این کتاب را حذف کنید؟"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token");
      const auth = token ? `Bearer ${token}` : "";

      const response = await fetch(
        `https://batbooks.liara.run/user/playlists/${playlistId}/books/${bookId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the book");
      }

      setPlaylist((prev) => {
        const updatedBooks = prev.books
          .filter((book) => book.book.id !== bookId)
          .map((book, index) => ({
            ...book,
            rank: index + 1,
          }));

        return {
          ...prev,
          books: updatedBooks,
        };
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("خطا در حذف کتاب");
    }
  };

  const handleBookAdded = (newBookItem) => {
    setPlaylist((prev) => ({
      ...prev,
      books: [
        ...prev.books,
        {
          ...newBookItem,
          rank: prev.books.length + 1,
        },
      ],
    }));
  };

  return (
    <>
      <Navbar />
      <div
        dir="rtl"
        className="min-h-screen mt-20 bg-[#a3d5ff] mx-4 sm:mx-8 md:mx-12 p-4 sm:p-6 md:p-8 pb-14 rounded-2xl"
      >
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 ">
              {playlist.name}
            </h1>
            <p className="text-gray-600  text-sm sm:text-base">
              {playlist.description}
            </p>
          </div>

          {/* فرم اضافه کردن کتاب جدید */}
          <SearchDropdown
            playlistId={playlist.id}
            onBookAdded={handleBookAdded}
          />

          <div className="border-t pt-3 sm:pt-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              کتاب‌های این پلی‌لیست (مرتب‌شده بر اساس رتبه)
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                      رتبه
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                      عنوان
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                      نویسنده
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                      امتیاز
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                      تغییر رتبه
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                      حذف
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {playlist.books
                    .sort((a, b) => a.rank - b.rank)
                    .map((book) => (
                      <tr
                        key={book.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-right">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full 
                          ${
                            book.rank === 1
                              ? "bg-yellow-400 text-yellow-800"
                              : book.rank === 2
                                ? "bg-gray-300 text-gray-800"
                                : book.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                          >
                            {book.rank}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 font-medium text-gray-800 text-sm sm:text-base">
                          {book.book.name}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 text-sm sm:text-base">
                          {book.book.Author}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1 text-sm sm:text-base">
                              {parseFloat(book.book.rating).toFixed(1)}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4">
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <button
                              onClick={() => increaseRank(book.book.id)}
                              disabled={book.rank === 1}
                              className={`p-1 sm:p-2 rounded ${book.rank === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => decreaseRank(book.book.id)}
                              disabled={book.rank === playlist.books.length}
                              className={`p-1 sm:p-2 rounded ${book.rank === playlist.books.length ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-100 text-red-700 hover:bg-red-200"}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4">
                          <button
                            onClick={() =>
                              handleDeleteBook(book.book.id, playlist.id)
                            }
                            className="text-red-600 cursor-pointer hover:text-red-800 p-1 sm:p-2"
                            title="حذف کتاب"
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
