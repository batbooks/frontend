import CommentIcon from "@mui/icons-material/Comment";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Swal from "sweetalert2";

export default function UserDashboard() {
  const [menuNum, setMenuNum] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://www.batbooks.ir/book/all/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      } finally {
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-[40px] w-full items-center md:items-start">
      {/* Sidebar - Adjusted for medium screens */}
      <div className="sticky flex flex-row md:flex-col justify-center items-center overflow-x-auto md:overflow-x-visible h-fit bg-[#a4c0ed] min-w-full md:min-w-[200px] lg:min-w-[250px] p-3 md:pt-[15px] md:pb-[18px] md:px-3 gap-4 md:gap-[15px] lg:gap-[20px] outline-2 outline-[#000]/21 rounded-md shadow-md mx-auto">
        <button
          onClick={() => setMenuNum(1)}
          className={`group btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[8px] lg:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 1
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <ReviewsIcon className="relative text-lg md:text-xl" />
          <span className="hidden group-hover:inline md:inline span-btn !text-sm md:!text-[15px] lg:!text-[16px] !ml-auto transition-opacity duration-200">
            تاریخچه نقد کتاب ها
          </span>
        </button>

        <button
          onClick={() => setMenuNum(2)}
          className={`group btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[8px] lg:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 2
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <CommentIcon
            sx={{ transform: "scaleX(-1)" }}
            className="relative text-lg md:text-xl"
          />
          <span className="hidden group-hover:inline md:inline span-btn !text-sm md:!text-[15px] lg:!text-[16px] !ml-auto transition-opacity duration-200">
            تاریخچه نظرات فصل ها
          </span>
        </button>

        <button
          onClick={() => setMenuNum(4)}
          className={`group btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[8px] lg:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 4
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <AutoStoriesIcon className="relative text-lg md:text-xl" />
          <span className="hidden group-hover:inline md:inline span-btn !text-sm md:!text-[15px] lg:!text-[16px] !ml-auto transition-opacity duration-200">
            کتاب های در حال خواندن
          </span>
        </button>
      </div>

      {/* Main Content - Adjusted for medium screens */}
      <div className="flex flex-col gap-6 md:gap-6 lg:gap-[35px] w-full">
        {menuNum === 1 && [1, 2].map((_, i) => <Review key={i} />)}
        {menuNum === 2 &&
          [1, 2].map((_, i) => <Comment isClickedReplies={_ === 1} key={i} />)}
        {menuNum === 4 &&
          [1, 2, 3, 4, 5].map((_, i) => <ReadingBook key={i} />)}
      </div>
    </div>
  );
}

function Review() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row mb-3 md:mb-3 lg:mb-[12px]">
        <h2 className="text-lg md:text-[19px] lg:text-[20px] font-normal">
          نام کتاب:{" "}
        </h2>
        <h2 className="text-lg md:text-[19px] lg:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
          در مسیر رودخانه
        </h2>
      </div>
      <div className="flex flex-col gap-4 md:gap-4 lg:gap-[22px] px-4 md:px-5 lg:px-[25px] py-6 md:py-6 lg:py-[30px] shadow-md bg-blue-300 border-2 border-[#000000]/21 rounded-xl lg:rounded-[25px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-4 lg:gap-[25px]">
          <div className="flex flex-col items-center gap-3 md:gap-3 lg:gap-[16px]">
            <div className="w-16 h-16 md:w-18 md:h-18 lg:w-[83px] lg:h-[83px] rounded-full overflow-hidden">
              <img
                src={"/images/user_none.png"}
                alt="user"
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <Rating
              dir="ltr"
              defaultValue={4.5}
              precision={0.1}
              readOnly
              size="medium"
            />
            <span className="text-base md:text-[15px] lg:text-[16px] font-bold">
              نام کاربری
            </span>

            <button className="btn !py-1 md:!py-[4px] lg:!py-[5px] !px-2 md:!px-[8px] lg:!px-[10px] !text-xs md:!text-[13px] lg:!text-[14px] !font-normal">
              <span className="span-btn">مشاهده در صفحه</span>
            </button>
          </div>
          <div className="min-h-[180px] p-4 md:p-5 lg:p-6 rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm shadow-black/21 bg-[#d9f0ff]">
            <div className="flex flex-col gap-2 md:gap-2 lg:gap-[10px]">
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-[300px] lg:gap-[500px]">
                <h2 className="text-sm md:text-[14px] lg:text-[15px] text-[#000000]/70">
                  2 سال پیش
                </h2>
                <h2 className="text-sm md:text-[14px] lg:text-base">
                  آخرین چپتر خوانده شده:
                  <span className="font-bold text-blue-700 cursor-pointer">
                    پس از عبور
                  </span>
                </h2>
              </div>
              <h1 className="font-bold text-lg md:text-[19px] lg:text-xl">
                شروع و پایان داستان
              </h1>
              <div className="text-sm md:text-[14px] lg:text-[16px] font-light my-auto">
                این نقد جهت تست است این نقد جهت تست است این نقد جهت تست است این
                نقد جهت تست است این نقد جهت تست است این نقد جهت تست است این نقد
                جهت تست است این نقد جهت تست است
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-42">
          <div className="flex gap-4 md:gap-4 lg:gap-[25px]">
            <div className="flex items-center gap-0.5 md:gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">2</span>
              <AiFillDislike color="red" size={20} className="md:w-5 md:h-5" />
            </div>
            <div className="flex items-center gap-0.5 md:gap-[2px] cursor-pointer">
              <span className="inline-block min-w-[15px] text-center">3</span>
              <AiFillLike color="blue" size={20} className="md:w-5 md:h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comment({ isClickedReplies }) {
  return (
    <div className="flex flex-col w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
      {/* Top Info */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex mb-2 gap-1 md:gap-[4px] lg:gap-[5px]">
          <h2 className="text-lg md:text-[19px] lg:text-[20px] font-normal">
            نام کتاب:{" "}
          </h2>
          <h2 className="text-lg md:text-[19px] lg:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر رودخانه
          </h2>
        </div>
        <div className="flex mb-3 gap-1 md:gap-[4px] lg:gap-[5px]">
          <h2 className="text-lg md:text-[19px] lg:text-[20px] font-normal">
            فصل nام:{" "}
          </h2>
          <h2 className="text-lg md:text-[19px] lg:text-[20px] font-semibold text-[#2663CD] cursor-pointer">
            در مسیر بازگشت
          </h2>
        </div>
      </div>

      {/* Comment Card */}
      <div
        className={`flex flex-col gap-4 py-6 px-4 md:px-5 lg:px-[25px] bg-[#A4C0ED] border-2 border-[#000000]/21 rounded-xl lg:rounded-[25px] ${isClickedReplies ? "rounded-b-none" : ""}`}
      >
        <div
          className={`flex flex-col md:flex-row ${isClickedReplies ? "gap-10 lg:gap-[60px]" : "gap-5 lg:gap-[30px]"}`}
        >
          <div className="flex flex-col items-center gap-3">
            <img
              className="w-16 h-16 lg:w-[83px] lg:h-[83px] rounded-full"
              src="/images/user_none.png"
              alt="user"
            />
            <span className="text-base md:text-[15px] lg:text-[16px] font-normal">
              نام کاربری
            </span>
            {!isClickedReplies && (
              <button className="btn !py-1 md:!py-[4px] lg:!py-[5px] !px-2 md:!px-[8px] lg:!px-[10px] !text-xs md:!text-[13px] lg:!text-[14px] !font-normal">
                <span className="span-btn">مشاهده در صفحه</span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4 lg:gap-[22px] flex-grow">
            <div
              className={`p-4 md:p-5 lg:p-6 rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm bg-[#E0F2F1] ${!isClickedReplies ? "min-h-[180px]" : ""}`}
            >
              <h2 className="text-sm md:text-[14px] lg:text-[15px] text-[#000000]/70 font-light mb-3">
                2 سال پیش
              </h2>
              این کامنت صرفا جهت تست است این کامنت صرفا جهت تست است این کامنت
              صرفا جهت تست است ...
            </div>
          </div>
        </div>

        {/* Like/Dislike */}
        <div className="self-end mt-1">
          <LikeAndDislike />
        </div>
      </div>

      {/* Reply Section */}
      {isClickedReplies && (
        <div className="flex flex-col -mt-[2px] border-2 border-t-0 border-[#000000]/21 rounded-b-xl lg:rounded-b-[25px] bg-[#A4C0ED]">
          <Reply />
        </div>
      )}
    </div>
  );
}

function Reply() {
  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-[25px] px-4 md:px-5 lg:px-[30px] py-4 md:py-5 lg:py-[25px] bg-[#A4C0ED] rounded-b-xl lg:rounded-b-[23px]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 lg:gap-[30px]">
        <div className="flex flex-col items-center gap-2 md:gap-2 lg:gap-[9px] relative">
          <img
            className="min-w-16 md:min-w-18 lg:min-w-[83px] max-w-16 md:max-w-18 lg:max-w-[83px] max-h-16 md:max-h-18 lg:max-h-[83px] min-h-16 md:min-h-18 lg:min-h-[83px] rounded-full"
            src="/images/user_none.png"
            alt="commentimage"
          />
          <span className="text-base md:text-[15px] lg:text-[16px] font-normal mb-1 md:mb-1 lg:mb-[7px]">
            نام کاربری
          </span>
          <button className="btn !py-1 md:!py-[4px] lg:!py-[5px] !px-2 md:!px-[8px] lg:!px-[10px] !text-xs md:!text-[13px] lg:!text-[14px] !font-normal">
            <span className="span-btn">مشاهده در صفحه</span>
          </button>
        </div>
        <div className="p-4 md:p-5 lg:p-6 min-h-[110px] md:min-h-[120px] rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm shadow-black/21 bg-[#E0F2F1]">
          <h2 className="text-sm md:text-[14px] lg:text-[15px] text-[#000000]/70 font-light mb-3 md:mb-3 lg:mb-[15px]">
            2 سال پیش
          </h2>
          این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای
          صرفا جهت تست است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست
          است این ریپلای صرفا جهت تست است این ریپلای صرفا جهت تست است
        </div>
      </div>
      <div className="mr-16 md:mr-24 lg:mr-[210px]">
        <LikeAndDislike />
      </div>
    </div>
  );
}

function LikeAndDislike() {
  return (
    <div className="flex gap-4 md:gap-5 lg:gap-[25px]">
      <div className="flex">
        <span>2</span>
        <div className={`h-fit w-fit cursor-pointer`}>
          <AiFillDislike
            color="red"
            size={20}
            className="md:w-5 md:h-5 pointer-events-none"
          />
        </div>
      </div>
      <div className="flex">
        <div className="h-fit w-fit cursor-pointer">
          <AiFillLike
            color="blue"
            size={20}
            className="md:w-5 md:h-5 pointer-events-none"
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
      <div className="flex flex-col md:flex-row py-4 md:py-5 lg:py-[26px] pr-4 md:pr-5 lg:pr-[26px] pl-6 md:pl-7 lg:pl-[41px] bg-[#a4c0ed] rounded-xl lg:rounded-[25px] items-center border-2 border-[#000000]/8 justify-between">
        <div className="flex flex-col md:flex-row items-center">
          <img
            className="shadow-lg shadow-[#000000]/25 rounded-xl lg:rounded-[20px] w-32 md:w-36 lg:w-[153px] h-40 md:h-44 lg:h-[189px]"
            src="/src/assets/images/book_sample1.png"
            alt="book"
          ></img>
          <div className="flex flex-col mr-4 md:mr-5 lg:mr-[26px] mt-4 md:mt-5 lg:mt-[27px] text-center md:text-right">
            <h6 className="text-xl md:text-[22px] lg:text-[26px] font-normal mb-1 md:mb-1 lg:mb-[5px]">
              نام کتاب
            </h6>
            <h4 className="mb-1 md:mb-1 lg:mb-[5px] text-base md:text-[17px] lg:text-[18px] font-normal">
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
          <div className="w-64 md:w-80 lg:w-[480px] h-4 md:h-[18px] lg:h-[21px] bg-white rounded-full shadow-lg shadow-[#000000]/25">
            <div className="w-[83%] h-full bg-[#26A541] rounded-full shadow-lg shadow-[#000000]/25"></div>
          </div>
          <h4 className="text-sm md:text-[15px] lg:text-[16px] font-normal mr-0 md:mr-2 lg:mr-3 mt-2 md:mt-0">
            83%
          </h4>
        </div>
        <button className="btn !rounded-lg lg:!rounded-[10px] !mx-0 !mb-0 !w-fit !h-fit py-2 md:py-[8px] lg:py-[9px] px-6 md:px-7 lg:px-[32px] mt-4 md:mt-0">
          <span className="span-btn text-sm md:text-[15px] lg:text-[16px] font-normal">
            ادامه دادن
          </span>
        </button>
      </div>
    </div>
  );
}
