import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Otp() {
  return (
    <div className="w-screen h-screen bg-[#D9F0FF]">
      <div className="flex gap-1 items-center ">
        <h2 className="text-[24px] mt-1.5 ml-2 font-bold text-[#002D54]">
          Bat<span className="text-[#2663CD]">Books</span>
        </h2>
      </div>
      <main className="w-[700px] h-[450px] m-auto bg-[#A4C0ED] rounded-[13px] justify-center mt-14 pt-10 relatvie">
        <h2 className="text-[25px] font-bold text-center">
          کد تایید را وارد کنید
        </h2>
        <form className="card flex justify-evenly w-[60%] mx-auto mt-[70px]">
          <input
            type="text"
            id="1"
            className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
            maxLength={1}
          />
          <input
            type="text"
            id="2"
            className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
            maxLength={1}
          />
          <input
            type="text"
            id="3"
            className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
            maxLength={1}
          />
          <input
            type="text"
            id="4"
            className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
            maxLength={1}
          />
          <input
            type="text"
            id="5"
            className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
            maxLength={1}
          />
          <input
            type="text"
            id="6"
            className="bg-white h-[70px] w-[45px] rounded-[5px] text-[45px] text-center"
            maxLength={1}
          />
        </form>
        <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto mt-[50px] flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
          تایید
        </button>
        <img
          src="/src/assets/images/mid-left.png"
          alt="mid-left"
          className=" absolute left-[370px] top-[280px]"
        />
        <img
          src="/src/assets/images/mid-right.png"
          alt="mid-right"
          className="absolute right-[320px] top-[0px]"
        />
      </main>
      <img
        src="/src/assets/images/bottom-left.png"
        alt="bottom-left"
        className="absolute left-0 bottom-0 w-[25vw] aspect-auto"
      />
      <img
        src="/src/assets/images/bottom-right.png"
        alt="bottom-right"
        className=" absolute right-[0px] bottom-0 w-[33vw] ascept-auto"
      />
    </div>
  );
}
export default Otp;
