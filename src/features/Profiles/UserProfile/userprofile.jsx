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
import {
  FiArchive,
  FiBookmark,
  FiCreditCard,
  FiEdit3,
  FiGrid,
  FiInfo,
  FiLayers,
  FiLogOut,
  FiPlus,
  FiUser,
} from "react-icons/fi";
import {
  FaIdCard,
  FaInfoCircle,
  FaUser,
  FaUserAlt,
  FaUserAltSlash,
} from "react-icons/fa";

const token = localStorage.getItem("access_token");
export default function Profile() {
  const [lastBook, setLastBook] = useState({});
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [following, setFollowing] = useState([]);
  const [playlistCount, setPlaylistCount] = useState(0);
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
          setPlaylistCount(data.playlist_count);
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
        const response = await fetch(`http://127.0.0.1:8000/user/following/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
  const [isHoveredLogOut, setIsHoveredLogOut] = useState(false);

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
        className={`${editClicked ? "bg-slate-200/20 blur-sm" : "blur-none"} flex flex-col gap-5 md:gap-8 lg:gap-[20px] max-w-screen px-4 sm:px-6 md:px-8 lg:px-20 pb-16 md:pb-20 lg:pb-[90px] pt-3 md:pt-4 lg:pt-[13px] shadow-2xl shadow-[#000000]-25 items-center`}
      >
        <div className="flex items-center gap-2 md:gap-3 lg:gap-[10px] mb-4 md:mb-6 lg:mb-[20px]">
          <FiUser className="text-[#265073]  text-2xl md:text-3xl " />
          <h1 className="text-[#265073] text-2xl sm:text-3xl lg:text-[32px] font-bold mx-auto">
            پروفایل کاربری
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row w-full max-w-[90vw] bg-[#A4C0ED] ml-auto rounded-2xl lg:rounded-[35px] shadow-lg shadow-[#000000]/25 mb-8 md:mb-10 lg:mb-[40px] p-4 md:p-6 lg:pl-3 lg:pr-6 xl:pl-6 lg:pt-5 gap-4 md:gap-6 lg:gap-[39px] border-2 border-[#000000]/8">
          <div className="flex flex-col items-center  lg:min-w-[236px] gap-3 md:gap-4 lg:gap-[15px]">
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-[236px] lg:h-[236px] rounded-full overflow-hidden border-4 border-white">
              <img
                className="w-full h-full shadow-lg shadow-[#000000]/25 object-cover "
                src={
                  userInfo.image
                    ? `http://127.0.0.1:8000${userInfo.image}`
                    : userInfo.gender == "female"
                      ? "/images/femaleProfile.png"
                      : "/images/maleProfile.png"
                }
                alt="userimage"
              />
            </div>
            {console.log(userInfo)}
            <h3 className="w-full text-xl md:text-2xl lg:text-[24px] font-bold text-center ">
              {userInfo.user}
            </h3>
            <div className="w-full lg:w-auto flex flex-col gap-2">
              <button
                onMouseEnter={() => setIsHoveredEdit(true)}
                onMouseLeave={() => setIsHoveredEdit(false)}
                onClick={() => setEditClicked(true)}
                className="flex gap-2 btn !w-full lg:!w-auto lg:min-w-[200px]"
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
                className="btn !bg-red-700 !w-full lg:!w-auto lg:min-w-[200px] before:!bg-[#FF3B30] !flex gap-1.5"
                onMouseEnter={() => setIsHoveredLogOut(true)}
                onMouseLeave={() => setIsHoveredLogOut(false)}
              >
                {!isHoveredLogOut ? (
                  <FiLogOut color="white" className="relative" />
                ) : (
                  <FiLogOut color="black" className="relative" />
                )}

                <span className="span-btn font-normal">
                  خروج از حساب کاربری
                </span>
              </button>
            </div>
          </div>

          <div className="w-full m-0 lg:m-8 lg:mt-0 lg:ml-0">
            <div className="flex items-center text-center gap-2 md:gap-3 lg:gap-[10px]  ">
              <FiLayers className="opacity-70 text-xl md:text-2xl lg:text-3xl" />
              <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold">
                قفسه ها:
              </h1>
            </div>

            <div
              className={`flex flex-wrap  xl:flex xl:flex-wrap ${!lastBook ? "lg:grid lg:grid-cols-2" : null}   gap-4 md:gap-5 lg:gap-[20px] mb-4 md:mb-5 lg:mb-[19px]`}
            >
              <button
                onClick={() => {
                  navigate("/mybooks");
                }}
                className="btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
              >
                <span className="span-btn !text-[24px] !font-[600] !text-[#265073]">
                  {writtenBooks}
                </span>
                <span className="span-btn !font-normal !text-[#000000]/70 !text-xs md:!text-sm lg:!text-[14px]">
                  کتاب تالیف شده
                </span>
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
                  className="btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
                >
                  <span className="span-btn !text-[24px] !font-[600] !text-[#265073]">
                    {userInfo.following_count}
                  </span>
                  <span className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
                    نفر دنبال شده
                  </span>
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
                className="btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
              >
                <span className="span-btn !text-[24px] !font-[600] !text-[#265073]">
                  {userInfo.follower_count}
                </span>
                <span className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
                  نفر دنبال کرده
                </span>
              </button>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => navigate("/playlists")}
                  className=" btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
                >
                  <span className=" span-btn !text-[24px] !font-[600] !text-[#265073]">
                    {playlistCount}
                  </span>
                  <span className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
                    پلی لیست
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-10 flex items-center text-center gap-2 md:gap-3 lg:gap-[10px] mb-4 md:mb-6 lg:mb-[20px]">
              <FiInfo className="opacity-70 text-xl  lg:text-2xl" />
              <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold ">
                مشخصات:
              </h1>
            </div>
            <div className="relative bg-white h-48 md:h-52 lg:h-[210px] rounded-lg shadow-lg shadow-[#000000]/25">
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
                  {userInfo.gender === "female" ? "زن" : "مرد"}
                </p>
                <p className="text-xs md:text-sm lg:text-[14px] font-light absolute bottom-2">
                  <span className="font-semibold"> تاریخ ثبت نام: </span>
                  {getPersianDate(user.joined_date)}
                </p>
              </div>
            </div>
          </div>

          {lastBook ? (
            <div className="flex items-end lg:h-full xl:h-full">
              <div
                onClick={() => {
                  navigate(`/book/${lastBook.id}`);
                }}
                className="hidden h-full xl:block lg:min-w-[170px]  xl:min-w-[220px]  lg:h-[380px] m-0  lg:mt-1 xl:ml-0"
              >
                <div className="flex  text-center gap-2 md:gap-3 lg:gap-[10px] mb-2">
                  <FiBookmark className="opacity-70  md:text-md lg:text-lg" />
                  <h1 className="text-base md:text-sm xl:text-[14px] font-bold text-nowrap">
                    آخرین کتاب نوشته شده:
                  </h1>
                </div>
                <BookCard
                  title={lastBook.name}
                  author={lastBook.Author}
                  coverImage={
                    lastBook.image
                      ? `${lastBook.image}`
                      : "/images/book_sample1.png"
                  }
                  description={lastBook.description}
                  chapters={lastBook.chapter_count}
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/mybooks/createbook")}
              className="flex gap-2 md:gap-[10px] items-center justify-center  lg:items-end flex-col md:flex-row mb-8"
            >
              <div className="flex w-7/10 h-95   lg:w-35 xl:w-45 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-3 text-center text-slate-500 shadow-sm transition-colors duration-300 hover:border-blue-400 hover:text-blue-500">
                <p className="text-sm">اولین کتاب خود را بنویسید</p>
                <FiPlus className="h-12 w-12" />
              </div>
            </div>
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
