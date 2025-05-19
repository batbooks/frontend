import React, { useEffect, useRef, useState } from "react";
import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import BookCard from "../../../common/BookCard/bookCard";
import "./anotheruserprofile.css";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../../common/Loading/Loading";

const WrittenBooks = [1, 2, 3, 4, 5, 6, 7, 8];
const FavoriteBooks = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Another_User_Profile() {
  const [UserWritten, setUserWritten] = useState([]);
  const { userId } = useParams();
  const [following, setFollowing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const token = localStorage.getItem("access_token");
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [lastBook, setLastBook] = useState({});
  const [userBooks, setUserBooks] = useState([]);
  const [numberOfWrittenBooks, setNumberOfWrittenBooks] = useState(0);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      console.log("asda");
      try {
        const response = await fetch(`/api/user/info/${userId}/`);
        if (!response.ok) throw new Error("Failed to fetch book");
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const userBooks = async () => {
      setLoading3(true);

      try {
        const response = await fetch(`/api/book/user/${userId}/`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setUserWritten(data.results);
          setLastBook(data.results[0]);

          setNumberOfWrittenBooks(data.count);
        } else { /* empty */ }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading3(false);
      }
    };

    fetchUser();
    userBooks();
  }, [userId]);
  useEffect(() => {
    const fetchFollowing = async () => {
      setLoading1(true);
      try {
        const response = await fetch(`/api/user/is/follow/${userId}/`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFollowing(data.is_follow);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading1(false);
      }
    };
    fetchFollowing();
  }, [userId]);
  useEffect(() => {
    const fetchBlocked = async () => {
      setLoading2(true);
      try {
        const response = await fetch(`/api/user/is/Not_Interested/${userId}/`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setBlocked(data.is_not_interested);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading2(false);
      }
    };
    fetchBlocked();
  }, [userId]);
  const handleScrollDown = (amount) => {
    const scrollAmount = document.documentElement.clientHeight * amount;
    window.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  };
  function getPersianDate(dateString) {
    if (!dateString) return ""; // or return a fallback value
    const [year, month, day] = dateString.split("T")[0].split("-");
    const date = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  const handleFollow = async () => {
    try {
      const response = await fetch(`/api/user/toggle/follow/${userId}/`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleBlockd = async () => {
    try {
      const response = await fetch(
        `/api/user/toggle/Not_Interested/${userId}/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err.message);
    }
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
  const navigate = useNavigate();
  if (loading || loading1 || loading2)
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );

  return (
    <>
      <Navbar />

      <main
        dir="rtl"
        className="flex flex-col gap-[20px] max-w-screen m-auto pr-[50px] pb-[100px] pt-[13px] shadow-2xl shadow-[#000000]-25 items-center overflow-hidden"
      >
        <h1 className="text-[#265073] text-[32px] font-[700] mx-auto ">
          پروفایل کاربری
        </h1>
        <div className="flex min-w-[90vw] bg-[#A4C0ED] ml-auto rounded-[35px] shadow-lg shadow-[#000000]/25 mb-[40px] pl-[52px] pr-[23px] pt-[20px] gap-[39px] border-[2px] border-[#000000]/8 ">
          <div className="min-w-[236px] flex flex-col gap-[15px]">
            <div className="w-[236px] aspect-square rounded-full overflow-hidden">
              <img
                className="w-full h-full shadow-lg shadow-[#000000]/25 object-cover"
                src={
                  user.image
                    ? `/api${user.image}`
                    : `/src/assets/images/user_image.png`
                }
                alt="userimage"
              />
            </div>
            <h3 className="  text-[24px] font-bold text-center">{user.user}</h3>

            <div className=" flex flex-col  ">
              <button
                className="btn !w-full"
                onClick={() => {
                  handleFollow();
                  setFollowing(!following);
                }}
              >
                {!following ? (
                  <span className="span-btn">دنبال کردن</span>
                ) : (
                  <span className="span-btn">دنبال نکردن</span>
                )}
              </button>
              <button
                className=" btn  !bg-red-700 !w-full before:!bg-[#FF3B30] "
                onClick={() => {
                  handleBlockd();
                  setBlocked(!blocked);
                }}
              >
                {!blocked ? (
                  <span className=" span-btn">مسدود کردن</span>
                ) : (
                  <span className="span-btn">رفع مسدودیت</span>
                )}
              </button>
            </div>
          </div>
          <div className="w-full m-[32px] mt-0 ml-0 ">
            <h1 className="text-[26px] font-bold">قفسه ها:</h1>
            {console.log(user)}
            <div className="flex gap-[20px] mb-[19px] ">
              <button
                onClick={() => handleScrollDown(0.9)}
                className=" btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
              >
                <span className=" span-btn !text-[24px] !font-[600] !text-[#265073]">
                  {numberOfWrittenBooks}
                </span>
                <span className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
                  کتاب تالیف شده
                </span>
              </button>
              <button
                onClick={() => handleScrollDown(1.8)}
                className=" btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
              >
                <span className=" span-btn !text-[24px] !font-[600] !text-[#265073]">
                  5
                </span>
                <span className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
                  پلی لیست
                </span>
              </button>
            </div>
            <h1 className="text-[26px] font-bold mb-1">مشخصات:</h1>
            <div className="relative bg-white h-[230px] rounded-[10px] shadow-lg shadow-[#000000]/25">
              <div className="pt-[11px] px-[20px] mt-[10px] ">
                <p className="font-semibold text-[16px] mb-[5px]">بیوگرافی:</p>
                <div className="min-w-175">
                  <p className="text-[#000000] text-[14px] font-[300]">
                    {user.bio}
                    {user.bio}
                    <br />
                    {user.bio}
                    <br />
                    {user.bio}
                    <br />
                    {user.bio}
                    <br />
                    {user.bio}
                    <br />
                  </p>
                </div>
                <p className="text-[14px] absolute bottom-10">
                  <span className="font-semibold">جنسیت:</span>{" "}
                  {user.gender === "female" ? "زن" : "مرد"}
                </p>
                <p className="text-[14px] font-[300] absolute bottom-2">
                  {/* {user.joined_date} */}
                  <span className="font-semibold"> تاریخ ثبت نام: </span>
                  {getPersianDate(user.joined_date)}
                </p>
              </div>
            </div>
          </div>

          {UserWritten[0] ? (
            <div className="min-w-[242px] h-[375px] m-[32px] mt-[5px]  ml-0 ">
              <h1 className="text-[18px] font-bold mb-1">
                آخرین کتاب نوشته شده:
              </h1>
              <BookCard
                author={lastBook.Author}
                title={lastBook.name}
                coverImage={
                  lastBook.image != null ? `/api${lastBook.image}` : "/23.png"
                }
                chapters={80}
                description={lastBook.description}
              />
            </div>
          ) : (
            <div className="mb-[32px] p-[32px] pr-0 ">
              <img
                src="/27.png"
                alt="favoritebook"
                className="min-w-[242px]  rounded-[20px] h-[344px]    mr-0 ml-auto   shadow-lg  "
              />
            </div>
          )}
        </div>
        {/* <div className="w-full flex flex-row justify-between">
          <span className="text-[24px] font-[400] text-[#265073] mb-[25px] ">
            کتاب های موردعلاقه
          </span>
          <div className="  ml-7 ">
            <button className="btn"> مشاهده بیشتر </button>
          </div>
        </div>
        <div
          ref={containerRef1}
          className="mb-[40px] overflow-x-scroll scrollbar-opacity-0 w-full ml-auto"
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
        </div> */}
        <h6 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px] ">
          کتاب های تالیف شده
        </h6>

        <div
          ref={containerRef2}
          className="overflow-x-scroll scrollbar-opacity-0 w-[100%] ml-auto py-5"
        >
          {UserWritten[0] && UserWritten.length > 7 ? (
            <button
              onClick={() => handleScroll2("left")}
              className="absolute rounded-full bg-[#000000] z-2 mt-[107px] cursor-pointer left-0 ml-[80px]"
            >
              <img src="/src/assets/images/slider.svg" alt="slider"></img>
            </button>
          ) : null}
          {UserWritten[0] && UserWritten.length > 7 ? (
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
            {UserWritten[0] ? (
              UserWritten.map((book, index) =>
                index !== UserWritten.length - 1 ? (
                  <Book book={book} />
                ) : (
                  <Book book={book} isLast={true} />
                )
              )
            ) : (
              <span>موردی برای نمایش وجود ندارد...</span>
            )}
          </div>
          {UserWritten.length > 8 ? (
            <button className="btn w-[200px]!">
              <span className="span-btn "> مشاهده تمام موارد </span>
            </button>
          ) : null}
        </div>
      </main>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
}

export function Book({ book, isLast = false, minw = 180, h = 254 }) {
  return (
    <div
      style={{
        minWidth: isLast ? `${minw + 80}px` : `${minw}px`,
        height: `${h}px`,
        paddingLeft: isLast ? "80px" : "0",
      }}
    >
      <BookCard
        id={book.id}
        title={book.name}
        author={book.Author}
        coverImage={book.image != null ? `/api/${book.image}` : "/20.jpg"}
        description={book.description}
        chapters={80}
      />
    </div>
  );
}
