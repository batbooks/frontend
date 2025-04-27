import React from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import Card from "../../common/forum/Card"
const Threads = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <h1 className="text-center text-[#265073] font-bold text-3xl mt-[14px]">
          تالار گفتگو
        </h1>
        <div className="mx-auto w-full max-w-sm min-w-[700px] mt-20 ">
          <div  className="relative flex flex-row-reverse ">
            <input
              className=" text-right w-full bg-white placeholder:text-[#265073] text-[#265073] text-sm border border-slate-200 rounded-3xl pr-3 pl-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="نام کتاب ، نام تالار ، نام نویسنده"
            />
            <button
              className="absolute top-1 left-1 flex items-center rounded-3xl bg-[#2663CD] py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
                جستجوی گفتگو
            </button>
          </div>
        </div>
        <div>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Threads;
