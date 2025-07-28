import { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";
import Footer from "../../common/Footer/Footer";
import Loading from "../../common/Loading/Loading";
import { useNavigate } from "react-router";

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const allOfThem = true;

  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/forum/?page=${currentpage}`
        );
        if (response.ok) {
          const data = await response.json();
          setForums(data.results);
          setTotalPages(Math.ceil(data.count / itemsPerPage));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForums();
  }, [currentpage]);

  const handlePageChange = (page) => {
    setcurrentpage(page);
  };

  if (loading) {
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className="flex flex-col items-center pt-[1.5rem] pb-[3.75rem] px-[5%] md:px-[6.125rem] w-full min-h-screen"
      >
        <h1 className="font-bold text-[#265073] text-[1.5rem] md:text-[2rem] mb-[1.875rem] text-center">
          تالار گفتگو
        </h1>

        <div className="flex flex-col w-full">
          {error == "" ? <div>{error} asda </div> : null}
          <h2 className="text-[1rem] font-[300] mb-[1.9375rem]">نتایج جستجو</h2>
          <div>
            {loading && (
              <div className="text-center py-4">در حال بارگذاری...</div>
            )}
            {error && (
              <div className="text-center text-red-500 py-4">خطا: {error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5625rem] mb-[1.875rem]">
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
          </div>
          {/* Pagination */}
          {totalPages > 1 && allOfThem && (
            <div className="flex flex-wrap justify-center gap-2 my-6 items-center">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
                className={`px-3 py-1 rounded-md text-sm md:text-base ${
                  currentpage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                قبلی
              </button>

              {/* First Page */}
              {currentpage > 3 && totalPages > 5 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-1 rounded-md text-sm md:text-base ${
                      currentpage === 1
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    1
                  </button>
                  {currentpage > 4 && <span className="px-2">...</span>}
                </>
              )}

              {/* Middle Pages */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentpage <= 3) {
                  pageNum = i + 1;
                } else if (currentpage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentpage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md text-sm md:text-base ${
                      currentpage === pageNum
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Last Page */}
              {currentpage < totalPages - 2 && totalPages > 5 && (
                <>
                  {currentpage < totalPages - 3 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 rounded-md text-sm md:text-base ${
                      currentpage === totalPages
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
                onClick={() => handlePageChange(currentpage + 1)}
                disabled={currentpage === totalPages}
                className={`px-3 py-1 rounded-md text-sm md:text-base ${
                  currentpage === totalPages
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
}

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
      return `http://127.0.0.1:8000${forumImage}`;
    }
    return `/images/book_sample${bookId % 10 || 1}.png`;
  };

  return (
    <button
      onClick={() => navigate(`/threads/${forumId}`)}
      className="relative overflow-hidden py-2 pr-2 pl-12 md:pl-16 lg:pl-20 bg-[#a3d5ff] outline outline-[0.125rem] outline-[#000000]/21 rounded-lg gap-4 md:gap-6 flex items-center cursor-pointer hover:ease-in-out hover:before:w-full hover:before:h-full before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/40 before:shadow-none hover:shadow-[#000000]/21 hover:shadow-lg before:inset-0 before:transition-all before:duration-300 before:ease-in-out transition-all active:before:bg-[#2663CD]/20 active:outline-none active:shadow-none w-full"
    >
      <img
        src={getImageSrc()}
        alt="book cover"
        className="relative w-16 h-20 md:w-24 md:h-28 lg:w-28 lg:h-32 rounded-md z-10 object-cover"
      />
      <div className="flex flex-col text-start relative z-10 w-full">
        <h3 className="text-base md:text-lg font-medium text-black truncate">
          {forumName}
        </h3>
        <div className="flex gap-2 mb-2">
          <span className="text-xs md:text-sm font-light text-[#333333]">
            ایجاد شده در {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-sm font-light line-clamp-2 md:line-clamp-3">
          {forumDescription}
        </p>
      </div>
    </button>
  );
};
