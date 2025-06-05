import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import PlaylistCard from "./PlaylistCard";

const UserPlaylistsPage = () => {
  useParams();
  const navigate = useNavigate();
  
  // داده‌های نمونه برای پلی‌لیست‌های کاربر دیگر
  const userPlaylists = [
    {
      id: 201,
      title: "توصیه‌های دوستانه",
      description: "کتاب‌هایی که به همه دوستانم توصیه می‌کنم",
      bookCount: 7,
      tags: ["توصیه", "دوستانه", "برگزیده"],
      genre: "عمومی",
      creator: "علی محمدی",
      isPublic: true
    },
    {
      id: 202,
      title: "کتاب‌های دانشگاهی",
      description: "منابع مفید برای دانشجویان کامپیوتر",
      bookCount: 12,
      tags: ["دانشگاهی", "کامپیوتر", "منبع"],
      genre: "تکنولوژی",
      creator: "علی محمدی",
      isPublic: true
    },
    {
      id: 203,
      title: "توصیه‌های دوستانه",
      description: "کتاب‌هایی که به همه دوستانم توصیه می‌کنم",
      bookCount: 7,
      tags: ["توصیه", "دوستانه", "برگزیده"],
      genre: "عمومی",
      creator: "علی محمدی",
      isPublic: true
    },
    // ... سایر پلی‌لیست‌های کاربر
  ];

  const handleViewPlaylist = (playlistId) => {
    navigate(`/othersPlaylists/${playlistId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-[#a3d5ff] mx-12 p-8 pb-14 rounded-2xl">
        <div className="mb-8 text-right">
          <h1 className="text-3xl font-bold text-gray-800 mr-1"> Sara.E پلی‌لیست‌های </h1>
          <p className="text-gray-600 mt-2 mr-1">مجموعه‌ای از کتاب‌های سازمان‌یافته توسط این کاربر</p>
        </div>

        <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPlaylists.map((playlist) => (
            <PlaylistCard 
              key={playlist.id}
              playlist={playlist}
              onView={() => handleViewPlaylist(playlist.id)}
              showCreator={false}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPlaylistsPage;