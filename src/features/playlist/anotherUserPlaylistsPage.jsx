import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import PlaylistCard from "./PlaylistCard";

const UserPlaylistsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const auth = token ? `Bearer ${token}` : "";

        const response = await fetch(
          `http://127.0.0.1:8000/user/playlists/users/${userId}/`,
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
          setUserPlaylists(data);
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

  const handleViewPlaylist = (playlistId) => {
    navigate(`/othersPlaylists/${playlistId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-[#a3d5ff] mx-12 p-8 pb-14 rounded-2xl">
        <div className="mb-8 text-right">
          <h1
            className="gap-2 text-3xl font-bold text-gray-800 mr-1 flex flex-row"
            dir="rtl"
          >
            <span> پلی لیست های </span>
            <span>{userPlaylists[0]?.user_name}</span>
          </h1>
          <p className="text-gray-600 mt-2 mr-1">
            مجموعه‌ای از کتاب‌های سازمان‌یافته توسط این کاربر
          </p>
        </div>

        <div
          dir="rtl"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
