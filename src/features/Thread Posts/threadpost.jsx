import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaFlag, FaRegFlag } from "react-icons/fa";
import Navbar from "../../pages/Navbar";
import Footer from "/src/common/Footer/Footer";
import { useEffect, useState } from "react";

export default function ThreadPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([1, 2, 3, 4, 5]);
  }, []);

  return (
    <>
      <Navbar />
      <main dir="rtl" className="p-[60px]">
        <div className="flex flex-col gap-[25px]">
          {posts.map((_, i) => (
            <Post isMine={i === 4 || i === 1} isReply={i === 1 || i === 2} />
          ))}
        </div>
      </main>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
}

function Post({ isMine, isReply }) {
  return (
    <div className="flex items-center p-[20px] bg-[#A4C0ED]/75 outline-[2px] outline-[#000]/40 rounded-[5px]">
      <div className="text-nowrap bg-[#f5f6f8] flex flex-col items-center rounded-[5px] gap-[10px] py-[10px] outline-[2px] outline-[#000]/21 mb-auto">
        <div className="flex w-full pb-[10px] border-b-[1px] border-[#000]/10">
          <img
            src="/images/user_none2.png"
            alt="user"
            className="mx-auto cursor-pointer"
          />
        </div>
        <div className="flex flex-col w-full pb-[10px] border-b-[1px] border-[#000]/10 gap-[10px]">
          <h1 className="text-[16px] font-semibold mx-auto">نام کاربری</h1>
          <button className="btn !py-[5px] !px-[38px] !mb-[0] !mx-auto !text-[14px] before:!bg-[#FF3B30] !bg-[#CC2F26] !shadow-md">
            <span className="span-btn">
              {isMine ? "حذف پست" : "مسدود کردن"}
            </span>
          </button>
          <button className="btn !py-[5px] !px-[38px] !mb-[0] !mx-auto !text-[14px] !font-[400] !shadow-md">
            <span className="span-btn">
              {isMine ? "ویرایش پست" : "دنبال کردن"}
            </span>
          </button>
          {!isMine ? (
            <button className="btn !py-[5px] !px-[38px] !mb-[0] !mx-auto !text-[14px] !font-[400] !shadow-md">
              <span className="span-btn">پاسخ دادن</span>
            </button>
          ) : null}
          <div className="mx-auto flex gap-[10px]">
            <HeartButton />
            <ReportButton />
          </div>
        </div>
        <div className="px-[7px]">
          <span className="text-[14px] font-[400] text-[#000]/50 ml-[30px]">
            ملحق شده در:
          </span>
          <span className="text-[14px] font-[400]">
            2 آبان 1390
            <br />
          </span>
          <span className="text-[14px] font-[400] text-[#000]/50 ml-[87px]">
            تعداد پست ها:
          </span>
          <span className="text-[14px] font-[400]">
            8<br />
          </span>
          <span className="text-[14px] font-[400] text-[#000]/50 ml-[52px]">
            تعداد پسندیده ها:
          </span>
          <span className="text-[14px] font-[400]">
            567
            <br />
          </span>
        </div>
      </div>
      <div className="flex flex-col mb-auto mr-[20px]">
        {isReply ? (
          <div className="bg-white outline-[1px] outline-[#000]/21 divide-y-[1px] divide-[#000]/21 w-[calc(100%-230px)]">
            <div className="w-full p-[10px]">
              <h3 className="text-[14px] font-[400] text-[#000]/50">
                مهدی گفته بود:
              </h3>
            </div>
            <div className="w-full py-[10px] px-[10px]">
              <p className="text-[16px] font-[400] italic">
                این پست جواب داده شده صرفا جهت تست است این پست جواب داده شده
                صرفا جهت تست است این پست جواب داده شده صرفا جهت تست است این پست
                جواب داده شده صرفا جهت تست است این پست جواب داده شده صرفا جهت
                تست است این پست جواب داده شده صرفا جهت تست است این پست جواب داده
                شده صرفا جهت تست است این پست جواب داده شده صرفا جهت تست استاین
                پست جواب داده شده صرفا جهت تست است این پست جواب داده شده صرفا
                جهت تست است این پست جواب داده شده صرفا جهت تست است این پست جواب
                داده شده صرفا جهت تست است
              </p>
            </div>
          </div>
        ) : null}
        {isReply ? (
          <div className="flex">
            <div className="h-[40px] w-[25px] bg-white mt-[23px] -ml-[2px] z-1 border-t-[2px] border-[#000]/21">
              <div className="bg-[#A4C0ED]/74 h-[38px] w-[25px] rounded-tl-[100%_100%] border-t-[2px] border-l-[2px] border-[#000]/5"></div>
            </div>
            <div className="bg-white p-5 mt-[23px] border-[2px] border-[#000]/21 rounded-b-[30px] rounded-tl-[30px] z-0">
              <p>
                این جواب صرفا جهت تست است این جواب صرفا جهت تست است این جواب
                صرفا جهت تست است این جواب صرفا جهت تست است این جواب صرفا جهت تست
                است این جواب صرفا جهت تست است این جواب صرفا جهت تست است
              </p>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="h-[40px] w-[25px] bg-white mt-[1px] -ml-[2px] z-1 border-t-[1.5px] border-[#000]/21">
              <div className="bg-[#A4C0ED]/74 h-[39px] w-[25px] rounded-tl-[100%_100%] border-t-[2px] border-l-[2px] border-[#000]/5"></div>
            </div>
            <div className="bg-white p-5 border-[2px] border-[#000]/21 rounded-b-[30px] rounded-tl-[30px] z-0">
              <p>
                این پست صرفا جهت تست است این پست صرفا جهت تست است این پست صرفا
                جهت تست است این پست صرفا جهت تست است این پست صرفا جهت تست است
                این پست صرفا جهت تست است این پست صرفا جهت تست است این پست صرفا
                جهت تست است این پست صرفا جهت تست است این پست صرفا جهت تست است
                این پست صرفا جهت تست است این پست صرفا جهت تست است این پست صرفا
                جهت تست است این پست صرفا جهت تست است این پست صرفا جهت تست است
                این پست صرفا جهت تست است این پست صرفا جهت تست است این پست صرفا
                جهت تست است این پست صرفا جهت تست است این پست صرفا جهت تست است
                این پست صرفا جهت تست است
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const HeartButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      style={{
        cursor: "pointer",
        fontSize: "24px",
        color: isClicked ? "red" : isHovered ? "red" : "inherit",
        transition: "color 0.2s ease",
      }}
      title={isClicked ? "پسندیده شده" : "پسندیدن"}
    >
      {isClicked || isHovered ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

const ReportButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      style={{
        cursor: "pointer",
        fontSize: "24px",
        color: isClicked ? "orange" : isHovered ? "darkorange" : "inherit",
        transition: "color 0.2s ease",
      }}
      title={isClicked ? "گزارش داده شده" : "گزارش"}
    >
      {isClicked || isHovered ? <FaFlag /> : <FaRegFlag />}
    </button>
  );
};
