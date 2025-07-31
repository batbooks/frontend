import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import PlaylistCard from "./PlaylistCard";
import AdvancedSearch from "./advanceSearchPlaylist";

const PublicPlaylistsPage = () => {
  const navigate = useNavigate();

  const [publicPlaylists, setPublicPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // pagination
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(
    "https://batbooks.liara.run/user/playlists/search/"
  );
  const [count, setCount] = useState(0);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const auth = token ? `Bearer ${token}` : "";

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPublicPlaylists(data.results || []);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setCount(data.count);
        setCurrentUrl(url);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentUrl);
  }, []);

  const handleViewPlaylist = (playlistId) => {
    navigate(`/othersPlaylists/${playlistId}`);
  };

  const handleSearchResults = (data) => {
    setPublicPlaylists(data.results || []);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setCount(data.count);
    setCurrentUrl(
      data.next ||
        data.previous ||
        "https://batbooks.liara.run/user/playlists/search/"
    );
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen mt-20 bg-[#a3d5ff] mx-12 p-8 pb-14 rounded-2xl"
        dir="rtl"
      >
        <div className="flex flex-row gap-73">
          <div className="mb-8 text-right">
            <h1 className="text-3xl font-bold text-gray-800">
              پلی‌لیست‌های عمومی
            </h1>
            <p className="text-gray-600 mt-2">
              مجموعه‌ای از پلی‌لیست‌های عمومی و محبوب
            </p>
          </div>
          <div className="mb-4 text-right">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="!py-[12px] px-[15px] sm:!px-[28px] !rounded-[20px] !w-auto !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn"
            >
              <span className="span-btn hidden sm:block !text-[16px] !font-[400] text-nowrap">
                {isOpen ? "بستن جستجوی پیشرفته" : "نمایش جستجوی پیشرفته"}
              </span>
            </button>
          </div>
        </div>

        {isOpen && <AdvancedSearch onSearchResults={handleSearchResults} />}

        {/* نمایش لیست پلی‌لیست‌ها */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          dir="rtl"
        >
          {publicPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onView={() => handleViewPlaylist(playlist.id)}
              showCreator={true}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        {(nextPage || prevPage) && (
          <div
            className="flex justify-center gap-2 my-6 items-center"
            dir="rtl"
          >
            <button
              onClick={() => prevPage && fetchData(prevPage)}
              disabled={!prevPage}
              className={`px-3 py-1 rounded-md ${
                !prevPage
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              قبلی
            </button>

            <span className="px-4 text-gray-700 text-sm">
              نمایش {publicPlaylists.length} از {count}
            </span>

            <button
              onClick={() => nextPage && fetchData(nextPage)}
              disabled={!nextPage}
              className={`px-3 py-1 rounded-md ${
                !nextPage
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
