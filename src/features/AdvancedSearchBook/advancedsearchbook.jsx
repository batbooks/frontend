import { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";

import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import Loading from "../../common/Loading/Loading";
import Swal from "sweetalert2";
import { SearchFilters } from "./SearchFilters";
import { useLocation, useNavigate } from "react-router";
import BookCard from "../../common/BookCard/bookCard";
import { useSelector } from "react-redux";

export default function AdvancedSearchBook() {
  const [allBooks, setAllBooks] = useState([]);
  const [showingBooks, setShowingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageLink, setNextPageLink] = useState(".");
  const [prevPageLink, setPrevPageLink] = useState(".");
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  const itemsPerPage = 10;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  console.log("location:", location);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch(
          !query.size > 0
            ? `https://batbooks.liara.run/advance/`
            : `https://batbooks.liara.run/advance/${location.search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        console.log("data:", data);

        setAllBooks(data.results);
        setNextPageLink(data.next);
        setPrevPageLink(data.previous);
        setNumberOfBooks(data.count);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
        console.log(Math.ceil(data.count / itemsPerPage));
        setShowingBooks(data.results);
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
            const response = await fetch(
              !query.size > 0 ? `${nextLink}` : nextLink,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();

            nextLink = data.next;
            if (i === pageDiff - 1) {
              setNextPageLink(data.next);
              setPrevPageLink(data.previous);
              setcurrentpage(page);
              setShowingBooks(data.results);
            }
          }
        } else if (pageDiff < 0) {
          let prevLink = prevPageLink;
          for (let i = pageDiff; i < 0; i++) {
            const response = await fetch(
              !query.size > 0 ? `${prevLink}` : prevLink,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();

            prevLink = data.previous;

            if (i === -1) {
              setNextPageLink(data.next);
              setPrevPageLink(data.previous);

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
        className="flex flex-col items-center pt-[25px] pb-[60px] px-[15px]  md:px-[30px] sm:px-[50px] "
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
          numberOfBooks={numberOfBooks}
          setNumberOfBooks={setNumberOfBooks}
        />
        <div className="flex flex-col w-[100%]">
          {loading ? (
            <div className="mx-auto">
              <Loading />
            </div>
          ) : showingBooks.length === 0 && !loading ? (
            <>
              <h2 className="text-[16px] right-0 font-[300] hidden sm:block">
                نتایج جستجو ({numberOfBooks ?? 0})
              </h2>
              <p className="text-[24px] mx-auto">موردی یافت نشد</p>
            </>
          ) : !loading ? (
            <SearchBookResults
              numberOfBooks={numberOfBooks}
              books={showingBooks}
              loading={loading}
            />
          ) : null}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 my-6 items-center">
              {/* Previous Button */}
              {console.log("asdasdadasddadadadasadasdad")}
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

function SearchBookResults({ books, loading, numberOfBooks }) {
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
        <h2 className="text-[16px] font-[300] hidden sm:block">
          نتایج جستجو ({numberOfBooks ?? 0})
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 gap-x-[15px] sm:gap-x-[37px] gap-y-[25px] mb-[30px]">
        {books.map((book, i) => (
          <Book
            key={i}
            coverImage={book.image}
            bookName={book.name}
            authorName={book.Author}
            star={book.rating}
            bookDescription={book.description}
            bookId={book.id}
            chapters={book.chapter_count}
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
  chapters,
}) {
  let navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFav = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `https://batbooks.liara.run/book-actions/is/favorite/${bookId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        setIsFav(data.is_favorite);
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
        setLoading(false);
      }
    };
    if (isAuthenticated) checkFav();
  }, []);

  const handleAddFavorite = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://batbooks.liara.run/book-actions/toggle/favorite/${bookId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
      }
      setIsFav(!isFav);
    } catch (err) {
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          confirmButtonText: "باشه",
        });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          navigate(`/book/${bookId}`);
        }}
        className="w-[140px] sm:hidden h-[180px] mx-auto"
      >
        <BookCard
          coverImage={
            coverImage === null ? "/images/book_sample1.png" : `${coverImage}`
          }
          title={bookName}
          author={authorName}
          chapters={chapters}
          description={bookDescription}
        />
      </div>
      <div
        className={`hidden sm:flex gap-[20px] py-[26px] pl-[30px] pr-[13px] bg-[#A4C0ED] rounded-[25px] outline-[2px] outline-[#000000]/21 items-center justify-between ${loading ? "cursor-progress" : ""}`}
      >
        <div className="flex gap-[16px] items-center">
          {coverImage === null ? (
            <img
              onClick={() => {
                if (!loading) navigate(`/book/${bookId}`);
              }}
              src="/images/book_sample1.png"
              alt="book"
              className="rounded-[20px] w-[153px] h-[184px] cursor-pointer"
            />
          ) : (
            <img
              onClick={() => {
                if (!loading) navigate(`/book/${bookId}`);
              }}
              src={coverImage}
              alt="book"
              className="rounded-[20px] w-[130px] h-[150px] cursor-pointer"
            />
          )}
          <div className="flex flex-col gap-[10px] overflow-hidden h-[184px] mx-h-[184px]">
            <h3
              onClick={() => {
                if (!loading) navigate(`/book/${bookId}`);
              }}
              className="text-[24px] font-[400] top-0 hover:text-blue-700 cursor-pointer"
            >
              {bookName}
            </h3>
            {coverImage ? console.log(coverImage) : null}
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
              navigate(`/book/${bookId}`);
            }}
            disabled={loading ? true : false}
            className={`btn !py-[9px] !rounded-[10px] !min-w-[160px] !h-fit !mr-0 !ml-0 !mb-0 ${loading ? "!cursor-progress" : ""}`}
          >
            <span className="span-btn">مشاهده جزئیات کتاب</span>
          </button>
          {!isFav && isAuthenticated ? (
            <button
              onClick={() => {
                handleAddFavorite();
              }}
              disabled={loading ? true : false}
              className={`btn !py-[9px] !rounded-[10px] !min-w-[160px] !h-fit !mr-0 !ml-0 !mb-0 ${loading ? "!cursor-progress" : ""}`}
            >
              <span className="span-btn">افزودن به موردعلاقه ها</span>
            </button>
          ) : isAuthenticated ? (
            <button
              onClick={() => {
                handleAddFavorite();
              }}
              disabled={loading ? true : false}
              className={`btn !py-[9px] !rounded-[10px] !min-w-[160px] !bg-red-700 before:!bg-[#FF3B30]  !h-fit !mr-0 !ml-0 !mb-0 ${loading ? "!cursor-progress" : ""}`}
            >
              <span className="span-btn">حذف از موردعلاقه ها</span>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
