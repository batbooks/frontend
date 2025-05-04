import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { useState } from "react";
import { Rating } from "@mui/material";

const genres = [
  "فانتزی",
  "علمی-تخیلی",
  "رمان(داستانی)",
  "تاریخی",
  "جنایی",
  "معمایی",
  "زندگینامه",
  "توسعه فردی",
  "عاشقانه",
  "ترسناک",
  "کمیک",
  "کمدی",
  "فانتزی",
  "علمی-تخیلی",
  "رمان(داستانی)",
  "تاریخی",
  "جنایی",
  "معمایی",
  "زندگینامه",
  "توسعه فردی",
  "عاشقانه",
  "ترسناک",
  "کمیک",
  "کمدی",
];

export default function SearchResults({ searchingItem = "forum" }) {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectValue, setIsSelectValue] = useState("--انتخاب کنید--");
  const [forums, setForums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); //get current page forums from api
  const [people, setPeople] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); //get current page people from api
  const [books, setBooks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); //get current page books from api

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        className={`flex flex-col items-center pt-[13px] pb-[60px] ${searchingItem == "book" ? "px-[98px]" : "px-[98px]"} w-[100%]`}
      >
        <h1 className="font-bold text-[#265073] text-[32px] mb-[91px]">
          {searchingItem === "book"
            ? "جستجوی کتاب"
            : searchingItem === "people"
              ? "افراد"
              : "تالار گفتگو"}
        </h1>
        <form
          className={`flex gap-[26px] ${
            searchingItem === "book" ? "mb-[26px]" : "mb-[37px]"
          }`}
        >
          <div className="relative flex items-center">
            <input
              className="w-[693px] h-[49px] py-[12.5px] pr-[26px] pl-[50px] bg-white rounded-[20px] outline-[2px] outline-[#000000]/30 shadow-lg shadow-[#000000]/25 focus:shadow-none focus:outline-[3px] focus:outline-[#2663cd] placeholder:text-[16px] placeholder:font-[300] placeholder:text-[#265073]"
              placeholder={
                searchingItem === "book"
                  ? "نام کتاب"
                  : searchingItem === "people"
                    ? "نام کاربری"
                    : "نام کتاب"
              }
            />
            <img
              src="/src/assets/images/search.png"
              alt="search"
              className="w-[24px] h-[24px] z-2 ml-[15px] absolute left-0"
            />
          </div>
          <button className="!py-[12px] !px-[28px] !rounded-[20px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 !border-[2px] !border-[#000000]/25 btn">
            <span className="span-btn !text-[16px] !font-[400]">
              جستجوی{" "}
              {searchingItem === "book"
                ? "کتاب"
                : searchingItem === "people"
                  ? "نام کاربری"
                  : "گفتگو"}
            </span>
          </button>
        </form>
        <div className="flex flex-col w-[100%]">
          {searchingItem !== "book" ? (
            <h2 className="text-[16px] font-[600] mb-[31px]">نتایج جستجو</h2>
          ) : (
            <div className="flex items-center justify-between mb-[21px]">
              <h2 className="text-[16px] font-[600]">نتایج جستجو</h2>
              <div className="relative flex items-center gap-[10px]">
                <h2 className="text-[16px] font-[600]">مرتب سازی براساس</h2>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSelectOpened(!isSelectOpened);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    setTimeout(() => {
                      setIsSelectOpened(false);
                    }, 250);
                  }}
                  className={`z-6 flex bg-[#ffffff] w-[147px] h-[45px] ${isSelectOpened ? "rounded-t-[12px]" : "rounded-[12px] shadow-lg shadow-[#000000]/21"} pl-[25px] pr-[5px] text-[13px] ${selectValue !== "--انتخاب کنید--" ? "text-[#000000]" : "text-[#265073]"} cursor-pointer outline-[2px] outline-[#000000]/21`}
                >
                  <div className="flex items-center hover:cursor-pointer z-7">
                    <img
                      src="/images/arrow.png"
                      alt="arrow"
                      className="w-[24px] h-[24px] z-8"
                    ></img>
                    <span className="z-8">{selectValue}</span>
                  </div>
                </button>
                <ul
                  className={`flex flex-col justify-between absolute left-0 bg-[#ffffff] w-[147px] mt-[137px] h-[90px] outline-[2px] outline-[#000000]/21 z-9 divide-y divide-[#2F4F4F]/50 rounded-b-[12px] ${isSelectOpened ? "visible" : "hidden"}`}
                >
                  <li className="grow-1 flex z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSelectValue("تازه ترین");
                      }}
                      className="flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none z-11"
                    >
                      <span className="m-auto font-bold z-12">تازه ترین</span>
                    </button>
                  </li>
                  <li className="grow-1 flex z-10 rounded-b-[12px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSelectValue("محبوب ترین");
                      }}
                      className="z-11 flex text-[15px] text-[#000000]/70 w-full h-full cursor-pointer hover:bg-[#2663cd]/90 hover:cursor-pointer active:outline-none rounded-b-[12px]"
                    >
                      <span className="z-12 m-auto font-bold">محبوب ترین</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {searchingItem === "book" ? (
            <div className="grid grid-cols-1 gap-[40px] mb-[30px]">
              {books.map((i) => (
                <Book
                  key={i}
                  coverImage={`/src/assets/images/book_sample${i}.png`}
                />
              ))}
            </div>
          ) : searchingItem === "forum" ? (
            <div className="grid grid-cols-2 gap-[25px] mb-[30px]">
              {forums.map((i) => (
                <Forum
                  key={i}
                  coverImage={`/src/assets/images/book_sample${i}.png`}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-[25px] mb-[30px]">
              {people.map((i) => (
                <Person key={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
}

function Book({
  coverImage,
  bookName = "نام کتاب",
  authorName = "نام نویسنده",
  star = 4.5,
}) {
  return (
    <div className="py-[26px] pl-[40px] pr-[20px] bg-[#A4C0ED] rounded-[25px] outline-[2px] outline-[#000000]/21 flex items-center justify-between">
      <div className="flex gap-[27px] items-center">
        <img
          src={coverImage}
          alt="book"
          className="rounded-[20px] w-[153px] h-[189px]"
        />
        <div className="flex flex-col gap-[5px]">
          <h3 className="text-[32px] font-[400]">{bookName}</h3>
          <div className="flex gap-[20px]">
            <sapn className="text-[20px] font-[400]">{authorName}</sapn>
            <Rating dir="ltr" readOnly precision={0.1} value={star} />
          </div>
          <p className="text-[14px] font-[300]">
            خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
            <br />
            خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد. خلاصه
            داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
            <br />
            خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
          </p>
        </div>
      </div>
      <button className="btn !py-[9px] !rounded-[10px] !min-w-[203px] !h-fit !mr-0 !ml-0 !mb-0">
        <span className="span-btn">مشاهده جزئیات کتاب</span>
      </button>
    </div>
  );
}

function Forum({ coverImage }) {
  return (
    <button className="relative overflow-hidden py-[10px] pr-[15px] pl-[20px] bg-[#A4C0ED] outline-[2px] outline-[#000000]/21 rounded-[15px] gap-[25px] flex items-center cursor-pointer hover:ease-in-out hover:before:w-full hover:before:h-full before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/40 before:shadow-none hover:shadow-[#000000]/21 hover:shadow-lg before:inset-0 before:transition-all before:duration-[0.2s] transition-all active:before:bg-[#2663CD]/20 active:outline-none active:shadow-none">
      <img
        src={coverImage}
        alt="image"
        className="relative w-[105px] h-[132px] rounded-[5px] z-2"
      />
      <div className="flex flex-col text-start relative z-2">
        <h3 className="text-[20px] font-[400] text-black">نام کتاب</h3>
        <div className="flex gap-[13px] mb-[13px]">
          <span className="text-[12px] font-[300] text-[#333333]">
            تالیف شده در 2 سال پیش
          </span>
        </div>
        <p className="text-[14px] font-[300]">
          خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
          <br />
          خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد. خلاصه
          داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
          <br />
          خلاصه داستان: این متن صرفاً جهت تست متن خلاصه کتاب می باشد.
        </p>
      </div>
    </button>
  );
}

function Person() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHoveredInnerButton, setIsHoveredInnerButton] = useState(false);

  return (
    <button
      onClick={() => {
        if (!isHoveredInnerButton) {
          console.log("navigate to userprofile");
        }
      }}
      className={`relative overflow-hidden p-[21px] bg-[#A4C0ED] outline-[2px] outline-[#000000]/21 rounded-[20px] flex items-center justify-between cursor-pointer ${!isHoveredInnerButton ? "hover:ease-in-out hover:before:w-full hover:before:h-full hover:shadow-[#000000]/50 hover:shadow-lg hover:text-white" : ""} before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/60 before:shadow-none before:inset-0 before:transition-all before:duration-[0.2s] transition-all active:before:bg-[#2663CD]/40 active:outline-none active:shadow-none active:ring-0 active:ring-offset-0`}
    >
      <div className="flex items-center gap-[21px] relative">
        <img
          src="/src/assets/images/following.png"
          alt="follow"
          className="rounded-full w-[110px] h-[110px]"
        />
        <div className="flex flex-col gap-[7px] items-start">
          <h3>نام کاربری</h3>
          <span>1342 کتاب موردعلاقه</span>
        </div>
      </div>
      <button
        onMouseEnter={() => setIsHoveredInnerButton(true)}
        onMouseLeave={() => setIsHoveredInnerButton(false)}
        onClick={() => {
          setIsFollowing(!isFollowing);
        }}
        className="btn py-[7px] px-[21px] !rounded-[10px] !w-fit !h-fit !ml-0 !mr-0 !mb-0"
      >
        <span className="span-btn text-[14px] font-[300]">
          {isFollowing ? "دنبال نکردن" : "دنبال کردن"}
        </span>
      </button>
    </button>
  );
}
