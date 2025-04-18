import React, { useEffect, useState } from "react";
import "./Reading.css";
import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import Navbar from "../../common/Navbar/navbar";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router";
import Comments from "../../common/comments/Comments";
import Loading from "../../common/Loading/Loading";
const ReadingPage = () => {
  const {chapterId}=useParams();
  const [id,setId]=useState()
  const [chapterBody,setChapterBody]=useState("")
  const [bookCover,setbookCover]=useState("")
  const location=useLocation()
  const chapterNumber=location.state?.index+1
  const bookId=location.state?.bookId
  console.log(bookId)
  const [bookName,setbookName]= useState("")
  const [author,setAuthor]= useState("")
  const[season,setSeason]= useState("")
  const[published,setPublished]= useState("")
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true)
      
      try {
        const response = await fetch(`https://batbooks.liara.run/book/chapter/${chapterId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          
        });

        if (!response.ok) {
          throw new Error("درخواست موفق نبود");
        }

        const data = await response.json();
        console.log(data);
        setbookCover(data.book_image)
        setChapterBody(data.body);
        setbookName(data.book);
        setAuthor(data.Author);
        setSeason(data.title)
        setPublished(format(new Date(data.created_at), "yyyy/MM/dd"));
      } catch (error) {
        console.error("خطا در ارسال به سرور:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchChapter();
  }, []);
  if (loading)
      return (
        <div className="h-[100vh] grid place-items-center">
          <Loading />
        </div>
      );
  return (
    <div className="w-full">
      <Navbar />
      <div className="main-div m-auto font-[Vazir] shadow-2xl">
        <div
          dir="rtl"
          className=" flex items-center gap-[27px]  pr-[71px] py-[19px]"
        >
        {bookCover!=null ?
          (<img
            className="w-[179px] h-[247px] rounded-[15px]"
            src={`https://batbooks.liara.run${bookCover}`}
            alt="chapter"
          />) :
          (<img
            className="w-[179px] h-[247px] rounded-[15px]"
            src="/src/assets/images/book_sample2.png"
            alt="chapter"
          />)
        }
          <article className="article1">
            <div className="flex">
            <h2 className="text-[36px] font-[400]">نام کتاب :{bookName} </h2>
            <h2 className="text-[27px] font-[400] mr-[400px]">تاریخ انتشار :{published} </h2>
            </div>
            <p className="text-[25px] font-[400] mb-[10px]">{author}</p>
            <h1 className="text-[45px] font-[400] mb-[10px]">
              فصل : {season}  
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
          {/* <div className="full-width-line"></div> */}
        </div>
      </div>
      <Comments chapterId={chapterId}></Comments>
      <Footer />
    </div>
  );
};

export default ReadingPage;
