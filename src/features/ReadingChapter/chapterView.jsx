import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer/Footer";
import { Rating } from "@mui/material";
import Navbar from "../../common/Navbar/navbar";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router";
import Comments from "../../features/Comments/Comment";
import Loading from "../../common/Loading/Loading";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";
import moment from "jalali-moment";
const ReadingPage = () => {
  const { chapterId } = useParams();
  const [id, setId] = useState();
  const [chapterBody, setChapterBody] = useState("");
  const [bookCover, setbookCover] = useState("");
  const location = useLocation();
  const chapterNumber = location.state?.index + 1;
  const bookId = location.state?.bookId;
  const [bookName, setbookName] = useState("");
  const [author, setAuthor] = useState("");
  const [season, setSeason] = useState("");
  const [published, setPublished] = useState("");
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(2.5);
  const [chapterFound, setChapterFound] = useState(false);
  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/book/chapter/${chapterId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status == 404) {
          setChapterFound(false);
        }
        if (response.ok) {
          const data = await response.json();
          setbookCover(data.book_image);
          setChapterFound(true);
          setChapterBody(data.body);
          setbookName(data.book);
          setAuthor(data.Author);
          setSeason(data.title);
          setRating(data.rating);
          const shamsiDate = moment(data.created_at).locale('fa').format('jYYYY/jMM/jDD');
          setPublished(shamsiDate);

          // setPublished(format(new Date(data.created_at), "yyyy/MM/dd"));
        }
      } catch (error) {
        console.error("خطا در ارسال به سرور:", error);
      } finally {
        setLoading(false);
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
  if (!chapterFound) {
    return (
      <div className="grid place-items-center h-[100vh]">
        <h2 className="text-4xl inline-block">صفحه مورد نظر یافت نشد</h2>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-[#a4c0ed] m-auto">
        <div
          dir="rtl"
          className=" flex md:flex-row flex-col items-center gap-[27px] md:pr-5 lg:pr-[71px] md:text-right pb-[14px] pt-[14px] "
        >
          {bookCover != null ? (
            <img
              className="w-[179px] h-[247px] rounded-[15px]"
              src={`/api${bookCover}`}
              alt="chapter"
            />
          ) : (
            <img
              className="w-[179px] h-[247px] rounded-[15px]"
              src="/src/assets/images/book_sample2.png"
              alt="chapter"
            />
          )}
          <article className="w-full flex flex-row justify-between pr-3 pl-2 lg:pl-4">
            <div className=" flex flex-col md:justify-center gap-5">
              <h2 className=" flex flex-row gap-3 text-sm md:text-lg lg:text-2xl font-bold">
                <span className="hidden md:block md:font-normal">
                  نام کتاب:
                </span>
                {bookName}
              </h2>
              <p className="flex flex-row gap-3 text-sm md:text-lg lg:text-2xl font-bold">
                <span className="hidden md:block md:font-normal">مؤلف: </span>
                {author}
              </p>
              <h1 className="flex flex-row gap-3 text-sm md:text-lg lg:text-2xl font-bold">
                <span className="hidden md:block md:font-normal">فصل: </span>
                {season}
              </h1>
              <Rating
                style={{ direction: "ltr" }}
                size="medium"
                defaultValue={rating}
                precision={0.1}
                readOnly
              />
            </div>
            <h2 className="text-sm md:text-lg lg:text-2xl md:block">
              تاریخ انتشار: {published}
            </h2>
          </article>
        </div>
        <div className="bg-[#d9f0ff] flex flex-col ">
          <div className="flex justify-between py-[41px] w-95/100 mx-auto ">
            <button className="btn !py-[5px] !px-[5px] !m-0 text-nowrap !rounded-[10px] !w-auto ">
              <span className="span-btn">{"<<"} فصل بعد</span>
            </button>
            <button className="btn !py-[5px] !px-[5px] !m-0 text-nowrap !rounded-[10px] !w-auto ">
              <span className="span-btn">فصل قبل {">>"}</span>
            </button>
          </div>
          <div
            dir="rtl"
            className="text-sm px-4 py-2 leading-8 bg-white md:text-[18px] md:px-5 w-95/100 mx-auto md:py-[7px] md:leading-15 border border-[#2663cd]"
          >
            {parse(chapterBody)}
          </div>

          <div className="flex justify-between py-[41px] w-95/100 mx-auto ">
            <button className="btn !py-[5px] !px-[5px] !m-0 text-nowrap !rounded-[10px] !w-auto ">
              <span className="span-btn">{"<<"} فصل بعد</span>
            </button>
            <button className="btn !py-[5px] !px-[5px] !m-0 text-nowrap !rounded-[10px] !w-auto ">
              <span className="span-btn">فصل قبل {">>"}</span>
            </button>
          </div>
        </div>
      </div>
      <Comments chapterId={chapterId}></Comments>
      <Footer />
    </div>
  );
};

export default ReadingPage;
