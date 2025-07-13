import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import PlaylistCard from "./PlaylistCard";

const PublicPlaylistsPage = () => {
  const navigate = useNavigate();
  
  // داده‌های نمونه برای پلی‌لیست‌های عمومی
  const [publicPlaylists] = useState([
    {
      id: 1,
      title: "پرفروش‌های هفته",
      description: "کتاب‌های پرفروش هفته اخیر در سراسر کشور",
      bookCount: 10,
      tags: ["پرفروش", "جدید", "محبوب"],
      genre: "عمومی",
      creator: "کتابخانه ملی",
      isPublic: true
    },
    {
      id: 2,
      title: "برگزیده جایزه بوکر",
      description: "برندگان جایزه ادبی بوکر در 10 سال اخیر",
      bookCount: 8,
      tags: ["جایزه بوکر", "ادبیات", "بین‌المللی"],
      genre: "ادبیات",
      creator: "انجمن ادبی",
      isPublic: true
    },
    {
      id: 1,
      title: "پرفروش‌های هفته",
      description: "کتاب‌های پرفروش هفته اخیر در سراسر کشور",
      bookCount: 10,
      tags: ["پرفروش", "جدید", "محبوب"],
      genre: "عمومی",
      creator: "کتابخانه ملی",
      isPublic: true
    },
    {
      id: 2,
      title: "برگزیده جایزه بوکر",
      description: "برندگان جایزه ادبی بوکر در 10 سال اخیر",
      bookCount: 8,
      tags: ["جایزه بوکر", "ادبیات", "بین‌المللی"],
      genre: "ادبیات",
      creator: "انجمن ادبی",
      isPublic: true
    },
    {
      id: 1,
      title: "پرفروش‌های هفته",
      description: "کتاب‌های پرفروش هفته اخیر در سراسر کشور",
      bookCount: 10,
      tags: ["پرفروش", "جدید", "محبوب"],
      genre: "عمومی",
      creator: "کتابخانه ملی",
      isPublic: true
    },
    {
      id: 2,
      title: "برگزیده جایزه بوکر",
      description: "برندگان جایزه ادبی بوکر در 10 سال اخیر",
      bookCount: 8,
      tags: ["جایزه بوکر", "ادبیات", "بین‌المللی"],
      genre: "ادبیات",
      creator: "انجمن ادبی",
      isPublic: true
    },
    {
      id: 1,
      title: "پرفروش‌های هفته",
      description: "کتاب‌های پرفروش هفته اخیر در سراسر کشور",
      bookCount: 10,
      tags: ["پرفروش", "جدید", "محبوب"],
      genre: "عمومی",
      creator: "کتابخانه ملی",
      isPublic: true
    },
    {
      id: 2,
      title: "برگزیده جایزه بوکر",
      description: "برندگان جایزه ادبی بوکر در 10 سال اخیر",
      bookCount: 8,
      tags: ["جایزه بوکر", "ادبیات", "بین‌المللی"],
      genre: "ادبیات",
      creator: "انجمن ادبی",
      isPublic: true
    },
    {
      id: 1,
      title: "پرفروش‌های هفته",
      description: "کتاب‌های پرفروش هفته اخیر در سراسر کشور",
      bookCount: 10,
      tags: ["پرفروش", "جدید", "محبوب"],
      genre: "عمومی",
      creator: "کتابخانه ملی",
      isPublic: true
    },
    {
      id: 2,
      title: "برگزیده جایزه بوکر",
      description: "برندگان جایزه ادبی بوکر در 10 سال اخیر",
      bookCount: 8,
      tags: ["جایزه بوکر", "ادبیات", "بین‌المللی"],
      genre: "ادبیات",
      creator: "انجمن ادبی",
      isPublic: true
    },
    {
      id: 1,
      title: "پرفروش‌های هفته",
      description: "کتاب‌های پرفروش هفته اخیر در سراسر کشور",
      bookCount: 10,
      tags: ["پرفروش", "جدید", "محبوب"],
      genre: "عمومی",
      creator: "کتابخانه ملی",
      isPublic: true
    },
    {
      id: 2,
      title: "برگزیده جایزه بوکر",
      description: "برندگان جایزه ادبی بوکر در 10 سال اخیر",
      bookCount: 8,
      tags: ["جایزه بوکر", "ادبیات", "بین‌المللی"],
      genre: "ادبیات",
      creator: "انجمن ادبی",
      isPublic: true
    },
    // ... سایر پلی‌لیست‌های عمومی
  ]);

  // حالت‌های pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [allOfThem] = useState(true);

  // محاسبه کل صفحات هنگام تغییر playlists
  useEffect(() => {
    setTotalPages(Math.ceil(publicPlaylists.length / itemsPerPage));
  }, [publicPlaylists, itemsPerPage]);

  // دریافت پلی‌لیست‌های صفحه جاری
  const getCurrentPlaylists = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return publicPlaylists.slice(startIndex, endIndex);
  };

  const handleViewPlaylist = (playlistId) => {
    navigate(`/othersPlaylists/${playlistId}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-[#a3d5ff] mx-12 p-8 pb-14 rounded-2xl">
        <div className="mb-8 text-right">
          <h1 className="text-3xl font-bold text-gray-800">پلی‌لیست‌های عمومی</h1>
          <p className="text-gray-600 mt-2">مجموعه‌ای از پلی‌لیست‌های عمومی و محبوب</p>
        </div>

        <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentPlaylists().map((playlist) => (
            <PlaylistCard 
              key={playlist.id}
              playlist={playlist}
              onView={() => handleViewPlaylist(playlist.id)}
              showCreator={true}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && allOfThem && (
          <div dir="rtl" className="flex justify-center gap-2 my-6 items-center">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              قبلی
            </button>

            {/* First Page */}
            {currentPage > 3 && totalPages > 5 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  1
                </button>
                {currentPage > 4 && <span className="px-2">...</span>}
              </>
            )}

            {/* Middle Pages */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Last Page */}
            {currentPage < totalPages - 2 && totalPages > 5 && (
              <>
                {currentPage < totalPages - 3 && <span className="px-2">...</span>}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              بعدی
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PublicPlaylistsPage;