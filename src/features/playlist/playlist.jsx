import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import PlaylistCard from "./PlaylistCard";

const PlaylistPage = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "رمان‌های کلاسیک جهان",
      description: "برترین آثار ادبیات جهان از نویسندگان مطرح",
      bookCount: 15,
      tags: ["ادبیات جهان", "کلاسیک", "برنده جایزه نوبل"],
      genre: "ادبیات",
    },
    {
      id: 2,
      title: "کتاب‌های صوتی پرفروش",
      description: "پرفروش‌ترین کتاب‌های صوتی سال جاری",
      bookCount: 23,
      tags: ["پرفروش", "صوتی", "محبوب"],
      genre: "عمومی",
    },
    {
      id: 3,
      title: "توسعه فردی و موفقیت",
      description: "راهکارهای عملی برای رشد شخصی و حرفه‌ای",
      bookCount: 18,
      tags: ["موفقیت", "رشد شخصی", "انگیزشی"],
      genre: "توسعه فردی",
    },
    {
      id: 4,
      title: "تاریخ ایران باستان",
      description: "شناخت تمدن کهن ایران زمین",
      bookCount: 12,
      tags: ["تاریخ", "ایران", "تمدن"],
      genre: "تاریخ",
    },
    {
      id: 5,
      title: "داستان‌های علمی-تخیلی",
      description: "جهان‌های موازی و آینده‌نگرانه",
      bookCount: 14,
      tags: ["تخیلی", "آینده", "فناوری"],
      genre: "علمی-تخیلی",
    },
    {
      id: 6,
      title: "فلسفه و اندیشه",
      description: "آثار فلسفی برای تفکر عمیق",
      bookCount: 9,
      tags: ["فلسفه", "اندیشه", "حکمت"],
      genre: "فلسفه",
    },
    {
      id: 7,
      title: "روانشناسی کاربردی",
      description: "درک رفتار انسان و روابط اجتماعی",
      bookCount: 11,
      tags: ["روانشناسی", "رفتار", "روابط"],
      genre: "روانشناسی",
    },
    {
      id: 8,
      title: "مدیریت و کسب‌وکار",
      description: "راهبردهای مدیریتی و کارآفرینی",
      bookCount: 16,
      tags: ["مدیریت", "کسب‌وکار", "اقتصاد"],
      genre: "مدیریت",
    },
    {
      id: 9,
      title: "سلامت و تناسب اندام",
      description: "راهنمای جامع سلامت جسم و روان",
      bookCount: 8,
      tags: ["سلامت", "تغذیه", "ورزش"],
      genre: "سلامت",
    },
    {
      id: 10,
      title: "داستان‌های پلیسی",
      description: "پرونده‌های جنایی و معمایی",
      bookCount: 13,
      tags: ["پلیسی", "جنایی", "معمایی"],
      genre: "داستان",
    },
    {
      id: 11,
      title: "سبک زندگی و خانه‌داری",
      description: "نکات کاربردی برای زندگی بهتر",
      bookCount: 7,
      tags: ["سبک زندگی", "خانه‌داری", "کاربردی"],
      genre: "سبک زندگی",
    },
    {
      id: 12,
      title: "تکنولوژی و آینده",
      description: "تحولات دیجیتال و فناوری‌های نوین",
      bookCount: 19,
      tags: ["تکنولوژی", "دیجیتال", "فناوری"],
      genre: "تکنولوژی",
    },
  ]);

  const handleDeletePlaylist = (id) => {
    if (
      window.confirm("آیا مطمئن هستید که می‌خواهید این پلی‌لیست را حذف کنید؟")
    ) {
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
    }
  };

  const handleViewPlaylist = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-[#a3d5ff] mx-12 p-8 pb-14 rounded-2xl">
        <div className="mb-8 text-right">
          <h1 className="text-3xl font-bold text-gray-800">پلی‌لیست‌های شما</h1>
          <p className="text-gray-600 mt-2">
            مجموعه‌ای از کتاب‌های سازمان‌یافته شما
          </p>
        </div>

        <div dir="rtl" className="mt-6 mb-6 md:mt-8 md:mb-8 text-left">
          <button className="flex items-center justify-center gap-2 bg-[#2663CD] rounded-[10px] text-white text-sm sm:text-[16px] font-medium py-2 px-4 sm:py-[9px] sm:px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-2 focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto w-full sm:w-auto">
            پلی‌لیست جدید
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          dir="rtl"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onDelete={handleDeletePlaylist}
              onView={() => handleViewPlaylist(playlist.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaylistPage;
