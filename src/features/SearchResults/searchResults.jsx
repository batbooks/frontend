import React, { useState, useEffect } from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";

const SearchResults = ({ searchingItem = "forum" }) => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchingItem === "forum") {
      fetchForums();
    }
  }, [searchingItem, currentPage]);

  const fetchForums = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://45.158.169.198/forum/?page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setForums(data.results);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className="flex flex-col items-center pt-[13px] pb-[113px] px-[98px] w-[100%]"
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[91px]">
          تالار گفتگو
        </h1>

        {/* Search Box */}
        <form className="flex gap-[26px] mb-[37px]">
          <div className="relative flex items-center">
            <input
              className="w-[693px] h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder="نام تالار، نام کتاب"
            />
            <img
              src="/src/assets/images/search.png"
              alt="search"
              className="w-[24px] h-[24px] z-2 ml-[15px] absolute left-0"
            />
          </div>
          <button className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn">
            <span className="span-btn !text-[16px] !font-[400]">
              جستجوی گفتگو
            </span>
          </button>
        </form>

        <div className="flex flex-col w-full">
          <h2 className="text-[16px] font-[600] mb-[31px]">نتایج جستجو</h2>

          {loading && (
            <div className="text-center py-4">در حال بارگذاری...</div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">خطا: {error}</div>
          )}

          <div className="grid grid-cols-2 gap-[25px] mb-[30px]">
            {forums.length > 0 ? (
              forums.map((forum) => (
                <Forum
                  key={forum.id}
                  forumId={forum.id}
                  forumName={forum.name}
                  forumDescription={forum.description}
                  createdAt={forum.created_at}
                  bookId={forum.book}
                  forumImage={forum.image}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-[#265073] text-lg">
                {loading ? "در حال بارگذاری..." : "هیچ فرومی یافت نشد."}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 my-6 items-center">
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
                  {currentPage < totalPages - 3 && (
                    <span className="px-2">...</span>
                  )}
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
      </main>
      <Footer />
    </>
  );
};

// Forum Component
const Forum = ({
  forumId,
  forumName,
  forumDescription,
  createdAt,
  bookId,
  forumImage,
}) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fa-IR", options);
  };

  const getImageSrc = () => {
    if (forumImage) {
      return `http://45.158.169.198${forumImage}`;
    }
    return `/src/assets/images/book_sample${bookId % 10 || 1}.png`;
  };

  return (
    <button
      onClick={() => navigate(`/threads/${forumId}`)}
      className="relative overflow-hidden py-[10px] pr-[10px] pl-[90px] bg-[#a3d5ff] outline-[2px] outline-[#000000]/21 rounded-[15px] gap-[38px] flex items-center cursor-pointer hover:ease-in-out hover:before:w-full hover:before:h-full before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/40 before:shadow-none hover:shadow-[#000000]/21 hover:shadow-lg before:inset-0 before:transition-all before:duration-[0.5s] before:ease-in-out transition-all active:before:bg-[#2663CD]/20 active:outline-none active:shadow-none"
    >
      <img
        src={getImageSrc()}
        alt="book cover"
        className="relative w-[105px] h-[132px] rounded-[5px] z-2 object-cover"
      />
      <div className="flex flex-col text-start relative z-2">
        <h3 className="text-[20px] font-[400] text-black">{forumName}</h3>
        <div className="flex gap-[13px] mb-[13px]">
          <span className="text-[12px] font-[300] text-[#333333]">
            ایجاد شده در {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-[14px] font-[300]">{forumDescription}</p>
      </div>
    </button>
  );
};

export default SearchResults;
