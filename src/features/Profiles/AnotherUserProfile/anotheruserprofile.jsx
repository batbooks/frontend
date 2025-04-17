import React, { useRef, useState } from "react";
import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import BookCard from "../../../common/BookCard/bookCard";
import "./anotheruserprofile.css";

const WrittenBooks = [1, 2, 3, 4, 5, 6, 7, 8];
const FavoriteBooks = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Another_User_Profile() {
  const [following, setFollowing] = useState(true);
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  const handleScrollDown = (amount) => {
    const scrollAmount = document.documentElement.clientHeight * amount;
    window.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  };

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
      <main
        style={{ direction: "rtl" }}
        className="flex flex-col max-w-screen m-auto bg-[#d9f0ff] pr-[80px] pb-[100px] pt-[13px] shadow-2xl shadow-[#000000]-25 items-center overflow-hidden"
      >
        <button
          className="bg-[#2663cd] text-[#ffffff] items-center rounded-[46px] py-[8px] px-[18px] mt-[15px] mb-[24px] ml-auto shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          onClick={() => setFollowing(!following)}
        >
          {following ? (
            <span className="font-[400] text-[16px]">دنبال کردن</span>
          ) : (
            <span className="font-[400] text-[16px]">دنبال نکردن</span>
          )}
        </button>
        <h1 className="text-[#265073] text-[32px] font-[700] mx-auto absolute ml-[80px]">
          پروفایل کاربری
        </h1>

        <div className="flex bg-[#A4C0ED] rounded-[35px] shadow-lg shadow-[#000000]/25 mb-[40px] pl-[52px] pb-[52px] pr-[23px] pt-[20px] gap-[39px] border-[2px] border-[#000000]/8 ml-[80px]">
          <div className="min-w-[236px]">
            <img
              className="w-[236px] h-[267px] shadow-lg shadow-[#000000]/25 rounded-[30px]"
              src="/src/assets/images/user_image.png"
              alt="userimage"
            />
            <h2 className="text-[24px] text-[#000000] font-[400] mt-[8px] mb-[12px]">
              جزئیات
            </h2>
            <p className="text-[16px] text-[#000000] font-[300]">
              جنسیت ذکر نشده
            </p>
            <p className="text-[16px] font-[300] mt-[12px]">
              ملحق شده در روز/ماه/سال
            </p>
          </div>

          <div className="w-[100%]">
            <h3 className="text-[24px] font-[300] mt-[8px] mb-[15px]">
              نام کاربری
            </h3>

            <div className="flex gap-[20px] mb-[19px]">
              <button
                onClick={() => handleScrollDown(0.9)}
                className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none"
              >
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  100
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  کتاب موردعلاقه
                </span>
              </button>
              <button
                onClick={() => handleScrollDown(1.4)}
                className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none"
              >
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  10
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  کتاب تالیف شده
                </span>
              </button>
            </div>

            <div>
              <h5 className="text-[16px] font-[300] mb-1">مشخصات:</h5>
              <div className="bg-white px-[25.7px] py-[16.6px] rounded-[10px] shadow-lg shadow-[#000000]/25">
                <p className="text-[#000000]/70 text-[14px] font-[300] ">
                  این متن صرفا جهت تست میباشد...
                  <br />
                  این متن صرفا جهت تست میباشد...
                  <br />
                  <br />
                  این متن صرفا جهت تست میباشد...این متن صرفا جهت تست
                  میباشد...این متن صرفا جهت تست میباشد...این متن صرفا جهت تست
                  میباشد...این متن صرفا جهت تست میباشد...این متن صرفا جهت تست
                  میباشد...این متن صرفا جهت تست میباشد...این متن صرفا جهت تست
                  میباشد...
                  <br />
                  <br />
                  این متن صرفا جهت تست میباشد...
                  <br />
                  این متن صرفا جهت تست میباشد...
                </p>
              </div>
            </div>
          </div>

          {WrittenBooks[0] ? (
            <div className="min-w-[242px] h-[368px] mt-[32px]">
              <BookCard
                title="تست"
                author="تست"
                coverImage={"/src/assets/images/book_sample1.png"}
                description="این متن صرفا جهت تست است..."
                chapters={85}
              />
            </div>
          ) : (
            <div className="bg-[#ffffff] rounded-[20px] px-[17px] pt-[41px] pb-[28px] mt-[32px] mr-auto shadow-lg shadow-[#000000]/25 min-w-[242px]">
              <img
                src="/src/assets/images/another_favorite_book.png"
                alt="favoritebook"
              />
            </div>
          )}
        </div>

        <h5 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
          کتاب های موردعلاقه
        </h5>

        <div
          ref={containerRef1}
          className="mb-[40px] overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto"
        >
          {FavoriteBooks[0] ? (
            <button
              onClick={() => handleScroll1("left")}
              className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
            >
              <img src="/src/assets/images/slider.svg" alt="slider"></img>
            </button>
          ) : null}
          {FavoriteBooks[0] ? (
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
            {FavoriteBooks[0] ? (
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

        <h6 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
          کتاب های تالیف شده
        </h6>

        <div
          ref={containerRef2}
          className="overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto"
        >
          {WrittenBooks[0] ? (
            <button
              onClick={() => handleScroll2("left")}
              className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
            >
              <img src="/src/assets/images/slider.svg" alt="slider"></img>
            </button>
          ) : null}
          {WrittenBooks[0] ? (
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
            {WrittenBooks[0] ? (
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
              <span>موردی برای نمایش وجود ندارد...</span>
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
        height: `${h}px`,
        paddingLeft: isLast ? "80px" : "0",
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
