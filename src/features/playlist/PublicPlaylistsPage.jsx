import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import PlaylistCard from "./PlaylistCard";

const PublicPlaylistsPage = () => {
  const navigate = useNavigate();
  
  // داده‌های نمونه برای پلی‌لیست‌های عمومی
  const publicPlaylists = [
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
  ];

  const handleViewPlaylist = (playlistId) => {
    navigate(`/othersPlaylists/${playlistId}`);
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
          {publicPlaylists.map((playlist) => (
            <PlaylistCard 
              key={playlist.id}
              playlist={playlist}
              onView={() => handleViewPlaylist(playlist.id)}
              showCreator={true}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PublicPlaylistsPage;