import { useEffect, useState } from "react";
import EditProfile from "../EditProfile/editProfile";
import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
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
<<<<<<< HEAD
      const response = await fetch(
        `https://www.batbooks.ir/user/toggle/follow/${user.following_user_id}/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
=======
>>>>>>> 4a675b6b32465fdc06461ba16e32de58b86443f2
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
        const response = await fetch(`https://www.batbooks.ir/auth/who/`, {
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
        const response = await fetch(`https://www.batbooks.ir/book/user/${userid}/`, {
          method: "GET",
        });

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
        const response = await fetch(`https://www.batbooks.ir/user/following/`, {
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
      <div className="h-[100vh] grid place-items-center">
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
        className="flex flex-col gap-[20px] max-w-screen px-[80px] pb-[90px] pt-[13px] shadow-2xl shadow-[#000000]-25 items-center overflow-hidden"
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
                  userInfo.image
                    ? `https://www.batbooks.ir${userInfo.image}`
                    : `/src/assets/images/user_image.png`
                }
                alt="userimage"
              />
            </div>
            <h3 className="  text-[24px] font-bold text-center">
              {userInfo.user}
            </h3>
            <div className=" flex flex-col  ">
              <button
                onMouseEnter={() => setIsHoveredEdit(true)}
                onMouseLeave={() => setIsHoveredEdit(false)}
                onClick={() => setEditClicked(true)}
                className="btn !w-full"
              >
                {!isHoveredEdit ? (
                  <img
                    className="w-[22px] h-[22px] relative"
                    src="/src/assets/images/edit_sign.png"
                    alt="edit"
                  />
                ) : (
                  <img
                    className="w-[22px] h-[22px] relative"
                    src="/src/assets/images/edit_sign2.png"
                    alt="edit"
                  />
                )}
                <span className="span-btn font-[400]">ویرایش پروفایل</span>
              </button>
              <button
                onClick={handleLogout}
                className=" btn  !bg-red-700 !w-full before:!bg-[#FF3B30] "
              >
                <span className="span-btn font-[400]">خروج از حساب کاربری</span>
              </button>
            </div>
          </div>

          <div className="w-full m-[32px] mt-0 ml-0 ">
            <h1 className="text-[26px] font-bold">قفسه ها:</h1>

            <div className="flex gap-[20px] mb-[19px]">
              <button
                onClick={() => {
                  navigate("/mybooks");
                }}
                className="btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
              >
                <h4 className=" span-btn !text-[24px] !font-[600] !text-[#265073]">
                  {writtenBooks}
                </h4>
                <h4 className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
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
                  className="btn !m-0 !mt-[10px] !min-h-[60px] !flex !flex-col !bg-[#ffffff]  !rounded-[10px]"
                >
                  <h4 className=" span-btn !text-[24px] !font-[600] !text-[#265073]">
                    {userInfo.following_count}
                  </h4>
                  <h4 className="span-btn !font-[400] !text-[#000000]/70 !text-[14px]">
                    نفر دنبال شده
                  </h4>
                </button>
                <ul
                  dir="ltr"
                  className={`z-10 absolute w-[487px] rounded-[5px] overflow-y-auto transition-opacity duration-400 ease-in-out ${isFollowingOpened ? "visible opacity-100" : "hidden opacity-0"} shadow-lg shadow-[#000000]/21 h-[304px] mt-[73px] bg-[#ffffff] divide-y divide-[#2F4F4F]/50`}
                >
                  {followings.map((user) => (
                    <UserFollowing user={user} />
                  ))}
                </ul>
              </div>
            </div>

            <h1 className="text-[26px] font-bold mb-1">مشخصات:</h1>
            <div className="relative bg-white h-[230px] rounded-[10px] shadow-lg shadow-[#000000]/25">
              <div className="pt-[11px] px-[20px] mt-[10px] ">
                <p className="font-semibold text-[16px] mb-[5px]">بیوگرافی:</p>
                <div className="min-w-175">
                  <p className="text-[#000000] text-[14px] font-[300]">
                    {userInfo.bio}
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

          {lastBook ? (
            <div
              onClick={() => {
                navigate(`/book/${lastBook.id}`);
              }}
              className="min-w-[242px] h-[368px] m-[32px] mt-[5px]  ml-0 "
            >
              <h1 className="text-[18px] font-bold mb-1">
                آخرین کتاب نوشته شده:
              </h1>
              {console.log(lastBook.id)}
              <BookCard
                title={lastBook.name}
                author={lastBook.Author}
                coverImage={
                  lastBook.image
                    ? lastBook.image
                    : "/src/assets/images/book_sample1.png"
                }
                description={lastBook.description}
                chapters={85}
              />
            </div>
          ) : (
            <button
              onMouseEnter={() => setIsHoveredFavBook(true)}
              onMouseLeave={() => setIsHoveredFavBook(false)}
              className="relative bg-[#ffffff] rounded-[20px] px-[17px] pt-[41px] pb-[28px] mt-[32px] mr-auto shadow-lg shadow-[#000000]/25 min-w-[242px] cursor-pointer"
            >
              <img
                src="/src/assets/images/favorite_book.png"
                alt="favoritebook"
                className={`transition-all duration-500 ${isHoveredFavBook ? "blur-sm" : "blur-none"}`}
              />
              <button
                className={`transition-all duration-500 absolute mx-auto inset-x-0 max-h-[40px] max-w-[239px] my-auto inset-y-0 flex gap-[15px] bg-[#2663cd] text-[#ffffff] text-[16px] text-nowrap items-center rounded-[46px] py-[8px] px-[18px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto ${isHoveredFavBook ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <img
                  className="w-[22px] h-[22px]"
                  src="/src/assets/images/edit_sign.png"
                  alt="edit"
                />
                <h4 className="font-[400]">کتاب جدید خود را بنویسید</h4>
              </button>
            </button>
          )}
        </div>
        <h2 className="text-[24px] font-[400] text-[#265073] ml-auto mb-[25px]">
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
        className={`fixed flex justify-center top-2 w-[100%] transition-all duration-500 ${editClicked ? "visible opacity-100" : "invisible opacity-0"} z-2`}
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
        className={`flex items-center h-[152px] pr-[33px] pl-[21px] justify-between relative overflow-hidden p-[21px] bg-[#ffffff] outline-[2px] outline-[#000000]/21 rounded-[5px] cursor-pointer ${!isHoveredInnerButton ? "hover:ease-in-out hover:before:w-full hover:before:h-full hover:shadow-[#000000]/50 hover:shadow-lg hover:text-white" : ""} before:absolute before:w-0 before:h-0 before:bg-[#2663CD]/60 before:shadow-none before:inset-0 before:transition-all before:duration-[0.2s] transition-all active:before:bg-[#2663CD]/40 active:outline-none active:shadow-none active:ring-0 active:ring-offset-0`}
      >
        {following[user.following_user_id] ? (
          <button
            onClick={() => handleFollow(user)}
            onMouseEnter={() => setIsHoveredInnerButton(true)}
            onMouseLeave={() => setIsHoveredInnerButton(false)}
            className="btn py-[7px] px-[21px] !rounded-[10px] !w-fit !h-fit !ml-0 !mr-0 !mb-0"
          >
            <h4 className="span-btn text-[14px] font-[300]">دنبال کردن</h4>
          </button>
        ) : (
          <button
            onClick={() => {
              handleFollow(user);
              location.reload();
            }}
            onMouseEnter={() => setIsHoveredInnerButton(true)}
            onMouseLeave={() => setIsHoveredInnerButton(false)}
            className="btn py-[7px] px-[21px] !rounded-[10px] !w-fit !h-fit !ml-0 !mr-0 !mb-0"
          >
            <h4 className="span-btn text-[14px] font-[300]">دنبال نکردن</h4>
          </button>
        )}

        <div className="relative flex items-center gap-[18px] cursor-pointer rounded-full">
          <div className="flex flex-col gap-[5px]">
            <h4 className="ml-auto text-[20px] font-[600]">{user.following}</h4>
            <h4
              dir="rtl"
              className="text-[12px] font-[400] text-[#265073]"
            ></h4>
          </div>

          {user.following_image == null ? (
            <img
              src={"/src/assets/images/following.png"}
              alt="following"
              className="rounded-full w-[110px] h-[110px]"
            />
          ) : (
            <img
              src={`https://www.batbooks.ir${user.following_image}`}
              alt="following"
              className="rounded-full w-[110px] h-[110px]"
            />
          )}
        </div>
      </li>
    );
  }
}