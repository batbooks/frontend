import React, { useState } from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { useLocation, useNavigate } from "react-router";

const EditChapter = ({ id = 1 }) => {
  let navigate = useNavigate();
  const [chapterMode, setChapterMode] = useState(0);

  return (
    <>
      <Navbar />
      <div className="text-center bg-[#A4C0ED] m-auto px-[150px] my-[88px] mx-[180px] border-[2px] border-[#000000]/31 pt-[57px] rounded-[30px] shadow-lg shadow-[#000000]/25">
        <div className="relative flex justify-center">
          <button
            onClick={() => {
              setChapterMode(1);
              navigate(`/createChapter/${id}`, {
                state: { id: { id } },
                chapterMode: { chapterMode },
              });
            }}
            className="absolute right-0 flex gap-[10px] justify-center mx-auto bg-[#2663CD] py-[7px] px-[23px] rounded-full text-[16px] font-medium text-white mb-[54px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          >
            <img src="/src/assets/images/add_sign.svg" alt="add" />
            اضافه کردن فصل جدید
          </button>
          <span className=" font-bold text-[32px] text-[#265073]">
            نام کتاب : هری پاتر
          </span>
        </div>
        <div className="py-[47px]">
          <table className="rounded-[10px] min-w-full text-center text-sm bg-white shadow-lg shadow-[#000000]/31">
            <thead className="bg-[#2663cd]/90 rounded-[10px]">
              <tr className="rounded-[30px]">
                <th className="px-[12px] py-[18px] text-[12px] text-white font-semibold rounded-tl-[10px]">
                  ویرایش فصل
                </th>
                <th className="text-center px-[12px] py-[18px] text-[12px] text-white font-semibold w-[139px]  border-l-[2px] border-[#B9B9B9]">
                  آخرین ویرایش
                </th>
                <th className="px-[12px] py-[18px] text-[12px] text-white font-semibold w-[139px] text-center border-l-[2px] border-[#B9B9B9]">
                  تعداد صفحات
                </th>
                <th className="px-[12px] py-[18px] text-[12px] text-white font-semibold text-right border-l-[2px] border-[#B9B9B9]">
                  نام فصل
                </th>
                <th className="px-[12px] py-[18px] text-[12px] text-white font-semibold w-[90px] text-center border-l-[2px] border-[#B9B9B9] rounded-tr-[10px]">
                  شماره فصل
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                <Chapter
                  chapterNum={i}
                  chapterName={`تست ${i}`}
                  chapterPages={`${5 * i + 85}  صفحه`}
                  chapterEditedIn={"6 سال پیش"}
                  key={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

function Chapter({ chapterNum, chapterName, chapterEditedIn, chapterPages }) {
  return (
    <tr>
      <td className=" py-[7px] px-[23px] w-[139px] border-t-[2px] border-[#B9B9B9]">
        <button
          onClick={() => {
            setChapterMode(0);
            navigate(`/createChapter/${id}`, {
              state: { id: { id } },
              chapterMode: { chapterMode },
            });
          }}
          className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
        >
          ویرایش
        </button>
      </td>
      <td
        dir="rtl"
        className=" text-center px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
      >
        {chapterEditedIn}
      </td>
      <td
        dir="rtl"
        className=" text-center px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
      >
        {chapterPages}
      </td>
      <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
        {chapterName}
      </td>
      <td className=" text-center px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
        {chapterNum}
      </td>
    </tr>
  );
}

export default EditChapter;
