import React, { useEffect, useState } from "react";
import "./Reading.css";
import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import Navbar from "../../common/Navbar/navbar";

const ReadingPage = () => {
  const [id,setId]=useState(1)
  const [chapterBody,setChapterBody]=useState("")
  useEffect(() => {
    const userData = {
      username: "ali123",
      password: "mypassword",
      email: "ali@example.com",
    };

    fetch("https://batbooks.liara.run/book/chapter/1/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("درخواست موفق نبود");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.body)
        setChapterBody(data.body)
      })
      .catch((error) => {
        console.error("خطا در ارسال به سرور:", error);
      });
  }, []);
  return (
    <div className="w-full">
      <Navbar />
      <div className="main-div m-auto font-[Vazir] shadow-2xl">
        <div
          dir="rtl"
          className=" flex items-center gap-[27px] pr-[71px] py-[19px]"
        >
          <img
            className="w-[179px] h-[247px] rounded-[15px]"
            src="/src/assets/images/book_sample.png"
            alt="chapter"
          />
          <article className="article1">
            <h2 className="text-[36px] font-[400]">نام کتاب :فلان </h2>
            <p className="text-[25px] font-[400] mb-[10px]">نام نویسنده</p>
            <h1 className="text-[45px] font-[400] mb-[10px]">
              فصل فلان : نام فصل
            </h1>
            <Rating
              style={{ direction: "ltr" }}
              size="small"
              defaultValue={4.5}
              precision={0.1}
              readOnly
            />
          </article>
        </div>
        <div className="main-div2 px-[71px]">
          <div className="flex justify-between py-[41px]">
            <button
              style={{ borderRadius: "10px" }}
              className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            >
              <span className="text-[#ffffff] font-[300] text-[27px]">
                {"<<"} فصل بعد{" "}
              </span>
            </button>
            <button
              style={{ borderRadius: "10px" }}
              className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            >
              <span className="text-[#ffffff] font-[300] text-[27px]">
                فصل قبل {">>"}
              </span>
            </button>
          </div>
          <div className="full-width-line mb-[41px]"></div>
          <div dir="rtl" className="mb-[500px] text-[25px] font-[400]">
           {chapterBody}
          </div>
          <div className="full-width-line"></div>
          <div className="flex justify-between py-[41px]">
            <button
              style={{ borderRadius: "10px" }}
              className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            >
              <span className="text-[#ffffff] font-[300] text-[27px]">
                {"<<"} فصل بعد{" "}
              </span>
            </button>
            <button
              style={{ borderRadius: "10px" }}
              className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            >
              <span className="text-[#ffffff] font-[300] text-[27px]">
                فصل قبل {">>"}
              </span>
            </button>
          </div>
          <div className="full-width-line"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReadingPage;
