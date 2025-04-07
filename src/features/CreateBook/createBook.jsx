import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateBook() {
  const genres = [
    "فانتزی",
    "علمی-تخیلی",
    "رمان(داستانی)",
    "تاریخی",
    "جنایی و کارآگاهی",
    "معمایی",
    "زندگی نامه",
    "توسعه فردی",
    "عاشقانه",
    "کمدی",
    "کمیک",
    "ترسناک",
  ];

  return (
    <div>
      <Navbar />
      <main className="bg-[#A4C0ED] rounded-[30px]">
        <h1>...کتاب خود را بنویسید</h1>
        <div>
          <h3></h3>
          <input
            dir="rtl"
            className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[492px] h-[53px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
          />
        </div>
        <div>
          <h3></h3>
          <input
            dir="rtl"
            className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[492px] h-[53px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
          />
          <span></span>
          <button>انتخاب فایل</button>
        </div>
        <div>
          <h3></h3>
          <input
            dir="rtl"
            placeholder="این کادر را ادیتور آماده قرار میدهیم"
            className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[1020px] h-[211px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
          />
        </div>
        <div className="bg-white w-[503px] h-[321px] rounded-[15px] grid grid-cols-3 grid-rows-4  items-center">
          {genres.map((name) => (
            <button
              key={name}
              className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[124px] h-[36px] rounded-[5.5px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 "
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex flex-row justify-evenly">
          <input
            dir="rtl"
            placeholder="ژانر کتاب"
            className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[386px] h-[43px] rounded-l-[53px] rounded-r-[5px] placeholder:text-right placeholder:mr-[72px]"
          />
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[89px] h-[43px] rounded-l-[5px] rounded-r-[53px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            جستجو
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CreateBook;
