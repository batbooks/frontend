import React from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";

const EditChapter = () => {
  return (
    <>
      <Navbar />
      <div className="text-center bg-[#A4C0ED] m-auto px-[75px] my-[88px] mx-[135px] border-[2px] border-[#000000]/31 pt-[57px] rounded-[30px] shadow-lg shadow-[#000000]/25">
        <span className=" font-bold text-[32px] text-[#265073]">
          نام کتاب : هری پاتر
        </span>
        <div className="pt-[47px] mb-[39px]">
          <table className="min-w-full text-center text-sm bg-white rounded-[5px] border-r-[2px] border-b-[2px] border-[#B9B9B9] shadow-lg shadow-[#000000]/31">
            <thead>
              <tr>
                <th className="px-[12px] py-[18px] text-[12px] font-semibold border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  ویرایش فصل
                </th>
                <th className="px-[12px] py-[18px] text-[12px] font-semibold w-[139px] text-left border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تاریخ آخرین ویرایش
                </th>
                <th className="px-[12px] py-[18px] text-[12px] font-semibold w-[603px] text-right border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  نام فصل
                </th>
                <th className="px-[12px] py-[18px] text-[12px] font-semibold w-[139px] text-right border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  شماره فصل
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" py-[7px] px-[23px] w-[139px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 1
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .1
                </td>
              </tr>
              <tr>
                <td className=" py-[7px] px-[23px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 2
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .2
                </td>
              </tr>
              <tr>
                <td className=" py-[7px] px-[23px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 3
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .3
                </td>
              </tr>
              <tr>
                <td className=" py-[7px] px-[23px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 4
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .4
                </td>
              </tr>
              <tr>
                <td className=" py-[7px] px-[23px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 5
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .5
                </td>
              </tr>
              <tr>
                <td className=" py-[7px] px-[23px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 6
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .6
                </td>
              </tr>
              <tr className=" rounded-b-[5px]">
                <td className=" py-[7px] px-[23px] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  <button className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    ویرایش
                  </button>
                </td>
                <td
                  dir="rtl"
                  className=" text-left px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]"
                >
                  6 سال پیش
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  تست 7
                </td>
                <td className=" text-right px-[12px] py-[18px] text-[12px] font-[300] border-t-[2px] border-l-[2px] border-[#B9B9B9]">
                  .7
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="flex gap-[10px] justify-center mx-auto bg-[#2663CD] py-[7px] px-[23px] rounded-full text-[16px] font-medium text-white mb-[54px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
          <img src="/src/assets/images/add_sign.svg" alt="add" />
          اضافه کردن فصل جدید
        </button>
      </div>
      <Footer />
    </>
  );
};

export default EditChapter;
