import { useRef } from "react";
import Footer from "../../common/Footer/Footer";
import Navbar from "../../common/Navbar/navbar";
import BookCard from "../../common/BookCard/bookCard";
import ReadingGoalCard from "../../common/ReadingGoalCard/readingGoalCard";

export default function MyBooks() {
  const WrittenBooks1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const FavoriteBooks1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const WrittenBooks = [...WrittenBooks1, WrittenBooks1.length + 1];
  const FavoriteBooks = [...FavoriteBooks1, FavoriteBooks1.length + 1];

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
              {FavoriteBooks[1] ? (
                <button
                  onClick={() => handleScroll1("left")}
                  className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
                >
                  <img src="/src/assets/images/slider.svg" alt="slider"></img>
                </button>
              ) : null}
              {FavoriteBooks[1] ? (
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
                {FavoriteBooks[1] ? (
                  FavoriteBooks.map((i) =>
                    i !== FavoriteBooks.length ? (
                      <Book
                        key={i}
                        coverImage={`/src/assets/images/book_sample${i}.png`}
                      />
                    ) : (
                      <Book
                        key={i}
                        coverImage={`/src/assets/images/book_sample${i}.png`}
                        isLast={true}
                      />
                    )
                  )
                ) : (
                  <span>موردی برای نمایش وجود ندارد...</span>
                )}
              </div>
            </div>
            {FavoriteBooks[1] ? (
              <button className="mx-[31%] mb-[38px] w-[197px] h-[38px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                <span>مشاهده همه موارد</span>
                <img src="/src/assets/images/arrow-right.png" alt="right" />
              </button>
            ) : null}
            {WrittenBooks[1] ? (
              <div className="flex items-center mr-[11px] mb-[22px] justify-between">
                <h3 className="text-[16px] font-[700] text-[#1A365D]">
                  نوشته شده توسط من
                </h3>
                <button className="absolute left-[20px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
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
              className="mb-[-18px] overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto py-[18px]"
            >
              {WrittenBooks[1] ? (
                <button
                  onClick={() => handleScroll2("left")}
                  className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
                >
                  <img src="/src/assets/images/slider.svg" alt="slider"></img>
                </button>
              ) : null}
              {WrittenBooks[1] ? (
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
                {WrittenBooks[1] ? (
                  WrittenBooks.map((i) =>
                    i !== WrittenBooks.length ? (
                      <Book
                        key={i}
                        coverImage={`/src/assets/images/book_sample${i}.png`}
                      />
                    ) : (
                      <Book
                        key={i}
                        coverImage={`/src/assets/images/book_sample${i}.png`}
                        isLast={true}
                      />
                    )
                  )
                ) : (
                  <div className="flex gap-[10px] items-center">
                    <span>موردی برای نمایش وجود ندارد...</span>
                    <button className="w-[193px] h-[38px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                      <span>نوشتن کتاب جدید</span>
                      <img src="/src/assets/images/add_sign.svg" alt="add" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {WrittenBooks[1] ? (
          <button className="mt-[28px] mx-[50%] w-[193px] h-[38px] flex items-center py-[7px] px-[23px] gap-[10px] bg-[#2663CD] rounded-full text-[16px] text-white font-[400] text-nowrap shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
            <span>مشاهده همه موارد</span>
            <img src="/src/assets/images/arrow-right.png" alt="right" />
          </button>
        ) : null}
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
  chapters = 85,
  isLast = false,
  minw = 180,
  h = 254,
}) {
  return (
    <div
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
