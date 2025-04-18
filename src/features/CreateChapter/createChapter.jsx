import React, { useState } from "react";
import Navbar from "/src/common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { Editor } from "primereact/editor";
import { useLocation } from "react-router";

const CreateChapter = () => {
  const [chapterName, setChapterName] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const location = useLocation();
  const id= location.state?.id.id;
  const chapterMode= location.chapterMode?.chapterMode;

  const token =localStorage.getItem("access_token")
  const handlesubmit = async (e) => {
    e.prevent.default
    try {
      const response = await fetch(
        `https://batbooks.liara.run/book/chapter/create/`,
        {
          method: "POST",
          body: JSON.stringify({
            book: id,
            title: chapterName,
            body: chapterContent,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
      console.log("asdad");
    }
  };

  const [reviewContent, setReviewContent] = useState("");

  return (
    <>
      <Navbar  />
      <div className="m-auto py-[120px] bg-[#D9F0FF]">
        <div
          dir="rtl"
          style={{
            backgroundColor: "#A4C0ED",
            width: "1170px",
            borderRadius: "30px",
          }}
          className="mx-auto flex flex-col px-[75px] pt-[27px] pb-[72px] shadow-lg border-[2px] border-[#000000]/21"
        >
          <span className=" font-bold text-[32px] text-[#265073] mx-auto">
            نام کتاب : هری پاتر
          </span>
          <div className="flex flex-col">
            <h2 style={{}} className="text-[26px] text-[#265073] font-[700]">
              فصل nام:
            </h2>
            <div>
              <br />
              <label className="text-[#333333] font-[400] text-[20px] ml-[190px]">
                نام فصل :
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setChapterName(e.target.value);
                }}
                className="px-[26.6px] bg-[#ffffff] rounded-[12px] w-[492px] h-[54px] mb-[27px] border-[2px] border-[#000000]/21"
              />
            </div>
            <div className="flex flex-col">
              <br />
              <label className="text-[#333333] font-[400] text-[20px] mb-[1px]">
                محتوای فصل :
              </label>
              <Editor
                value={reviewContent}
                onTextChange={(e) => setChapterContent(e.htmlValue)}
                style={{ height: "286px" }}
                className="border-[2px] border-[#000000]/21 bg-white"
              />
            </div>
            <div className="mx-auto">
              <button
                onClick={handlesubmit}
                className="mt-[36px] text-[16.8px] font-[400] text-[#ffffff] rounded-[12px] border-[2px] border-[#000000]/21 px-[86px] py-[13.5px] bg-[#2663CD] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
              >
                {chapterMode === 1 ? (
                  <span>انتشار</span>
                ) : (
                  <span>اعمال تغییرات</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
};

export default CreateChapter;
