import { useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import Navbar from "../../common/Navbar/navbar";
import BookCard from "../../common/BookCard/bookCard";

export default function MyBooks() {
  const [bookNum, setBookNum] = useState(100);
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
      <main dir="rtl" className="pt-[16px] pr-[7px] pb-[59px]">
        <div dir="ltr" className="flex items-center mb-[16px]">
          <div className="absolute flex items-center ml-[25px]">
            <input
              dir="rtl"
              className="w-[332px] py-[14px] pr-[26px] pl-[50px] z-1 outline-[2px] outline-[#000000]/7 bg-white rounded-[25px] placeholder:text-[14px] placeholder:font-[300] placeholder:text-[#265073] focus:outline-[2px] focus:outline-[#2663cd]"
              placeholder="جستجوی کتاب های شما"
            />
            <img
              src="/src/assets/images/search.png"
              alt="search"
              className="w-[24px] h-[24px] z-2 ml-[15px] absolute"
            />
          </div>
          <h1 className="text-[32px] font-bold mx-auto text-[#1A365D]">
            کتاب های من
          </h1>
        </div>
        <div className="flex gap-[26px] relative">
          <div
            dir="ltr"
            className="flex flex-col w-[243px] bg-[#001F54] py-[94px] px-[29px] rounded-[20px] border-[#000000]/60 border-[2px] items-center text-center"
          >
            <h2 className="text-[#DDDDDD] font-[600] text-[12px] mb-[12px]">
              چالش کتابخوانی
            </h2>
            <p className="text-[#DDDDDD] font-[300] text-[12px] mb-[27px]">
              امسال برای کتابخوانی
              <br />
              هدفگذاری کن
            </p>
            <div className="bg-[#A4C0ED] rounded-[15px] mb-[26px]">
              <img
                src="/src/assets/images/reading_challenge.png"
                alt="challenge"
              />
            </div>
            <p className="text-[12px] font-[300] text-[#DDDDDD] text-nowrap mb-[5px]">
              تعداد کتاب هایی که امسال قراره بخونم
            </p>
            <div className="flex items-center gap-[11px] bg-white py-[7px] px-[6px] rounded-[10px] mb-[15px]">
              <button
                className="cursor-pointer rounded-full"
                onClick={() =>
                  bookNum !== 100 ? setBookNum(bookNum + 1) : null
                }
              >
                <img src="/src/assets/images/plus.png" alt="plus" />
              </button>
              <span>{bookNum}</span>
              <button
                className="cursor-pointer rounded-full"
                onClick={() => (bookNum !== 0 ? setBookNum(bookNum - 1) : null)}
              >
                <img src="/src/assets/images/minus.png" alt="minus" />
              </button>
            </div>
            <p className="text-[12px] font-[300] text-[#DDDDDD] mb-[27px]">
              میتوانی هدفگذاری ات را هر زمان که
              <br />
              بخواهی تغییر دهی
            </p>
            <span className="text-[12px] font-[600] text-[#DDDDDD] mb-[23px]">
              :کتاب هایی که
            </span>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center text-[#DDDDDD] text-[12px] font-[300] gap-[90px]">
                <span>قراره بخونم</span>
                <span>({bookNum})</span>
              </div>
              <div className="flex items-center text-[#DDDDDD] text-[12px] font-[300] gap-[86px]">
                <span>دارم میخونم</span>
                <span>(0)</span>
              </div>
              <div className="flex items-center text-[#DDDDDD] text-[12px] font-[300] gap-[100px]">
                <span>خوانده ام</span>
                <span>(0)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[100%]">
            <h3 className="mr-[11px] text-[16px] font-[700] text-[#1A365D] mb-[40px]">
              کتاب های مورد علاقه من
            </h3>
            <div
              ref={containerRef1}
              className="mb-[40px] overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto"
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
                  ></img>
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
            <h3 className="mr-[11px] text-[16px] font-[700] text-[#1A365D] mb-[40px]">
              نوشته شده توسط من
            </h3>
            <div
              ref={containerRef2}
              className="overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto"
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
            <span>نوشتن کتاب جدید</span>
            <img src="/src/assets/images/add_sign.svg" alt="add" />
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
