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
    <div className="flex gap-[40px] w-full">
      <div className="sticky flex flex-col h-fit bg-[#a4c0ed] min-w-[250px] max-w-[250px] pt-[15px] pb-[18px] px-[12px] gap-[12px] outline-[2px] outline-[#000]/21 rounded-[5px] shadow-md">
        <button
          onClick={() => {
            setMenuNum(1);
          }}
          className={`btn !mx-0 !rounded-[5px] !mb-0 !w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 ${menuNum !== 1 ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]" : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"}`}
        >
          <ReviewsIcon className="relative" />
          <span className="span-btn !text-[16px] !ml-auto">
            تاریخچه نقد کتاب ها
          </span>
        </button>
        <button
          onClick={() => {
            setMenuNum(2);
          }}
          className={`btn !mx-0 !rounded-[5px] !mb-0 !w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 ${menuNum !== 2 ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]" : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"}`}
        >
          <CommentIcon sx={{ transform: "scaleX(-1)" }} className="relative" />
          <span className="span-btn !text-[16px] !ml-auto">
            تاریخچه نظرات فصل ها
          </span>
        </button>
        <button
          onClick={() => {
            setMenuNum(4);
          }}
          className={`btn !mx-0 !rounded-[5px] !mb-0 !w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 ${menuNum !== 4 ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]" : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"}`}
        >
          <AutoStoriesIcon className="relative" />
          <span className="span-btn !text-[16px] !ml-auto">
            کتاب های در حال خواندن
          </span>
        </button>
        <button className="btn !mx-0 !rounded-[5px] !mb-0 !w-full !h-fit gap-[5px] py-[10px] pr-[5px] pl-[5px] !shadow-none outline-[1px] outline-[#000]/21 !focus:outline-[1px] !focus:outline-[#000]/21 !bg-red-700 before:!bg-[#FF3B30]">
          <LogoutIcon className="relative" />
          <span className="span-btn !text-[16px] !ml-auto">
            خروج از حساب کاربری
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-[35px] w-full">
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
      <div className="flex mb-[12px]">
        <h2 className="text-[20px] font-[400]">نام کتاب: </h2>
        <h2 className="text-[20px] font-semibold text-[#2663CD] cursor-pointer">
          در مسیر رودخانه
        </h2>
      </div>
      <div className=" flex flex-col gap-[22px] px-[25px] py-[30px] shadow-md bg-blue-300 border-[2px] border-[#000000]/21 rounded-[25px]">
        <div className="flex gap-[25px]">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="w-[83px] h-[83px] rounded-full overflow-hidden">
              <img
                src={"/images/user_none.png"}
                alt="user"
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <Rating dir="ltr" defaultValue={4.5} precision={0.1} readOnly />
            <span className="text-[16px] font-[700]">نام کاربری</span>

            <button className="btn  !py-[5px] !px-[10px] !text-[14px] !font-[400]">
              <span className="span-btn">مشاهده در صفحه</span>
            </button>
          </div>
          <div className="min-h-[180px] p-6 rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#d9f0ff]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row gap-[500px]">
                <h2 className="text-[15px] text-[#000000]/70">2 سال پیش</h2>
                <h2>
                  آخرین چپتر خوانده شده:
                  <span className="font-bold text-blue-700 cursor-pointer">
                    پس از عبور
                  </span>
                </h2>
              </div>
              <h1 className="font-bold text-xl">شروع و پایان داستان</h1>
              <div className="text-[16px] font-[300] my-auto">
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
              <AiFillDislike color="red" size={25} />
            </div>
            <div className="flex items-center gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">3</span>
              <AiFillLike color="blue" size={25} />
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
      <div className="flex">
        <div className="flex mb-[6px] gap-[5px]">
          <h2 className="text-[20px] font-[400]">نام کتاب: </h2>
          <h2 className="text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر رودخانه
          </h2>
        </div>
        <div className="flex mb-[12px] gap-[5px] mx-auto">
          <h2 className="text-[20px] font-[400]">فصل nام: </h2>
          <h2 className="text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر بازگشت
          </h2>
        </div>
      </div>
      <div
        className={`flex flex-col gap-[22px] ${!isClickedReplies ? "px-[25px]" : "pr-[55px] pl-[30px]"} py-[30px] bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px] ${isClickedReplies ? "rounded-bl-[0px]" : ""}`}
      >
        <div
          className={`${!isClickedReplies ? "gap-[30px]" : "gap-[60px]"} flex`}
        >
          <div className={`flex flex-col items-center gap-[16px] relative`}>
            <img
              className="min-w-[83px] max-w-[83px] max-h-[83px] min-h-[83px] rounded-full"
              src={"/images/user_none.png"}
              alt="commentimage"
            />
            <span className="text-[16px] font-[400]">نام کاربری</span>
            {!isClickedReplies ? (
              <button className="btn  !py-[5px] !px-[10px] !text-[14px] !font-[400]">
                <span className="span-btn">مشاهده در صفحه</span>
              </button>
            ) : null}
          </div>
          <div className="flex flex-col gap-[22px]">
            <div
              className={`p-6 ${!isClickedReplies ? "min-h-[200px]" : ""} rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]`}
            >
              <h2 className="text-[15px] text-[#000000]/70 font-[300] mb-[15px]">
                2 سال پیش
              </h2>
              این کامنت صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت
              صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت صرفا جهت تست
              است این کامنت صرفا جهت تست است
            </div>
          </div>
        </div>
        <div className={`${!isClickedReplies ? "mr-[210px]" : "mr-[190px]"}`}>
          <LikeAndDislike />
        </div>
      </div>
      {isClickedReplies ? (
        <div className="relative flex flex-col mr-[200px] mt-[-2px] border-[2px] border-t-0 border-[#000000]/21 rounded-b-[25px] bg-[#A4C0ED]">
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
    <div className="flex flex-col gap-[25px] px-[30px] py-[25px] bg-[#A4C0ED] rounded-b-[23px]">
      <div className="flex gap-[30px]">
        <div className="flex flex-col items-center gap-[9px] relative">
          <img
            className="min-w-[83px] max-w-[83px] max-h-[83px] min-h-[83px] rounded-full"
            src="/images/user_none.png"
            alt="commentimage"
          />
          <span className="text-[16px] font-[400] mb-[7px]">نام کاربری</span>
          <button className="btn  !py-[5px] !px-[10px] !text-[14px] !font-[400]">
            <span className="span-btn">مشاهده در صفحه</span>
          </button>
        </div>
        <div className="p-6 min-h-[120px] rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]">
          <h2 className="text-[15px] text-[#000000]/70 font-[300] mb-[15px]">
            2 سال پیش
          </h2>
          این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای
          صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست
          است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است
        </div>
      </div>
      <div className="mr-[210px]">
        <LikeAndDislike />
      </div>
    </div>
  );
}

function LikeAndDislike() {
  return (
    <div className="flex gap-[25px]">
      <div className="flex">
        <span>2</span>
        <div className={`h-fit w-fit cursor-pointer`}>
          <AiFillDislike
            color="red"
            size={25}
            className="pointer-events-none"
          />
        </div>
      </div>
      <div className="flex">
        <div className="h-fit w-fit cursor-pointer">
          <AiFillLike color="blue" size={25} className="pointer-events-none" />
        </div>
        <span>3</span>
      </div>
    </div>
  );
}

function ReadingBook() {
  return (
    <div className="grid grid-cols-1">
      <div className="flex py-[26px] pr-[26px] pl-[41px] bg-[#a4c0ed] rounded-[25px] items-center border-[2px] border-[#000000]/8 justify-between">
        <div className="flex">
          <img
            className="shadow-lg shadow-[#000000]/25 rounded-[20px] w-[153px] h-[189px]"
            src="/src/assets/images/book_sample1.png"
            alt="book"
          ></img>
          <div className="flex flex-col mr-[26px] mt-[27px]">
            <h6 className="text-[26px] font-[400] mb-[5px]">نام کتاب</h6>
            <h4 className="mb-[5px] text-[18px] font-[400]">نام نویسنده</h4>
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
        <div className="flex items-center">
          <div className="w-[480px] h-[21px] bg-[#ffffff] rounded-[30px] shadow-lg shadow-[#000000]/25">
            <div className="w-[83%] h-[100%] bg-[#26A541] rounded-[30px] shadow-lg shadow-[#000000]/25"></div>
          </div>
          <h4 className="text-[16px] font-[400] mr-3">83%</h4>
        </div>
        <button className="btn !rounded-[10px] !mx-0 !mb-0 !w-fit !h-fit py-[9px] px-[32px]">
          <span className="span-btn text-[16px] font-[400]">ادامه دادن</span>
        </button>
      </div>
    </div>
  );
}
