import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const EditChapter = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [chapterMode, setChapterMode] = useState(0);
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://www.batbooks.ir/book/${bookId}/`);
        const data = await res.json();
        setBookData(data);
      } catch (err) {
        console.error("Error fetching book data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <p className="text-center mt-20">در حال بارگذاری...</p>;
  if (!bookData)
    return <p className="text-center mt-20">خطا در دریافت اطلاعات کتاب.</p>;

  return (
    <>
      <Navbar />
      <div className="text-center bg-[#A4C0ED] m-auto px-[150px] my-[88px] mx-[180px] border-[2px] border-[#000000]/31 pt-[57px] rounded-[30px] shadow-lg shadow-[#000000]/25">
        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              setChapterMode(1);
              navigate(`/createAndEditChapter/${bookId}`, {
                state: { id: bookId },
              });
            }}
            className="flex gap-[10px] justify-center mx-auto bg-[#2663CD] py-[7px] px-[23px] rounded-full text-[16px] font-medium text-white mb-[54px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          >
            <img src="/images/add_sign.svg" alt="add" />
            اضافه کردن فصل جدید
          </button>
          <h1 className="font-bold text-[27px] text-[#265073]">
            نام کتاب : {bookData.name}
          </h1>
          <button
            className="btn !px-4 !w-fit"
            onClick={() => {
              setChapterMode(1);
              navigate(`/book/edit/${bookId}`, {
                state: { id: bookId },
              });
            }}
          >
            <span className="span-btn">ویرایش اطلاعات کتاب</span>
          </button>
        </div>

        <div className="py-[47px]">
          <table className="rounded-[10px] min-w-full text-center text-sm bg-white shadow-lg shadow-[#000000]/31">
            <thead className="bg-[#2663cd]/90 rounded-[10px]">
              <tr className="rounded-[30px]">
                <th className="px-[10px] py-[16px] text-[14px] text-white font-semibold rounded-tl-[10px]">
                  ویرایش فصل
                </th>
                <th className="text-center px-[10px] py-[16px] text-[14px] text-white font-semibold w-[139px]  border-l-[2px] border-[#B9B9B9]">
                  آخرین ویرایش
                </th>
                <th className="px-[10px] py-[16px] text-[14px] text-white font-semibold w-[139px] text-center border-l-[2px] border-[#B9B9B9]">
                  امتیاز
                </th>
                <th className="px-[10px] py-[16px] text-[14px] text-white font-semibold text-right border-l-[2px] border-[#B9B9B9]">
                  نام فصل
                </th>
                <th className="px-[10px] py-[16px] text-[14px] text-white font-semibold w-[90px] text-center border-l-[2px] border-[#B9B9B9] rounded-tr-[10px]">
                  شماره فصل
                </th>
              </tr>
            </thead>
            <tbody>
              {bookData.chapters.map((chapter, index) => (
                <Chapter
                  key={chapter.id}
                  chapterId={chapter.id}
                  chapterNum={index + 1}
                  chapterName={chapter.title}
                  chapterPages={chapter.rating + " امتیاز"}
                  chapterEditedIn={new Date(
                    chapter.updated_at
                  ).toLocaleDateString("fa-IR")}
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

function Chapter({
  chapterId,
  chapterNum,
  chapterName,
  chapterEditedIn,
  chapterPages,
}) {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate(`/modifiedChapter/${chapterId}`);
  };

  return (
    <tr>
      <td className="py-[7px] px-[23px] w-[139px] border-t-[2px] border-[#B9B9B9]">
        <button
          onClick={goToAbout}
          className="bg-[#2663CD] py-[7px] px-[23px] text-white text-[16px] rounded-[10px] shadow-lg shadow-[#000000]/25 hover:bg-[#2663cd]/90 transition duration-200"
        >
          ویرایش
        </button>
      </td>
      <td className="text-center px-[12px] py-[18px] text-[14px]  border-t-[2px] border-l-[2px] border-[#B9B9B9]">
        {chapterEditedIn}
      </td>
      <td className="text-center px-[12px] py-[18px] text-[14px]  border-t-[2px] border-l-[2px] border-[#B9B9B9]">
        {chapterPages}
      </td>
      <td className="text-right px-[12px] py-[18px] text-[14px]  border-t-[2px] border-l-[2px] border-[#B9B9B9]">
        {chapterName}
      </td>
      <td className="text-center px-[12px] py-[18px] text-[14px]  border-t-[2px] border-l-[2px] border-[#B9B9B9]">
        {chapterNum}
      </td>
    </tr>
  );
}

export default EditChapter;
