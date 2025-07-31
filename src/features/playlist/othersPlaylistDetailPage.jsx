import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";

const OthersPlaylistDetailPage = () => {
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
  console.log(playlist);
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
            className="h-5 w-5 mr-1 transform rotate-180"
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
            <h1 className="text-2xl font-bold text-gray-800 ">
              {playlist.name}
            </h1>
            <p className="text-gray-600 mt-2">{playlist.description}</p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              کتاب‌های این پلی‌لیست (مرتب‌شده بر اساس رتبه)
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
                    <th className="py-3 px-4 text-right">رتبه</th>
                    <th className="py-3 px-4 text-right">عنوان</th>
                    <th className="py-3 px-4 text-right">نویسنده</th>
                    <th className="py-3 px-4 text-right">امتیاز</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {playlist.books.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full 
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
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {book.book.name}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {book.book.Author}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">
                            {parseFloat(book.book.rating).toFixed(1)}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
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

export default OthersPlaylistDetailPage;
