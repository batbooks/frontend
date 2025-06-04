import React, { useState, useEffect } from "react";
import Navbar from "/src/common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { Editor } from "primereact/editor";
import { useLocation } from "react-router";
import Loading from "../../common/Loading/Loading";
import Swal from "sweetalert2";

const CreateChapter = () => {
  const [chapterName, setChapterName] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [chapterNumber, setChapterNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookName, setBookName] = useState("");
  const [inputType, setInputType] = useState("editor");
  const [pdfFile, setPdfFile] = useState(null);
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const auth = token ? `Bearer ${token}` : "";

        const response = await fetch(`https://www.batbooks.ir/book/${id}/`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: auth },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBookName(data.name);
        setChapterNumber(data.chapters.length + 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const auth = token ? `Bearer ${token}` : "";

    try {
      let response;

      if (inputType === "editor") {
        response = await fetch(`https://www.batbooks.ir/book/chapter/create/`, {
          method: "POST",
          body: JSON.stringify({
            book: id,
            title: chapterName,
            body: chapterContent,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        });
      } else if (inputType === "pdf") {
        const formData = new FormData();
        formData.append("book", id);
        formData.append("title", chapterName);
        formData.append("pdf", pdfFile);

        response = await fetch(`https://www.batbooks.ir/book/uploadfile/`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: auth,
          },
        });
      }

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: " فصل با موفقیت ایجاد شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      } else {
        Swal.fire({
          title: "ارور ",
          text: " درخواست موفقیت آمیز نبود ",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return !loading ? (
    <>
      <Navbar />
      <div className="m-auto py-[50px]">
        <div
          dir="rtl"
          className="bg-[#A4C0ED] w-[1170px] mx-auto rounded-[30px] flex flex-col px-[75px] pt-[27px] pb-[72px] shadow-lg border-[2px] border-[#000000]/21"
        >
          <h1 className=" font-bold text-[32px] text-[#265073] mx-auto">
            نام کتاب : <span>{bookName}</span>
          </h1>

          <div className="flex flex-col mt-6">
            <h2 className="text-[26px] text-[#265073] font-[700]">
              فصل {chapterNumber} ام
            </h2>

            <div className="flex gap-8 my-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="inputType"
                  value="editor"
                  checked={inputType === "editor"}
                  onChange={() => setInputType("editor")}
                />
                نوشتن با ادیتور
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="inputType"
                  value="pdf"
                  checked={inputType === "pdf"}
                  onChange={() => setInputType("pdf")}
                />
                آپلود PDF
              </label>
            </div>

            <label className="text-[#333333] text-[20px] mb-1 font-bold">
              نام فصل :
            </label>
            <input
              type="text"
              onChange={(e) => setChapterName(e.target.value)}
              className="px-[26px] bg-[#ffffff] rounded-[12px] w-[492px] h-[54px] mb-[27px] border-[2px] border-[#000000]/21"
            />

            {inputType === "editor" && (
              <div className="flex flex-col">
                <label className="text-[#333333] text-[20px] mb-1 font-bold">
                  محتوای فصل :
                </label>
                <Editor
                  value={chapterContent}
                  onTextChange={(e) => setChapterContent(e.htmlValue)}
                  className="h-[286px] border-[2px] border-[#000000]/21 bg-white"
                />
              </div>
            )}

            {inputType === "pdf" && (
              <div className="flex flex-col">
                <h3 className="text-[#333333] text-[20px] mb-1 font-bold">
                  فایل PDF :
                </h3>
                <div
                  dir="rtl"
                  className="bg-white flex pl-14 px-4 items-center rounded-[12px] gap-[4px] h-[53px]"
                >
                  <label
                    htmlFor="pdf-input"
                    className="bg-[#DDDDDD] rounded-[5px] py-[3px] px-[6px] border-[2px] border-[#000000]/31 cursor-pointer"
                  >
                    انتخاب فایل
                  </label>
                  <input
                    id="pdf-input"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className=" hidden outline-black/21 bg-white p-2 border-[2px] border-[#000000]/21 rounded"
                  />
                  {pdfFile ? (
                    <span> {pdfFile.name}</span>
                  ) : (
                    <span>فایلی انتخاب نشده</span>
                  )}
                </div>
              </div>
            )}

            <div className="mx-auto">
              <button
                onClick={handleSubmit}
                className="btn mt-[36px] text-[16.8px] rounded-[12px] border-[2px] border-[#000000]/21 px-[86px] py-[13.5px] bg-[#2663CD] text-white shadow-lg"
              >
                <span className="span-btn">انتشار</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="h-[100vh] grid place-items-center">
      <Loading />
    </div>
  );
};

export default CreateChapter;
