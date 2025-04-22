import { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import Navbar from "../../common/Navbar/navbar";
import BookCard from "../../common/BookCard/bookCard";
import ReadingGoalCard from "../../common/ReadingGoalCard/readingGoalCard";
import Loading from "../../common/Loading/Loading";
import { useNavigate } from "react-router";

export default function MyBooks() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const [writtenBooks, setWrittenBooks] = useState([1]);
  const [favoriteBooks, setFavoriteBooks] = useState([1]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchWrittenBooks = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`https://batbooks.liara.run/book/my/`, {
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
        setWrittenBooks([...data.results, ...writtenBooks]);
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
          `https://batbooks.liara.run/book-actions/get/favorite/`,
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

  return (
    <>
      <Navbar />
      <main dir="rtl" className="pt-[16px] pr-[7px] pb-[59px] text-center">
        <h1 className="text-[32px] font-bold text-[#1A365D] mb-[16px]">
          کتاب های من
        </h1>
        <div className="flex gap-[26px] relative">
          <ReadingGoalCard />
          <div className="flex flex-col w-[100%] text-right">
            <h3 className="mr-[11px] text-[16px] font-[700] text-[#1A365D] mb-[22px]">
              کتاب های مورد علاقه من
            </h3>
            <div
              ref={containerRef1}
              className="mb-[22px] overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto py-[18px]"
            >
              {favoriteBooks[1] && favoriteBooks.length > 7 ? (
                <button
                  onClick={() => handleScroll1("left")}
                  className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
                >
                  <img src="/src/assets/images/slider.svg" alt="slider"></img>
                </button>
              ) : null}
              {favoriteBooks[1] && favoriteBooks.length > 7 ? (
                <button
                  onClick={() => handleScroll1("right")}
                  className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer"
                >
                  <img
                    src="/src/assets/images/slider.svg"
                    alt="slider"
                    className="rotate-180"
                  />
                </button>
              ) : null}
              <div className="flex z-1 gap-[25px]">
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
                          coverImage={
                            book.image
                              ? `https://batbooks.liara.run/${book.image}`
                              : `/src/assets/images/book_sample1.png`
                          }
                        />
                      ) : (
                        <Book
                          id={book.id}
                          key={i}
                          coverImage={`/src/assets/images/book_sample${i}.png`}
                          isLast={true}
                        />
                      )
                    )
                  : null}
                {!loading2 && !favoriteBooks[1] ? (
                  <span>موردی برای نمایش وجود ندارد...</span>
                ) : null}
              </div>
            </div>
            {favoriteBooks[1] && favoriteBooks.length > 10 ? (
              <button className="mx-[31%] mb-[38px] w-[197px] h-[38px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                <span>مشاهده همه موارد</span>
                <img src="/src/assets/images/arrow-right.png" alt="right" />
              </button>
            ) : null}
            {writtenBooks[1] ? (
              <div className="flex items-center mr-[11px] mb-[22px] justify-between">
                <h3 className="text-[16px] font-[700] text-[#1A365D]">
                  نوشته شده توسط من
                </h3>
                <button
                  onClick={() => navigate("./createbook")}
                  className="absolute left-[20px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
                >
                  <span>نوشتن کتاب جدید</span>
                  <img src="/src/assets/images/add_sign.svg" alt="add" />
                </button>
              </div>
            ) : (
              <h3 className="text-[16px] font-[700] text-[#1A365D] mr-[11px] mb-[22px]">
                نوشته شده توسط من
              </h3>
            )}

            <div
              ref={containerRef2}
              className="mb-[22px] overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto py-[18px]"
            >
              {writtenBooks[1] && writtenBooks.length > 7 ? (
                <button
                  onClick={() => handleScroll2("left")}
                  className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
                >
                  <img src="/src/assets/images/slider.svg" alt="slider"></img>
                </button>
              ) : null}
              {writtenBooks[1] && writtenBooks.length > 7 ? (
                <button
                  onClick={() => handleScroll2("right")}
                  className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer"
                >
                  <img
                    src="/src/assets/images/slider.svg"
                    alt="slider"
                    className="rotate-180"
                  ></img>
                </button>
              ) : null}
              <div className="flex z-1 gap-[25px]">
                {loading ? <Loading /> : null}
                {!loading && writtenBooks[1]
                  ? writtenBooks.map((book, i) =>
                      i !== writtenBooks.length - 1 ? (
                        <Book
                          id={book.id}
                          key={i}
                          title={book.name}
                          author={book.Author}
                          description={book.description}
                          coverImage={
                            book.image
                              ? `${book.image}`
                              : `/src/assets/images/book_sample1.png`
                          }
                        />
                      ) : (
                        <Book
                          id={book.id}
                          key={i}
                          coverImage={`/src/assets/images/book_sample${i}.png`}
                          isLast={true}
                        />
                      )
                    )
                  : null}
                {!loading && !writtenBooks[1] ? (
                  <div className="flex gap-[10px] items-center">
                    <span>موردی برای نمایش وجود ندارد...</span>
                    <button
                      onClick={() => navigate("./createbook")}
                      className="w-[193px] h-[38px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
                    >
                      <span>نوشتن کتاب جدید</span>
                      <img src="/src/assets/images/add_sign.svg" alt="add" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            {writtenBooks[1] && writtenBooks.length > 10 ? (
              <button className="mx-[31%] w-[197px] h-[38px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                <span>مشاهده همه موارد</span>
                <img src="/src/assets/images/arrow-right.png" alt="right" />
              </button>
            ) : null}
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
  return (
    <div
      onClick={() => navigate(`/book/${id}`)}
      style={{
        minWidth: isLast ? `${minw + 80}px` : `${minw}px`,
        height: !isLast ? `${h}px` : "0px",
        paddingLeft: isLast ? "80px" : "0",
        opacity: isLast ? "0" : "100",
      }}
    >
      <BookCard
        title={title}
        author={author}
        coverImage={coverImage}
        description={description}
        chapters={chapters}
      />
    </div>
  );
}
