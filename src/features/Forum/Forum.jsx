import { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/navbar";
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
          `https://www.batbooks.ir/forum/?page=${currentpage}`
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
        className="flex flex-col items-center pt-[25px] pb-[60px] px-[98px] w-[100%]"
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[30px]">
          تالار گفتگو
        </h1>
        <form className="mb-[37px]" onSubmit={(e) => e.preventDefault()}>
          <div className={`flex gap-[26px]`}>
            <input
              className="w-[693px] h-[49px] py-[12.5px] px-[26px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/21 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder="نام کتاب"
            />
            <button className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 shadow-2xl btn">
              <span className="span-btn !text-[16px] !font-[400]">
                جستجوی گفتگو
              </span>
            </button>
          </div>
        </form>
        <div className="flex flex-col w-[100%]">
          {error == "" ? <div>{error} asda </div> : null}
          <h2 className="text-[16px] font-[300] mb-[31px]">نتایج جستجو</h2>
          <div>
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
          </div>
          {/* Pagination */}
          {totalPages > 1 && allOfThem && (
            <div className="flex justify-center gap-2 my-6 items-center">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
                className={`px-3 py-1 rounded-md ${
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
                    className={`px-3 py-1 rounded-md ${
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
                    className={`px-3 py-1 rounded-md ${
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
                    className={`px-3 py-1 rounded-md ${
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
                className={`px-3 py-1 rounded-md ${
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
      return `https://www.batbooks.ir${forumImage}`;
    }
    return `/images/book_sample${bookId % 10 || 1}.png`;
  };

  return (
    <button
      onClick={() => navigate(`/threads/${forumId}`)}
      className="relative overflow-hidden py-[10px] pr-[10px] pl-[90px] bg-[#a3d5ff] outline-[2px] outline-[#000000]/21 rounded-[15px] gap-[38px] flex items-center cursor-pointer hover:ease-in-out hover:before:w-full hover:before:h-full before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/40 before:shadow-none hover:shadow-[#000000]/21 hover:shadow-lg before:inset-0 before:transition-all before:duration-[0.6s] before:ease-in-out transition-all active:before:bg-[#2663CD]/20 active:outline-none active:shadow-none"
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
