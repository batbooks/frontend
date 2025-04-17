import { useState } from "react";
import EditProfile from "../EditProfile/editProfile";
import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import { Rating } from "@mui/material";
import BookCard from "../../../common/BookCard/bookCard";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/infoSlice";
import { Navigate, useNavigate } from "react-router";

const IsReading = [1];
const IsWriting = [1, 2];
const WrittenBooks = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Profile() {
  const dispatch = useDispatch();
  const [editClicked, setEditClicked] = useState(false);
  const [isFollowingOpened, setIsFollowingOpened] = useState(false);
  const [isHoveredFavBook, setIsHoveredFavBook] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("qqq");
    localStorage.removeItem("access_token");
    navigate("/auth/login");

    useDispatch(logout());
  }

    // useDispatch(logout());
  };


  return (
    <>
      <div
        className={`fixed flex justify-center top-2 w-[100%] transition-all duration-500 ${editClicked ? "visible opacity-100" : "invisible opacity-0"} z-2`}
      >
        <EditProfile setEditClicked={setEditClicked} />
      </div>
      <div
        className={`${editClicked ? "bg-slate-200/20 blur-sm" : "blur-none"} transition-all duration-500`}
      >
        <Navbar hasLogined={true} />
      </div>
      <main
        style={{ direction: "rtl" }}
        className={`z-1 flex flex-col max-w-screen m-auto bg-[#d9f0ff] px-[80px] pb-[90px] pt-[13px] shadow-2xl shadow-[#000000]-25 transition-all duration-500 ${editClicked ? "bg-slate-200/20 blur-sm" : "blur-none"}`}
      >
        <div className="flex justify-between">
          <button
            onClick={() => setEditClicked(true)}
            className="flex gap-[15px] bg-[#2663cd] text-[#ffffff] items-center rounded-[46px] py-[8px] px-[18px] mt-[15px] mb-[24px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          >
            <img
              className="w-[22px] h-[22px]"
              src="/src/assets/images/edit_sign.png"
              alt="edit"
            />
            <span className="font-[400]">ویرایش پروفایل</span>
          </button>
          <h1 className="text-[#265073] text-[32px] font-[700] ">
            پروفایل کاربری
          </h1>
          <button
            onClick={handleLogout}
            className="bg-[#2663cd] font-[400] text-[#ffffff] items-center rounded-[46px] px-[32px] py-[8px] mt-[15px] mb-[24px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          >
            خروج از حساب کاربری
          </button>
        </div>

        <div className="flex bg-[#A4C0ED] rounded-[35px] shadow-lg shadow-[#000000]/25 mb-[40px] pl-[52px] pb-[52px] pr-[23px] pt-[20px] gap-[39px] border-[2px] border-[#000000]/8">
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
              <button className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none">
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  100
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  کتاب موردعلاقه
                </span>
              </button>
              <button className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none">
                <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                  10
                </span>
                <span className="font-[400] text-[#000000]/70 text-[14px]">
                  کتاب تالیف شده
                </span>
              </button>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setIsFollowingOpened(!isFollowingOpened)}
                  onBlur={() =>
                    setTimeout(() => {
                      setIsFollowingOpened(false);
                    }, 250)
                  }
                  className="flex flex-col bg-[#ffffff] px-[36px] py-[5.5px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:shadow-none focus:bg-[#2663cd]/90 hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:outline-none disabled:bg-[#2663cd] disabled:cursor-auto disabled:shadow-none"
                >
                  <span className="text-[24px] font-[600] text-[#265073] mb-[-5px]">
                    8
                  </span>
                  <span className="font-[400] text-[#000000]/70 text-[14px]">
                    نفر دنبال شده
                  </span>
                </button>
                <ul
                  dir="ltr"
                  className={`absolute w-[487px] rounded-[5px] overflow-y-auto transition-opacity duration-400 ease-in-out ${isFollowingOpened ? "visible opacity-100" : "hidden opacity-0"} shadow-lg shadow-[#000000]/21 border-[2px] border-[#000000]/8 h-[304px] mt-[73px] bg-[#ffffff] divide-y divide-[#2F4F4F]/50`}
                >
                  {Array.from({ length: 8 }, (_, i) => i).map(() => (
                    <UserFollowing />
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h5 className="text-[16px] font-[300] mb-1">مشخصات:</h5>
              <div className="bg-white px-[25.7px] py-[16.6px] rounded-[10px] shadow-lg shadow-[#000000]/25">
                <p className="text-[#000000]/70 text-[14px] font-[300]">
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
                <span className="font-[400]">کتاب جدید خود را بنویسید</span>
              </button>
            </button>
          )}
        </div>

        <div>
          <h6 className="text-[24px] font-[400] text-[#265073] mb-[25px]">
            اخیرا مطالعه میکرده ام...
          </h6>
          {IsReading[0] ? (
            IsReading.map(() => <ReadingBook />)
          ) : (
            <div className="flex items-center mb-[40px] gap-[12px]">
              <p>اخیرا کتابی را مطالعه نکرده اید...</p>
              <button className="max-w-[196px] transition-all duration-200 bg-[#2663cd] text-[#ffffff] text-[16px] items-center rounded-[46px] py-[8px] px-[18px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                مشاهده تمامی کتاب ها
              </button>
            </div>
          )}
        </div>

        <div>
          <h6 className="text-[24px] font-[400] text-[#265073] mb-[25px]">
            در حال تالیف هستم...
          </h6>
          <div className="grid grid-cols-2 gap-[42px] items-center">
            {IsWriting[0] ? (
              IsWriting.map(() => <WritingBook />)
            ) : (
              <div className="flex items-center gap-[12px]">
                <p>اخیرا کتابی را تالیف نکرده اید...</p>
                <button className="max-w-[196px] transition-all duration-200 bg-[#2663cd] text-[#ffffff] text-[16px] items-center rounded-[46px] py-[8px] px-[18px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                  مشاهده تمامی کتاب ها
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <div
        className={`${editClicked ? "bg-slate-200/20 blur-sm" : "blur-none"} mt-[-60px] transition-all duration-500`}
      >
        <Footer />
      </div>
    </>
  );


function UserFollowing() {
  return (
    <li className="flex items-center h-[152px] pr-[33px] pl-[21px] justify-between">
      <button className="h-[35px] text-[14px] text-[#ffffff] font-[300] py-[7px] px-[24px] bg-[#2663cd] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
        دنبال نکردن
      </button>
      <button className="flex items-center gap-[18px] cursor-pointer rounded-full">
        <div className="flex flex-col gap-[5px]">
          <span className="ml-auto text-[20px] font-[600]">نام کاربری</span>
          <span dir="rtl" className="text-[12px] font-[400] text-[#265073]">
            1342 کتاب موردعلاقه
          </span>
        </div>
        <img
          src="/src/assets/images/following.png"
          alt="following"
          className="rounded-full w-[110px] h-[110px]"
        />
      </button>
    </li>
  );
}

function ReadingBook() {
  return (
    <div className="grid grid-cols-1">
      <div className="flex py-[26px] pr-[26px] pl-[41px] bg-[#a4c0ed] rounded-[25px] mb-[46px] items-center border-[2px] border-[#000000]/8 justify-between">
        <div className="flex">
          <img
            className="shadow-lg shadow-[#000000]/25 rounded-[20px] w-[153px] h-[189px]"
            src="/src/assets/images/book_sample1.png"
            alt="book"
          ></img>
          <div className="flex flex-col mr-[26px] mt-[27px]">
            <h6 className="text-[32px] font-[400] mb-[5px]">نام کتاب</h6>
            <p className="mb-[5px] text-[20px] font-[400]">نام نویسنده</p>
            <Rating
              style={{ direction: "ltr" }}
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[538px] h-[21px] bg-[#ffffff] rounded-[30px] shadow-lg shadow-[#000000]/25">
            <div className="w-[83%] h-[100%] bg-[#26A541] rounded-[30px] shadow-lg shadow-[#000000]/25"></div>
          </div>
          <p className="text-[16px] font-[400] mr-3">83%</p>
        </div>
        <button className="bg-[#2663CD] rounded-[10px] text-[#ffffff] text-[16px] font-[400] py-[9px] px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
          ادامه دادن
        </button>
      </div>
    </div>
  );
}

function WritingBook() {
  return (
    <div className="bg-[#a4c0ed] py-[22px] pr-[27px] pl-[41px] flex rounded-[25px] border-[2px] border-[#000000]/8 items-center justify-between grow-1">
      <div className="flex items-center gap-[26px]">
        <img
          className="w-[127px] h-[156px] shadow-lg shadow-[#000000]/25 rounded-[20px]"
          src="/src/assets/images/book_sample1.png"
          alt="book"
        ></img>
        <div className="flex flex-col gap-[5px] m-auto">
          <h6 className="text-[32px] font-[400]">نام کتاب</h6>
          <span className="text-[20px] font-[400]">فصل فلان ام</span>
        </div>
      </div>
      <button className="bg-[#2663CD] rounded-[10px] text-[#ffffff] text-[16px] font-[400] py-[5.5px] px-[32px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
        ادامه دادن
      </button>
    </div>
  );
}
