import { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import Navbar from "../../pages/Navbar";

import BookCard from "../../common/BookCard/bookCard";
import ReadingGoalCard from "../../common/ReadingGoalCard/readingGoalCard";
import Loading from "../../common/Loading/Loading";
import { useNavigate } from "react-router";
import { FiPlus } from "react-icons/fi";
import BookshelfSeparator from "./BookShelf";

export default function MyBooks() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const [writtenBooks, setWrittenBooks] = useState([1]);
  const [favoriteBooks, setFavoriteBooks] = useState([1]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchWrittenBooks = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`http://127.0.0.1:8000/book/my/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("درخواست موفق نبود");
        }

        const data = await response.json();
        setWrittenBooks([...data, ...writtenBooks]);
      } catch (error) {
        console.error("خطا در ارسال به سرور:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavoriteBooks = async () => {
      setLoading2(true);
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/book-actions/get/favorite/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("درخواست موفق نبود");
        }

        const data = await response.json();
        setFavoriteBooks([...data.results, ...favoriteBooks]);
        console.log(favoriteBooks);
      } catch (error) {
        console.error("خطا در ارسال به سرور:", error);
      } finally {
        setLoading2(false);
      }
    };

    fetchFavoriteBooks();
    fetchWrittenBooks();
  }, []);

  const handleScroll1 = (direction) => {
    if (containerRef1.current) {
      const container = containerRef1.current;
      const scrollAmount = container.clientWidth * 0.15;

      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll2 = (direction) => {
    if (containerRef2.current) {
      const container = containerRef2.current;
      const scrollAmount = container.clientWidth * 0.15;

      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className="bg-slate-50 pt-4 md:pt-[16px] px-1 md:px-[27px] pb-14 md:pb-[59px] text-center"
      >
        <h1 className="text-2xl md:text-[32px] font-bold text-[#1A365D] mb-4 md:mb-[16px]">
          کتاب های من
        </h1>
        <div
          className={`flex ${isMobile ? "flex-col" : "gap-[26px]"} relative`}
        >
          <div className="flex flex-col w-full text-right ">
            <h3 className="mr-2 md:mr-[11px] text-base md:text-[16px] font-[700] text-[#1A365D] mb-4 md:mb-[22px]">
              کتاب های مورد علاقه من
            </h3>
            <div
              ref={containerRef1}
              className="  pr-3 overflow-x-scroll overflow-y-hidden scrollbar-opacity-0 w-full ml-auto pt-4 mb-3 pb-3 "
            >
              {favoriteBooks[1] &&
              favoriteBooks.length > (isMobile ? 2 : isTablet ? 5 : 7) ? (
                <>
                  <button
                    onClick={() => handleScroll1("left")}
                    className="absolute rounded-full bg-[#000000] z-10 mt-[107px] cursor-pointer left-0 ml-4 md:ml-[80px]"
                  >
                    <img
                      src="/images/slider.svg"
                      alt="slider"
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                    onClick={() => handleScroll1("right")}
                    className="absolute rounded-full bg-[#000000] z-10 mt-[107px] cursor-pointer right-0 mr-4"
                  >
                    <img
                      src="/images/slider.svg"
                      alt="slider"
                      className="w-8 h-8 rotate-180"
                    />
                  </button>
                </>
              ) : null}
              <div className="flex z-1 gap-4 md:gap-[25px]  p-3 pb-0 rounded-2xl ">
                {loading2 ? <Loading /> : null}
                {!loading2 && favoriteBooks[1]
                  ? favoriteBooks.map((book, i) =>
                      i !== favoriteBooks.length - 1 ? (
                        <Book
                          id={book.id}
                          key={i}
                          title={book.name}
                          author={book.Author}
                          description={book.description}
                          chapters={book.chapter_count}
                          coverImage={
                            book.image
                              ? `http://127.0.0.1:8000/${book.image}`
                              : `/images/book_sample1.png`
                          }
                          minw={isMobile ? 150 : 180}
                          h={isMobile ? 240 : 260}
                        />
                      ) : (
                        <Book
                          id={book.id}
                          key={i}
                          coverImage={`/images/book_sample${i}.png`}
                          isLast={true}
                          minw={isMobile ? 150 : 180}
                        />
                      )
                    )
                  : null}
                {!loading2 && !favoriteBooks[1] ? (
                  <div
                    onClick={() => navigate("/advancedsearchbook")}
                    className="flex h-60 w-45 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-3 text-center text-slate-500 shadow-sm transition-colors duration-300 hover:border-blue-400 hover:text-blue-500"
                  >
                    <p className="text-sm">
                      کتاب های مورد علاقه خود را اضافه کنید
                    </p>
                    <FiPlus className="h-12 w-12" />
                  </div>
                ) : null}
              </div>
            </div>
            <BookshelfSeparator />

            {writtenBooks[1] ? (
              <div className="flex items-center mr-2  md:mr-[11px] mb-4 md:mb-[22px] justify-between">
                <h3 className="text-base md:text-[16px] font-[700] text-[#1A365D]">
                  نوشته شده توسط من
                </h3>
                {!isMobile && (
                  <button
                    onClick={() => navigate("./createbook")}
                    className="absolute left-4 md:left-[20px] flex items-center py-1 md:py-[7px] px-3 md:px-[23px] gap-2 md:gap-[10px] bg-[#2663CD] rounded-full text-sm md:text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
                  >
                    <span>نوشتن کتاب جدید</span>
                    <img
                      src="/images/add_sign.svg"
                      alt="add"
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </div>
            ) : (
              <h3 className="text-base md:text-[16px] font-[700] text-[#1A365D] mr-2 md:mr-[11px] mb-4 md:mb-[22px]">
                نوشته شده توسط من
              </h3>
            )}

            <div
              ref={containerRef2}
              className=" pr-3  overflow-x-scroll overflow-y-hidden pb-3 scrollbar-opacity-0 w-full ml-auto pt-4 md:pt-[18px]"
            >
              {writtenBooks[1] &&
              writtenBooks.length > (isMobile ? 2 : isTablet ? 5 : 7) ? (
                <>
                  <button
                    onClick={() => handleScroll2("left")}
                    className="absolute rounded-full bg-[#000000] z-10 mt-[107px] cursor-pointer left-0 ml-4 md:ml-[80px]"
                  >
                    <img
                      src="/images/slider.svg"
                      alt="slider"
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                    onClick={() => handleScroll2("right")}
                    className="absolute rounded-full bg-[#000000] z-10 mt-[107px] cursor-pointer right-0 mr-4"
                  >
                    <img
                      src="/images/slider.svg"
                      alt="slider"
                      className="w-8 h-8 rotate-180"
                    />
                  </button>
                </>
              ) : null}
              <div className="flex z-1 gap-4 md:gap-[25px]">
                {loading ? <Loading /> : null}
                {!loading && writtenBooks[1]
                  ? writtenBooks.map((book, i) =>
                      i !== writtenBooks.length - 1 ? (
                        <Book
                          mine={true}
                          id={book.id}
                          key={i}
                          title={book.name}
                          author={book.Author}
                          description={book.description}
                          chapters={book.chapter_count}
                          coverImage={
                            book.image
                              ? `${book.image}`
                              : `/images/book_sample1.png`
                          }
                          minw={isMobile ? 150 : 180}
                          h={isMobile ? 220 : 300}
                        />
                      ) : (
                        <Book
                          id={book.id}
                          key={i}
                          coverImage={`/images/book_sample${i}.png`}
                          isLast={true}
                          minw={isMobile ? 150 : 180}
                        />
                      )
                    )
                  : null}
                {!loading && !writtenBooks[1] ? (
                  <div
                    onClick={() => navigate("/mybooks/createbook")}
                    className="flex gap-2 md:gap-[10px] items-center flex-col md:flex-row"
                  >
                    <div className="flex h-60 w-45 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-3 text-center text-slate-500 shadow-sm transition-colors duration-300 hover:border-blue-400 hover:text-blue-500">
                      <p className="text-sm">اولین کتاب خود را بنویسید</p>
                      <FiPlus className="h-12 w-12" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <BookshelfSeparator />

            {isMobile && writtenBooks[1] && (
              <button
                onClick={() => navigate("./createbook")}
                className="mt-4 mx-auto w-[150px] h-[34px] flex items-center py-1 px-3 gap-2 bg-[#2663CD] rounded-full text-sm text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
              >
                <span>نوشتن کتاب جدید</span>
                <img src="/images/add_sign.svg" alt="add" className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
}

export function Book({
  mine = false,
  coverImage,
  title = "تست",
  author = "تست",
  description = "این متن صرفا جهت تست میباشد...",
  chapters = 0,
  isLast = false,
  minw = 180,
  h = 254,
  id,
}) {
  let navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/editChapter/${id}`);
  };

  return (
    <div
      onClick={() => navigate(`/book/${id}`)}
      style={{
        minWidth: isLast ? `${minw + 80}px` : `${minw}px`,
        height: !isLast ? `${h}px` : "0px",
        paddingLeft: isLast ? "80px" : "0",
        opacity: isLast ? "0" : "100",
      }}
      className="hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col"
    >
      <BookCard
        title={title}
        author={author}
        coverImage={coverImage}
        description={description}
        chapters={chapters}
      />
      {!isLast && mine && (
        <button onClick={handleEditClick} className="btn mt-2 md:mt-4 !mb-0">
          <span className="span-btn">ویرایش کتاب</span>
        </button>
      )}
    </div>
  );
}
