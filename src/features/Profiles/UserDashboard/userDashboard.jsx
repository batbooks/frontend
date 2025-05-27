import CommentIcon from "@mui/icons-material/Comment";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Rating } from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

export default function UserDashboard() {
  const [menuNum, setMenuNum] = useState(1);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[40px] w-full">
      <div className="sticky flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible h-fit bg-[#a4c0ed] min-w-full md:min-w-[250px] md:max-w-[250px] p-3 md:pt-[15px] md:pb-[18px] md:px-3 gap-3 md:gap-[12px] outline-2 outline-[#000]/21 rounded-md shadow-md">
        <button
          onClick={() => {
            setMenuNum(1);
          }}
          className={`btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 1
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <ReviewsIcon className="relative" />
          <span className="span-btn !text-sm md:!text-[16px] !ml-auto">
            تاریخچه نقد کتاب ها
          </span>
        </button>
        <button
          onClick={() => {
            setMenuNum(2);
          }}
          className={`btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 2
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <CommentIcon sx={{ transform: "scaleX(-1)" }} className="relative" />
          <span className="span-btn !text-sm md:!text-[16px] !ml-auto">
            تاریخچه نظرات فصل ها
          </span>
        </button>
        <button
          onClick={() => {
            setMenuNum(4);
          }}
          className={`btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 4
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <AutoStoriesIcon className="relative" />
          <span className="span-btn !text-sm md:!text-[16px] !ml-auto">
            کتاب های در حال خواندن
          </span>
        </button>
        <button className="btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 !bg-red-700 before:!bg-[#FF3B30]">
          <LogoutIcon className="relative" />
          <span className="span-btn !text-sm md:!text-[16px] !ml-auto">
            خروج از حساب کاربری
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-[35px] w-full">
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
      <div className="flex flex-col md:flex-row mb-3 md:mb-[12px]">
        <h2 className="text-lg md:text-[20px] font-normal">نام کتاب: </h2>
        <h2 className="text-lg md:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
          در مسیر رودخانه
        </h2>
      </div>
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-[22px] px-4 md:px-6 lg:px-[25px] py-6 md:py-8 lg:py-[30px] shadow-md bg-blue-300 border-2 border-[#000000]/21 rounded-xl lg:rounded-[25px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 lg:gap-[25px]">
          <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-[16px]">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-[83px] lg:h-[83px] rounded-full overflow-hidden">
              <img
                src={"/images/user_none.png"}
                alt="user"
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <Rating dir="ltr" defaultValue={4.5} precision={0.1} readOnly />
            <span className="text-base md:text-lg lg:text-[16px] font-bold">نام کاربری</span>

            <button className="btn !py-1 md:!py-[5px] !px-2 md:!px-[10px] !text-xs md:!text-sm lg:!text-[14px] !font-normal">
              <span className="span-btn">مشاهده در صفحه</span>
            </button>
          </div>
          <div className="min-h-[180px] p-4 md:p-6 rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm shadow-black/21 bg-[#d9f0ff]">
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-[10px]">
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-[500px]">
                <h2 className="text-sm md:text-base lg:text-[15px] text-[#000000]/70">2 سال پیش</h2>
                <h2 className="text-sm md:text-base">
                  آخرین چپتر خوانده شده:
                  <span className="font-bold text-blue-700 cursor-pointer">
                    پس از عبور
                  </span>
                </h2>
              </div>
              <h1 className="font-bold text-lg md:text-xl">شروع و پایان داستان</h1>
              <div className="text-sm md:text-base lg:text-[16px] font-light my-auto">
                این نقد جهت تست است این نقد جهت تست است این نقد جهت تست است این
                نقد جهت تست است این نقد جهت تست است این نقد جهت تست است این نقد
                جهت تست است این نقد جهت تست است
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-42">
          <div className="flex gap-4 md:gap-5 lg:gap-[25px]">
            <div className="flex items-center gap-0.5 md:gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">2</span>
              <AiFillDislike color="red" size={20} md:size={25} />
            </div>
            <div className="flex items-center gap-0.5 md:gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">3</span>
              <AiFillLike color="blue" size={20} md:size={25} />
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
        <div className="flex mb-2 md:mb-[6px] gap-1 md:gap-[5px]">
          <h2 className="text-lg md:text-[20px] font-normal">نام کتاب: </h2>
          <h2 className="text-lg md:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر رودخانه
          </h2>
        </div>
        <div className="flex mb-3 md:mb-[12px] gap-1 md:gap-[5px] mx-auto">
          <h2 className="text-lg md:text-[20px] font-normal">فصل nام: </h2>
          <h2 className="text-lg md:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر بازگشت
          </h2>
        </div>
      </div>
      <div
        className={`flex flex-col gap-4 md:gap-5 lg:gap-[22px] ${
          !isClickedReplies ? "px-4 md:px-6 lg:px-[25px]" : "pr-8 md:pr-12 lg:pr-[55px] pl-4 md:pl-6 lg:pl-[30px]"
        } py-6 md:py-8 lg:py-[30px] bg-[#A4C0ED] border-2 border-[#000000]/21 rounded-xl lg:rounded-[25px] ${
          isClickedReplies ? "rounded-bl-none" : ""
        }`}
      >
        <div
          className={`${
            !isClickedReplies ? "gap-4 md:gap-6 lg:gap-[30px]" : "gap-8 md:gap-12 lg:gap-[60px]"
          } flex flex-col md:flex-row`}
        >
          <div className={`flex flex-col items-center gap-3 md:gap-4 lg:gap-[16px] relative`}>
            <img
              className="min-w-16 md:min-w-20 lg:min-w-[83px] max-w-16 md:max-w-20 lg:max-w-[83px] max-h-16 md:max-h-20 lg:max-h-[83px] min-h-16 md:min-h-20 lg:min-h-[83px] rounded-full"
              src={"/images/user_none.png"}
              alt="commentimage"
            />
            <span className="text-base md:text-lg lg:text-[16px] font-normal">نام کاربری</span>
            {!isClickedReplies ? (
              <button className="btn !py-1 md:!py-[5px] !px-2 md:!px-[10px] !text-xs md:!text-sm lg:!text-[14px] !font-normal">
                <span className="span-btn">مشاهده در صفحه</span>
              </button>
            ) : null}
          </div>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-[22px]">
            <div
              className={`p-4 md:p-6 ${
                !isClickedReplies ? "min-h-[200px]" : ""
              } rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm shadow-black/21 bg-[#E0F2F1]`}
            >
              <h2 className="text-sm md:text-base lg:text-[15px] text-[#000000]/70 font-light mb-3 md:mb-4 lg:mb-[15px]">
                2 سال پیش
              </h2>
              این کامنت صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت
              صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت صرفا جهت تست
              است این کامنت صرفا جهت تست است
            </div>
          </div>
        </div>
        <div className={`${!isClickedReplies ? "mr-16 md:mr-32 lg:mr-[210px]" : "mr-12 md:mr-24 lg:mr-[190px]"}`}>
          <LikeAndDislike />
        </div>
      </div>
      {isClickedReplies ? (
        <div className="relative flex flex-col mr-16 md:mr-32 lg:mr-[200px] mt-[-2px] border-2 border-t-0 border-[#000000]/21 rounded-b-xl lg:rounded-b-[25px] bg-[#A4C0ED]">
          {isClickedReplies ? (
            <div className="bg-[#A4C0ED] h-6 lg:h-[25px] w-6 lg:w-[25px] absolute right-[-24px] lg:right-[-25px]">
              <div className="bg-white rounded-tl-xl lg:rounded-tl-[25px] w-6 lg:w-[25px] h-6 lg:h-[25px] border-2 border-b-0 border-r-0 border-[#000000]/42"></div>
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
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-[25px] px-4 md:px-6 lg:px-[30px] py-4 md:py-6 lg:py-[25px] bg-[#A4C0ED] rounded-b-xl lg:rounded-b-[23px]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-[30px]">
        <div className="flex flex-col items-center gap-2 md:gap-3 lg:gap-[9px] relative">
          <img
            className="min-w-16 md:min-w-20 lg:min-w-[83px] max-w-16 md:max-w-20 lg:max-w-[83px] max-h-16 md:max-h-20 lg:max-h-[83px] min-h-16 md:min-h-20 lg:min-h-[83px] rounded-full"
            src="/images/user_none.png"
            alt="commentimage"
          />
          <span className="text-base md:text-lg lg:text-[16px] font-normal mb-1 md:mb-2 lg:mb-[7px]">
            نام کاربری
          </span>
          <button className="btn !py-1 md:!py-[5px] !px-2 md:!px-[10px] !text-xs md:!text-sm lg:!text-[14px] !font-normal">
            <span className="span-btn">مشاهده در صفحه</span>
          </button>
        </div>
        <div className="p-4 md:p-6 min-h-[120px] rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm shadow-black/21 bg-[#E0F2F1]">
          <h2 className="text-sm md:text-base lg:text-[15px] text-[#000000]/70 font-light mb-3 md:mb-4 lg:mb-[15px]">
            2 سال پیش
          </h2>
          این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای
          صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست
          است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است
        </div>
      </div>
      <div className="mr-16 md:mr-32 lg:mr-[210px]">
        <LikeAndDislike />
      </div>
    </div>
  );
}

function LikeAndDislike() {
  return (
    <div className="flex gap-4 md:gap-6 lg:gap-[25px]">
      <div className="flex">
        <span>2</span>
        <div className={`h-fit w-fit cursor-pointer`}>
          <AiFillDislike
            color="red"
            size={20}
            md:size={25}
            className="pointer-events-none"
          />
        </div>
      </div>
      <div className="flex">
        <div className="h-fit w-fit cursor-pointer">
          <AiFillLike
            color="blue"
            size={20}
            md:size={25}
            className="pointer-events-none"
          />
        </div>
        <span>3</span>
      </div>
    </div>
  );
}

function ReadingBook() {
  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col md:flex-row py-4 md:py-6 lg:py-[26px] pr-4 md:pr-6 lg:pr-[26px] pl-6 md:pl-8 lg:pl-[41px] bg-[#a4c0ed] rounded-xl lg:rounded-[25px] items-center border-2 border-[#000000]/8 justify-between">
        <div className="flex flex-col md:flex-row items-center">
          <img
            className="shadow-lg shadow-[#000000]/25 rounded-xl lg:rounded-[20px] w-32 md:w-40 lg:w-[153px] h-40 md:h-48 lg:h-[189px]"
            src="/src/assets/images/book_sample1.png"
            alt="book"
          ></img>
          <div className="flex flex-col mr-4 md:mr-6 lg:mr-[26px] mt-4 md:mt-6 lg:mt-[27px] text-center md:text-right">
            <h6 className="text-xl md:text-2xl lg:text-[26px] font-normal mb-1 md:mb-[5px]">
              نام کتاب
            </h6>
            <h4 className="mb-1 md:mb-[5px] text-base md:text-lg lg:text-[18px] font-normal">
              نام نویسنده
            </h4>
            <Rating
              size="medium"
              style={{ direction: "ltr" }}
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 w-full md:w-auto">
          <div className="w-64 md:w-96 lg:w-[480px] h-4 md:h-5 lg:h-[21px] bg-white rounded-full shadow-lg shadow-[#000000]/25">
            <div className="w-[83%] h-full bg-[#26A541] rounded-full shadow-lg shadow-[#000000]/25"></div>
          </div>
          <h4 className="text-sm md:text-base lg:text-[16px] font-normal mr-0 md:mr-3 mt-2 md:mt-0">
            83%
          </h4>
        </div>
        <button className="btn !rounded-lg lg:!rounded-[10px] !mx-0 !mb-0 !w-fit !h-fit py-2 md:py-[9px] px-6 md:px-8 lg:px-[32px] mt-4 md:mt-0">
          <span className="span-btn text-sm md:text-base lg:text-[16px] font-normal">
            ادامه دادن
          </span>
        </button>
      </div>
    </div>
  );
}