import { useSelector } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Rating } from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

export default function UserDashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [menuNum, setMenuNum] = useState(1);

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-[40px]">
      <div className="sticky flex flex-row lg:flex-col h-fit bg-[#a4c0ed] grow-2 pt-[15px] pb-[18px] px-[12px] gap-[12px] outline-[2px] outline-[#000]/21 rounded-[5px] shadow-md overflow-x-auto lg:overflow-visible">
        {isAuthenticated && user.user_info.image != null ? (
          <img
            className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] rounded-full mx-auto mb-[15px] hidden lg:block"
            src={`/api${user.user_info.image}`}
            alt="User Image 2"
          />
        ) : (
          <img
            className="w-[60px] h-[60px] lg:w-[90px] lg:h-[90px] rounded-full mx-auto mb-[15px] hidden lg:block"
            src="/src/assets/images/user_none2.png"
            alt="User Image 3"
          />
        )}
        <button
          onClick={() => {
            setMenuNum(1);
          }}
          className={`btn !mx-0 !rounded-[5px] !mb-0 !w-full lg:!w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 ${menuNum !== 1 ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]" : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"}`}
        >
          <ReviewsIcon className="relative text-sm lg:text-base" />
          <span className="span-btn !text-[12px] lg:!text-[16px] !ml-auto">
            تاریخچه نقد کتاب ها
          </span>
        </button>
        <button
          onClick={() => {
            setMenuNum(2);
          }}
          className={`btn !mx-0 !rounded-[5px] !mb-0 !w-full lg:!w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 ${menuNum !== 2 ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]" : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"}`}
        >
          <CommentIcon sx={{ transform: "scaleX(-1)" }} className="relative text-sm lg:text-base" />
          <span className="span-btn !text-[12px] lg:!text-[16px] !ml-auto">
            تاریخچه نظرات فصل ها
          </span>
        </button>
        <button
          onClick={() => {
            setMenuNum(4);
          }}
          className={`btn !mx-0 !rounded-[5px] !mb-0 !w-full lg:!w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 ${menuNum !== 4 ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]" : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"}`}
        >
          <AutoStoriesIcon className="relative text-sm lg:text-base" />
          <span className="span-btn !text-[12px] lg:!text-[16px] !ml-auto">
            کتاب های در حال خواندن
          </span>
        </button>
        <button className="btn !mx-0 !rounded-[5px] !mb-0 !w-full lg:!w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 !bg-[#CD6326BF] before:!bg-[#FF8A4DBF]">
          <LogoutIcon className="relative text-sm lg:text-base" />
          <span className="span-btn !text-[12px] lg:!text-[16px] !ml-auto">
            خروج از حساب کاربری
          </span>
        </button>
      </div>
      <div className="grow-100 flex flex-col gap-[35px]">
        {menuNum === 1 ? [1, 2].map((_, i) => <Review key={i} />) : null}
        {menuNum === 2
          ? [1, 2].map((_, i) => <Comment isClickedReplies={_ === 1} key={i} />)
          : null}
        {menuNum === 4
          ? [1, 2, 3, 4, 5].map((_, i) => <ReadingBook key={i} />)
          : null}
      </div>
    </div>
  );
}

function Review() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row mb-[12px] gap-2 md:gap-0">
        <h2 className="text-[18px] md:text-[20px] font-[400]">نام کتاب: </h2>
        <h2 className="text-[18px] md:text-[20px] font-semibold text-[#2663CD]">
          در مسیر رودخانه
        </h2>
      </div>
      <div className="flex flex-col gap-[22px] px-4 md:px-[25px] py-[30px] shadow-md bg-blue-300 border-[2px] border-[#000000]/21 rounded-[25px]">
        <div className="flex flex-col md:flex-row gap-[25px]">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="w-[70px] h-[70px] md:w-[83px] md:h-[83px] rounded-full overflow-hidden">
              <img
                src={"/images/user_none.png"}
                alt="user"
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <Rating dir="ltr" defaultValue={4.5} precision={0.1} readOnly size="small" />
            <span className="text-[14px] md:text-[16px] font-[700]">نام کاربری</span>

            <button className="btn !py-[5px] !px-[10px] !text-[12px] md:!text-[14px] !font-[400]">
              <span className="span-btn">مشاهده در صفحه</span>
            </button>
          </div>
          <div className="w-full max-w-[895px] min-h-[180px] p-4 md:p-6 rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#d9f0ff]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
                <h2 className="text-[13px] md:text-[15px] text-[#000000]/70">2 سال پیش</h2>
                <h2 className="text-[13px] md:text-[15px]">
                  آخرین چپتر خوانده شده:
                  <span className="font-bold text-blue-700 cursor-pointer">
                    پس از عبور
                  </span>
                </h2>
              </div>
              <h1 className="font-bold text-lg md:text-xl">شروع و پایان داستان</h1>
              <div className="text-[14px] md:text-[16px] font-[300] my-auto">
                این نقد جهت تست است این نقد جهت تست است این نقد جهت تست است این
                نقد جهت تست است این نقد جهت تست است این نقد جهت تست است این نقد
                جهت تست است این نقد جهت تست است
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-42">
          <div className="flex gap-[25px]">
            <div className="flex items-center gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">2</span>
              <AiFillDislike color="red" size={20} className="md:size-[25px]" />
            </div>
            <div className="flex items-center gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">3</span>
              <AiFillLike color="blue" size={20} className="md:size-[25px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comment({ isClickedReplies }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex mb-[6px] gap-[5px]">
          <h2 className="text-[18px] md:text-[20px] font-[400]">نام کتاب: </h2>
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر رودخانه
          </h2>
        </div>
        <div className="flex mb-[12px] gap-[5px] mx-auto">
          <h2 className="text-[18px] md:text-[20px] font-[400]">فصل nام: </h2>
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر بازگشت
          </h2>
        </div>
      </div>
      <div
        className={`flex flex-col gap-[22px] ${!isClickedReplies ? "px-4 md:px-[25px]" : "pr-[55px] pl-[30px]"} py-[30px] bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px] ${isClickedReplies ? "rounded-bl-[0px]" : ""}`}
      >
        <div
          className={`${!isClickedReplies ? "gap-[15px] md:gap-[30px]" : "gap-[30px] md:gap-[60px]"} flex flex-col md:flex-row`}
        >
          <div className={`flex flex-col items-center gap-[16px] relative`}>
            <img
              className="min-w-[70px] max-w-[70px] max-h-[70px] min-h-[70px] md:min-w-[83px] md:max-w-[83px] md:max-h-[83px] md:min-h-[83px] rounded-full"
              src={"/images/user_none.png"}
              alt="commentimage"
            />
            <span className="text-[14px] md:text-[16px] font-[400]">نام کاربری</span>
            {!isClickedReplies ? (
              <button className="btn !py-[5px] !px-[10px] !text-[12px] md:!text-[14px] !font-[400]">
                <span className="span-btn">مشاهده در صفحه</span>
              </button>
            ) : null}
          </div>
          <div className="flex flex-col gap-[22px] w-full md:w-[920px]">
            <div
              className={`p-4 md:p-6 ${!isClickedReplies ? "min-h-[150px] md:min-h-[200px]" : ""} rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]`}
            >
              <h2 className="text-[13px] md:text-[15px] text-[#000000]/70 font-[300] mb-[10px] md:mb-[15px]">
                2 سال پیش
              </h2>
              این کامنت صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت
              صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت صرفا جهت تست
              است این کامنت صرفا جهت تست است
            </div>
          </div>
        </div>
        <div className={`${!isClickedReplies ? "mr-[100px] md:mr-[210px]" : "mr-[100px] md:mr-[190px]"}`}>
          <LikeAndDislike />
        </div>
      </div>
      {isClickedReplies ? (
        <div className="relative flex flex-col mr-[100px] md:mr-[200px] mt-[-2px] border-[2px] border-t-0 border-[#000000]/21 rounded-b-[25px] bg-[#A4C0ED]">
          {isClickedReplies ? (
            <div className="bg-[#A4C0ED] h-[25px] w-[25px] absolute right-[-25px]">
              <div className="bg-[#fff] rounded-tl-[25px] w-[25px] h-[25px] border-[2px] border-b-0 border-r-0 border-[#000000]/42"></div>
            </div>
          ) : null}

          <Reply />
        </div>
      ) : null}
    </div>
  );
}

function Reply() {
  return (
    <div className="flex flex-col gap-[15px] md:gap-[25px] px-4 md:px-[30px] py-[15px] md:py-[25px] bg-[#A4C0ED] rounded-b-[23px]">
      <div className="flex flex-col md:flex-row gap-[15px] md:gap-[30px]">
        <div className="flex flex-col items-center gap-[9px] relative">
          <img
            className="min-w-[70px] max-w-[70px] max-h-[70px] min-h-[70px] md:min-w-[83px] md:max-w-[83px] md:max-h-[83px] md:min-h-[83px] rounded-full"
            src="/images/user_none.png"
            alt="commentimage"
          />
          <span className="text-[14px] md:text-[16px] font-[400] mb-[7px]">نام کاربری</span>
          <button className="btn !py-[5px] !px-[10px] !text-[12px] md:!text-[14px] !font-[400]">
            <span className="span-btn">مشاهده در صفحه</span>
          </button>
        </div>
        <div className="p-4 md:p-6 min-h-[100px] md:min-h-[120px] w-full md:w-[715px] rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]">
          <h2 className="text-[13px] md:text-[15px] text-[#000000]/70 font-[300] mb-[10px] md:mb-[15px]">
            2 سال پیش
          </h2>
          این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای
          صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست
          است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است
        </div>
      </div>
      <div className="mr-[100px] md:mr-[210px]">
        <LikeAndDislike />
      </div>
    </div>
  );
}

function LikeAndDislike() {
  return (
    <div className="flex gap-[15px] md:gap-[25px]">
      <div className="flex">
        <span>2</span>
        <div className={`h-fit w-fit cursor-pointer`}>
          <AiFillDislike
            color="red"
            size={20}
            className="md:size-[25px] pointer-events-none"
          />
        </div>
      </div>
      <div className="flex">
        <div className="h-fit w-fit cursor-pointer">
          <AiFillLike color="blue" size={20} className="md:size-[25px] pointer-events-none" />
        </div>
        <span>3</span>
      </div>
    </div>
  );
}

function ReadingBook() {
  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col md:flex-row py-4 md:py-[26px] pr-4 md:pr-[26px] pl-4 md:pl-[41px] bg-[#a4c0ed] rounded-[25px] items-center border-[2px] border-[#000000]/8 justify-between gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-0">
          <img
            className="shadow-lg shadow-[#000000]/25 rounded-[20px] w-[120px] h-[150px] md:w-[153px] md:h-[189px]"
            src="/src/assets/images/book_sample1.png"
            alt="book"
          ></img>
          <div className="flex flex-col mr-0 md:mr-[26px] mt-0 md:mt-[27px] items-center md:items-start">
            <h6 className="text-xl md:text-[26px] font-[400] mb-[5px]">نام کتاب</h6>
            <h4 className="mb-[5px] text-[16px] md:text-[18px] font-[400]">نام نویسنده</h4>
            <Rating
              size="small"
              style={{ direction: "ltr" }}
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <div className="w-[200px] md:w-[480px] h-[15px] md:h-[21px] bg-[#ffffff] rounded-[30px] shadow-lg shadow-[#000000]/25">
            <div className="w-[83%] h-[100%] bg-[#26A541] rounded-[30px] shadow-lg shadow-[#000000]/25"></div>
          </div>
          <h4 className="text-[14px] md:text-[16px] font-[400] mr-3">83%</h4>
        </div>
        <button className="btn !rounded-[10px] !mx-0 !mb-0 !w-fit !h-fit py-[6px] md:py-[9px] px-[20px] md:px-[32px]">
          <span className="span-btn text-[14px] md:text-[16px] font-[400]">ادامه دادن</span>
        </button>
      </div>
    </div>
  );
}
