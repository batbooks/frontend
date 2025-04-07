import React, { useState } from "react";
import Navbar from "/src/common/Navbar/navbar";
import Footer from "../../common/Footer/footer";
import { Editor } from "primereact/editor";

const CreateChapter = () => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectValue, setSelectValue] = useState("--انتخاب کنید--");
  const [chapterName, setChapterName] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const handlesubmit = async (e) => {
    try {
      const response = await fetch(
        `https://batbooks.liara.run/book/chapter/create/`,
        {
          method: "POST",
          body: JSON.stringify({
            book: 3,
            title: chapterName,
            body: chapterContent,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NjIwMTM4LCJpYXQiOjE3NDQwMTUzMzgsImp0aSI6ImZjMmY3OWRkMGQ2YzRlNjk5MDYwOTg1MDZkOGRlZTg5IiwidXNlcl9pZCI6M30.HSlLIAfOT8IpD-OgqjibWMaSAHnA42XJmBG7qGAEtEc`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);

      console.log("asdad");
    }
  };

  const [reviewContent, setReviewContent] = useState("");

  return (
    <>
      <Navbar hasLogined={true} />
      <div className="m-auto pt-[126px] pb-[117px] bg-[#D9F0FF]">
        <div
          dir="rtl"
          style={{
            backgroundColor: "#A4C0ED",
            width: "1170px",
            borderRadius: "30px",
          }}
          className="mx-auto flex flex-col px-[75px] pt-[27px] pb-[72px] shadow-lg border-[2px] border-[#000000]/21"
        >
          <div className="flex justify-around">
            <button className="mb-[27px] flex items-center w-[225px] h-[38px] bg-[#2663CD] rounded-[40px] gap-[10px] justify-center text-[#ffffff] text-[15px] font-[400] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
              <span>اضافه کردن فصل جدید</span>
              <img
                src="/src/assets/images/add_sign.svg"
                alt="add"
                className="w-[22px] h-[22px]"
              />
            </button>
            <div className="flex gap-[10px]">
              <button className="mb-[27px] flex items-center w-[120px] h-[38px] bg-[#2663CD] rounded-[40px] gap-[10px] justify-center text-[#ffffff] text-[15px] font-[400] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                <span>ویرایش </span>
              </button>
              <div>
                <button
                  onClick={() => setIsSelectOpened(!isSelectOpened)}
                  onBlur={() =>
                    setTimeout(() => {
                      setIsSelectOpened(false);
                    }, 240)
                  }
                  className={`flex bg-[#ffffff] h-[38px] w-[200px] rounded-[40px] pr-[20.6px] text-[15px] ${selectValue !== "--انتخاب کنید--" ? "text-[#000000]" : "text-[#000000]/50"} hover:cursor-pointer border-[2px] border-[#000000]/21 focus:outline-none`}
                >
                  <div className="flex items-center hover:cursor-pointer">
                    <img
                      src="/images/arrow.png"
                      alt="arrow"
                      className="h-[24px] w-[24px]"
                    />
                    <span>{selectValue}</span>
                  </div>
                </button>
                <ul
                  className={`absolute bg-[#ffffff] w-[200px] max-h-[114px] rounded-[12px] border-[2px] border-[#000000]/21 divide-y divide-[#2F2F2F]/50 overflow-y-auto ${isSelectOpened ? "visible" : "hidden"}`}
                >
                  {Array.from({ length: 3 }, (_, i) => i).map((i) => (
                    <ChapterNum
                      content={`فصل ${i + 1}ام`}
                      setSelectValue={setSelectValue}
                      setIsSelectOpened={setIsSelectOpened}
                    />
                  ))}
                  <ChapterNum
                    content={"..."}
                    setSelectValue={setSelectValue}
                    setIsSelectOpened={setIsSelectOpened}
                  />
                  <ChapterNum
                    content={"فصل Nام"}
                    setSelectValue={setSelectValue}
                    setIsSelectOpened={setIsSelectOpened}
                  />
                </ul>
              </div>
            </div>
          </div>
          <h2 style={{}} className="text-[26px] text-[#265073] font-[700]">
            فصل nام:
          </h2>
          <div>
            <br />
            <label className="text-[#333333] font-[400] text-[20px] ml-[190px]">
              {" "}
              نام فصل :{" "}
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
              {" "}
              محتوای فصل :{" "}
            </label>
            <Editor
              value={reviewContent}
              onTextChange={(e) => setReviewContent(e.htmlValue)}
              style={{ height: "286px" }}
              className="border-[2px] border-[#000000]/21 bg-white"
            />
          </div>
          <div className="mx-auto">
            <button
              onClick={handlesubmit}
              className="mt-[36px] text-[16.8px] font-[400] text-[#ffffff] rounded-[12px] border-[2px] border-[#000000]/21 px-[86px] py-[13.5px] bg-[#2663CD] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            >
              انتشار
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

function ChapterNum({ content, setSelectValue, setIsSelectOpened }) {
  return (
    <li className="h-[38px]">
      <button
        onClick={(e) => {
          e.preventDefault();
          setSelectValue(content);
        }}
        className="flex text-[15px] text-[#000000]/70 w-full h-full pr-[20.6px] cursor-pointer hover:bg-[#2663CD]/90 active:outline-none"
      >
        <span className="mr-0 my-auto font-bold">{content}</span>
      </button>
    </li>
  );
}

export default CreateChapter;
