import { useEffect, useState } from "react";
import EditProfile from "../EditProfile/editProfile";
import Footer from "/src/common/Footer/Footer";
import Navbar from "../../../pages/Navbar";
import { Rating } from "@mui/material";
import BookCard from "../../../common/BookCard/bookCard";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/infoSlice";
import Loading from "../../../common/Loading/Loading";
import { useNavigate } from "react-router";
import UserDashboard from "../UserDashboard/userDashboard";

const token = localStorage.getItem("access_token");
export default function Profile() {
  const [lastBook, setLastBook] = useState({});
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [following, setFollowing] = useState([]);
  const [writtenBooks, setWrittenBooks] = useState(0);
  const handleFollow = async (user) => {
    try {
      setFollowing((prev) => ({
        ...prev,
        [user.following_user_id]: !prev[user.following_user_id],
      }));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const auth = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/auth/who/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          userBooks(data.id);
          setUserInfo(data.user_info);
        } else {
          setUserInfo([]);
        }
      } catch (err) {
        console.error("Error:", err.message);
        setUserInfo([]);
      } finally {
        setLoading(false);
      }
    };
    const userBooks = async (userid) => {
      setLoading2(true);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/book/user/${userid}/`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setWrittenBooks(data.count);
          setLastBook(data.results[0]);
        } else {
          /* empty */
        }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading2(false);
      }
    };
    auth();
    userBooks();
  }, []);
  useEffect(() => {
    const fetchFollowings = async () => {
      setLoading1(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/user/following/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFollowings(data.results);
        } else {
          /* empty */
        }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchFollowings();
  }, []);

  const [editClicked, setEditClicked] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isFollowingOpened, setIsFollowingOpened] = useState(false);
  const [isHoveredFavBook, setIsHoveredFavBook] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth/login");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDispatch(logout());
  };

  if (loading || loading1 || loading2)
    return (
      <div className="h-screen grid place-items-center">
        <Loading />
      </div>
    );

  return (
    <>
      <div
        className={`${editClicked ? "bg-slate-200/20 blur-sm" : "blur-none"} transition-all duration-500`}
      >
        <Navbar hasLogined={true} />
      </div>
      <main
        style={{ direction: "rtl" }}
        className="flex flex-col gap-5 md:gap-8 lg:gap-[20px] max-w-screen px-4 sm:px-6 md:px-8 lg:px-20 pb-16 md:pb-20 lg:pb-[90px] pt-3 md:pt-4 lg:pt-[13px] shadow-2xl shadow-[#000000]-25 items-center"
      >
        <h1 className="text-[#265073] text-2xl sm:text-3xl lg:text-[32px] font-bold mx-auto">
          پروفایل کاربری
        </h1>

        <div className="flex flex-col lg:flex-row w-full max-w-[90vw] bg-[#A4C0ED] ml-auto rounded-2xl lg:rounded-[35px] shadow-lg shadow-[#000000]/25 mb-8 md:mb-10 lg:mb-[40px] p-4 md:p-6 lg:pl-12 lg:pr-6 lg:pt-5 gap-4 md:gap-6 lg:gap-[39px] border-2 border-[#000000]/8">
          <div className="flex flex-col items-center lg:items-start lg:min-w-[236px] gap-3 md:gap-4 lg:gap-[15px]">
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-[236px] lg:h-[236px] rounded-full overflow-hidden">
              <img
                className="w-full h-full shadow-lg shadow-[#000000]/25 object-cover"
                src={
                  userInfo.image
                    ? `http://127.0.0.1:8000${userInfo.image}`
                    : `/images/user_image.png`
                }
                alt="userimage"
              />
            </div>
            <h3 className="text-xl md:text-2xl lg:text-[24px] font-bold text-center lg:text-right">
              {userInfo.user}
            </h3>
            <div className="w-full lg:w-auto flex flex-col gap-2">
              <button
                onMouseEnter={() => setIsHoveredEdit(true)}
                onMouseLeave={() => setIsHoveredEdit(false)}
                onClick={() => setEditClicked(true)}
                className="btn !w-full lg:!w-auto lg:min-w-[200px]"
              >
                {!isHoveredEdit ? (
                  <img
                    className="w-5 h-5 lg:w-[22px] lg:h-[22px] relative"
                    src="/src/assets/images/edit_sign.png"
                    alt="edit"
                  />
                ) : (
                  <img
                    className="w-5 h-5 lg:w-[22px] lg:h-[22px] relative"
                    src="/src/assets/images/edit_sign2.png"
                    alt="edit"
                  />
                )}
                <span className="span-btn font-normal">ویرایش پروفایل</span>
              </button>
              <button
                onClick={handleLogout}
                className="btn !bg-red-700 !w-full lg:!w-auto lg:min-w-[200px] before:!bg-[#FF3B30]"
              >
                <span className="span-btn font-normal">
                  خروج از حساب کاربری
                </span>
              </button>
            </div>
          </div>

          <div className="w-full m-0 lg:m-8 lg:mt-0 lg:ml-0">
            <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold">
              قفسه ها:
            </h1>

            <div className="flex flex-wrap gap-4 md:gap-5 lg:gap-[20px] mb-4 md:mb-5 lg:mb-[19px]">
              <button
                onClick={() => {
                  navigate("/mybooks");
                }}
                className="btn !m-0 !mt-2 lg:!mt-[10px] !min-h-12 lg:!min-h-[60px] !flex !flex-col !bg-white !rounded-lg"
              >
                <h4 className="span-btn !text-xl md:!text-2xl lg:!text-[24px] !font-semibold !text-[#265073]">
                  {writtenBooks}
                </h4>
                <h4 className="span-btn !font-normal !text-[#000000]/70 !text-xs md:!text-sm lg:!text-[14px]">
                  کتاب تالیف شده
                </h4>
              </button>
              <div className="flex flex-col items-center">
                <button
                  onClick={
                    userInfo.following_count != 0
                      ? () => setIsFollowingOpened(!isFollowingOpened)
                      : () => setIsFollowingOpened(isFollowingOpened)
                  }
                  onBlur={() =>
                    setTimeout(() => {
                      setIsFollowingOpened(false);
                    }, 250)
                  }
                  className="btn !m-0 !mt-2 lg:!mt-[10px] !min-h-12 lg:!min-h-[60px] !flex !flex-col !bg-white !rounded-lg"
                >
                  <h4 className="span-btn !text-xl md:!text-2xl lg:!text-[24px] !font-semibold !text-[#265073]">
                    {userInfo.following_count}
                  </h4>
                  <h4 className="span-btn !font-normal !text-[#000000]/70 !text-xs md:!text-sm lg:!text-[14px]">
                    نفر دنبال شده
                  </h4>
                </button>
                <ul
                  dir="ltr"
                  className={`z-10 absolute w-[90vw] sm:w-[80vw] md:w-[487px] rounded-md overflow-y-auto transition-opacity duration-400 ease-in-out ${
                    isFollowingOpened
                      ? "visible opacity-100"
                      : "hidden opacity-0"
                  } shadow-lg shadow-[#000000]/21 h-[304px] mt-[73px] bg-white divide-y divide-[#2F4F4F]/50`}
                >
                  {followings.map((user) => (
                    <UserFollowing user={user} />
                  ))}
                </ul>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold mb-1">
              مشخصات:
            </h1>
            <div className="relative bg-white h-48 md:h-52 lg:h-[230px] rounded-lg shadow-lg shadow-[#000000]/25">
              <div className="pt-3 px-5 lg:pt-[11px] lg:px-[20px] mt-2 lg:mt-[10px]">
                <p className="font-semibold text-sm md:text-base lg:text-[16px] mb-1 lg:mb-[5px]">
                  بیوگرافی:
                </p>
                <div className="min-w-[175px]">
                  <p className="text-[#000000] text-xs md:text-sm lg:text-[14px] font-light">
                    {userInfo.bio}
                  </p>
                </div>
                <p className="text-xs md:text-sm lg:text-[14px] absolute bottom-10">
                  <span className="font-semibold">جنسیت:</span>{" "}
                  {user.gender === "female" ? "زن" : "مرد"}
                </p>
                <p className="text-xs md:text-sm lg:text-[14px] font-light absolute bottom-2">
                  <span className="font-semibold"> تاریخ ثبت نام: </span>
                  {getPersianDate(user.joined_date)}
                </p>
              </div>
            </div>
          </div>

          {lastBook ? (
            <div
              onClick={() => {
                navigate(`/book/${lastBook.id}`);
              }}
              className="hidden lg:block lg:min-w-[292px] w-[200px] h-auto lg:h-[368px] m-0 lg:m-8 lg:mt-1 lg:ml-0"
            >
              <h1 className="text-base md:text-lg lg:text-[18px] font-bold mb-1">
                آخرین کتاب نوشته شده:
              </h1>
              <BookCard
                title={lastBook.name}
                author={lastBook.Author}
                coverImage={
                  lastBook.image ? lastBook.image : "/images/book_sample1.png"
                }
                description={lastBook.description}
                chapters={85}
              />
            </div>
          ) : (
            <button
              onMouseEnter={() => setIsHoveredFavBook(true)}
              onMouseLeave={() => setIsHoveredFavBook(false)}
              className="relative bg-white rounded-xl lg:rounded-[20px] px-4 lg:px-[17px] pt-10 lg:pt-[41px] pb-7 lg:pb-[28px] mt-4 lg:mt-8 mr-auto shadow-lg shadow-[#000000]/25 w-full lg:min-w-[242px] cursor-pointer"
            >
              <img
                src="/images/favorite_book.png"
                alt="favoritebook"
                className={`transition-all duration-500 mx-auto ${
                  isHoveredFavBook ? "blur-sm" : "blur-none"
                }`}
              />
              <button
                className={`transition-all duration-500 absolute mx-auto inset-x-0 max-h-10 max-w-[239px] my-auto inset-y-0 flex gap-3 md:gap-4 lg:gap-[15px] bg-[#2663cd] text-white text-sm md:text-base lg:text-[16px] whitespace-nowrap items-center rounded-full lg:rounded-[46px] py-2 lg:py-[8px] px-4 lg:px-[18px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-2 focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto ${
                  isHoveredFavBook
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                }`}
              >
                <img
                  className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                  src="/src/assets/images/edit_sign.png"
                  alt="edit"
                />
                <h4 className="font-normal">کتاب جدید خود را بنویسید</h4>
              </button>
            </button>
          )}
        </div>
        <h2 className="text-xl md:text-2xl lg:text-[24px] font-normal text-[#265073] ml-auto mb-6 lg:mb-[25px]">
          داشبورد مدیریتی
        </h2>
        <UserDashboard />
      </main>
      <div
        className={`${editClicked ? "bg-slate-200/20 blur-sm" : "blur-none"} mt-[-60px] transition-all duration-500`}
      >
        <Footer />
      </div>
      <div
        className={`fixed flex justify-center top-2 w-full transition-all duration-500 ${
          editClicked ? "visible opacity-100" : "invisible opacity-0"
        } z-20`}
      >
        <EditProfile setEditClicked={setEditClicked} />
      </div>
    </>
  );

  function UserFollowing({ user }) {
    const [isHoveredInnerButton, setIsHoveredInnerButton] = useState(false);

    return (
      <li
        onClick={() => {
          if (!isHoveredInnerButton) {
            navigate(`/anotheruserprofile/${user.following_user_id}`);
          }
        }}
        className={`flex flex-col md:flex-row items-center h-auto md:h-[152px] py-4 md:py-0 pr-4 md:pr-8 pl-4 md:pl-5 justify-between relative overflow-hidden p-5 md:p-[21px] bg-white outline-2 outline-[#000000]/21 rounded-md cursor-pointer ${
          !isHoveredInnerButton
            ? "hover:ease-in-out hover:before:w-full hover:before:h-full hover:shadow-[#000000]/50 hover:shadow-lg hover:text-white"
            : ""
        } before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/60 before:shadow-none before:inset-0 before:transition-all before:duration-200 transition-all active:before:bg-[#2663CD]/40 active:outline-none active:shadow-none active:ring-0 active:ring-offset-0`}
      >
        {following[user.following_user_id] ? (
          <button
            onClick={() => handleFollow(user)}
            onMouseEnter={() => setIsHoveredInnerButton(true)}
            onMouseLeave={() => setIsHoveredInnerButton(false)}
            className="btn py-2 px-5 md:py-[7px] md:px-[21px] !rounded-lg !w-fit !h-fit !ml-0 !mr-0 !mb-2 md:!mb-0"
          >
            <h4 className="span-btn text-sm md:text-[14px] font-light">
              دنبال کردن
            </h4>
          </button>
        ) : (
          <button
            onClick={() => {
              handleFollow(user);
              location.reload();
            }}
            onMouseEnter={() => setIsHoveredInnerButton(true)}
            onMouseLeave={() => setIsHoveredInnerButton(false)}
            className="btn py-2 px-5 md:py-[7px] md:px-[21px] !rounded-lg !w-fit !h-fit !ml-0 !mr-0 !mb-2 md:!mb-0"
          >
            <h4 className="span-btn text-sm md:text-[14px] font-light">
              دنبال نکردن
            </h4>
          </button>
        )}

        <div className="relative flex items-center gap-4 md:gap-[18px] cursor-pointer rounded-full">
          <div className="flex flex-col gap-1 md:gap-[5px]">
            <h4 className="ml-auto text-lg md:text-[20px] font-semibold">
              {user.following}
            </h4>
            <h4
              dir="rtl"
              className="text-xs md:text-[12px] font-normal text-[#265073]"
            ></h4>
          </div>

          {user.following_image == null ? (
            <img
              src={"/images/following.png"}
              alt="following"
              className="rounded-full w-20 h-20 md:w-[110px] md:h-[110px]"
            />
          ) : (
            <img
              src={`http://127.0.0.1:8000${user.following_image}`}
              alt="following"
              className="rounded-full w-20 h-20 md:w-[110px] md:h-[110px]"
            />
          )}
        </div>
      </li>
    );
  }
}
