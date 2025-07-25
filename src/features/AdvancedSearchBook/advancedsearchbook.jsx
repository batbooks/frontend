import { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";

import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import Loading from "../../common/Loading/Loading";
import Swal from "sweetalert2";
import { SearchFilters } from "./SearchFilters";
import { useNavigate } from "react-router";
import BookCard from "../../common/BookCard/bookCard";

export default function AdvancedSearchBook() {
  const [allBooks, setAllBooks] = useState([]);
  const [showingBooks, setShowingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageLink, setNextPageLink] = useState(".");
  const [prevPageLink, setPrevPageLink] = useState(".");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/book/all/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        setAllBooks(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setShowingBooks(data.filter((_, i) => i < 10));
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      } finally {
        setFlag(false);
      }
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (!flag) setLoading(false);
  }, [showingBooks, flag]);

  const handlePageChange = async (page) => {
    setLoading(true);
    if (nextPageLink === "." && prevPageLink === ".") {
      setShowingBooks(
        allBooks.filter((_, i) => i < page * 10 && i >= (page - 1) * 10)
      );
      setcurrentpage(page);
    } else {
      try {
        const pageDiff = page - currentpage;
        if (pageDiff > 0) {
          let nextLink = nextPageLink;
          for (let i = 0; i < pageDiff; i++) {
            const response = await fetch(`http://127.0.0.1:8000${nextLink}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();
            nextLink = data.next?.replace("http://127.0.0.1:8000/", "");
            if (i === pageDiff - 1) {
              setNextPageLink(
                data.next?.replace("http://127.0.0.1:8000/", "")
              );
              setPrevPageLink(
                data.previous?.replace("http://127.0.0.1:8000/", "")
              );
              setcurrentpage(page);
              setShowingBooks(data.results);
            }
          }
        } else if (pageDiff < 0) {
          let prevLink = prevPageLink;
          for (let i = pageDiff; i < 0; i++) {
            const response = await fetch(`http://127.0.0.1:8000${prevLink}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();
            prevLink = data.previous?.replace("http://127.0.0.1:8000/", "");
            if (i === -1) {
              setNextPageLink(
                data.next?.replace("http://127.0.0.1:8000/", "")
              );
              setPrevPageLink(
                data.previous?.replace("http://127.0.0.1:8000/", "")
              );
              setcurrentpage(page);
              setShowingBooks(data.results);
            }
          }
        }
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className="flex flex-col items-center pt-[25px] pb-[60px] px-[10px] sm:px-[50px] w-[100%]"
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[30px]">
          جستجوی کتاب
        </h1>
        <SearchFilters
          setShowingBooks={setShowingBooks}
          setcurrentpage={setcurrentpage}
          setTotalPages={setTotalPages}
          loading2={loading}
          setLoading2={setLoading}
          itemsPerPage={itemsPerPage}
          setNextPageLink={setNextPageLink}
          setPrevPageLink={setPrevPageLink}
          showingBooks={showingBooks}
        />
        <div className="flex flex-col w-[100%]">
          {loading ? (
            <div className="mx-auto">
              <Loading />
            </div>
          ) : showingBooks.length === 0 && !loading ? (
            <>
              <h2 className="text-[16px] right-0 font-[300] hidden sm:block">
                نتایج جستجو
              </h2>
              <p className="text-[24px] mx-auto">موردی یافت نشد</p>
            </>
          ) : !loading ? (
            <SearchBookResults books={showingBooks} loading={loading} />
          ) : null}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 my-6 items-center">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentpage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
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
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
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
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
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
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    }`}
                  >
                    {console.log(totalPages)}
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
                    : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
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

function SearchBookResults({ books, loading }) {
  if (loading) {
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col -mt-[30px]">
      <div className="flex items-center justify-between mb-[60px] sm:mb-[30px]">
        <h2 className="text-[16px] font-[300] hidden sm:block">نتایج جستجو</h2>
      </div>
      <div className="grid xl:grid-cols-2 gap-x-[37px] gap-y-[25px] mb-[30px]">
        {books.map((book, i) => (
          <Book
            key={i}
            coverImage={book.image}
            bookName={book.name}
            authorName={book.Author}
            star={book.rating}
            bookDescription={book.description}
            bookId={book.id}
          />
        ))}
      </div>
    </div>
  );
}

function Book({
  coverImage,
  bookName,
  authorName,
  star,
  bookDescription,
  bookId,
}) {
  let navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/book/${bookId}`);
        }}
        className="w-[250px] sm:hidden h-[300px] mx-auto"
      >
        <BookCard
          coverImage={
            coverImage === null
              ? "/images/book_sample1.png"
              : `http://127.0.0.1:8000${coverImage}`
          }
          title={bookName}
          author={authorName}
          chapters={85}
          description={bookDescription}
        />
      </div>
      <div className="hidden sm:flex gap-[20px] py-[26px] pl-[30px] pr-[13px] bg-[#A4C0ED] rounded-[25px] outline-[2px] outline-[#000000]/21 items-center justify-between">
        <div className="flex gap-[16px] items-center">
          {coverImage === null ? (
            <img
              src="/images/book_sample1.png"
              alt="book"
              className="rounded-[20px] w-[153px] h-[184px]"
            />
          ) : (
            <img
              src={`http://127.0.0.1:8000${coverImage}`}
              alt="book"
              className="rounded-[20px] w-[130px] h-[150px]"
            />
          )}
          <div className="flex flex-col gap-[10px] overflow-hidden h-[184px] mx-h-[184px]">
            <h3 className="text-[24px] font-[400] top-0">{bookName}</h3>
            <div className="flex flex-col md:flex-row gap-[5px] 2xl:gap-[30px] top-0 -mt-[5px]">
              <span className="text-[18px] font-[400]">مؤلف: {authorName}</span>
              <Rating
                dir="ltr"
                readOnly
                precision={0.01}
                value={star}
                size="small"
              />
            </div>
            <p className="text-[14px] font-[300] top-0">
              خلاصه کتاب: {bookDescription}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[13px]">
          <button
            onClick={() => {
              navigate("/chapter/1");
            }}
            className="btn !py-[9px] !rounded-[10px] !min-w-[160px] !h-fit !mr-0 !ml-0 !mb-0"
          >
            <span className="span-btn">شروع مطالعه کتاب</span>
          </button>
          <button
            onClick={() => {
              navigate(`/book/${bookId}`);
            }}
            className="btn !py-[9px] !rounded-[10px] !min-w-[160px] !h-fit !mr-0 !ml-0 !mb-0"
          >
            <span className="span-btn">مشاهده جزئیات کتاب</span>
          </button>
        </div>
      </div>
    </>
  );
}
