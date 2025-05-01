import React from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import Card from "../../common/forum/Card";
import SearchBar from "../../Searchbar";
const onSearch = () => {
  console.log("searched");
};
const Threads = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <h1 className="text-center text-[#265073] font-bold text-3xl mt-[14px]">
          تالار گفتگو
        </h1>
        <div className="flex items-center justify-center bg-[#D9F0FF] p-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              //onChange={(e)=>setsearched(e.target.value)}
              placeholder="نام کتاب ، نام تالار ، نام نویسنده"
              dir="rtl"
              className="bg-white w-full px-12 py-2 rounded-full border border-gray-300 bg- shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
            {/* Custom Search Icon */}
            <svg
              onClick={onSearch}
              className="absolute left-3 top-2 w-6 h-6 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
            {/* Filter Icon */}
          </div>
        </div>
        {/* <div className="mx-auto w-full max-w-sm min-w-[700px] mt-20 ">
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
        </div> */}
        <h1
            dir="rtl"
            className="mr-21 my-3.5   font-semibold text-xl"
          >
            نتایج جستجو
          </h1>
        <div className="bg-[#a3d5ff] p-[20px] w-[90%] mx-auto rounded-2xl">
          
          {/* <hr className="w-6/7 mx-auto mt-[40px]" /> */}

          <div className="grid grid-cols-2">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Threads;
