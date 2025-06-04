import React, { useEffect, useState } from "react";
import Navbar from "/src/common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { Editor } from "primereact/editor";
import { useParams } from "react-router";
import Loading from "../../common/Loading/Loading";
import parse from "html-react-parser";
import Swal from "sweetalert2";

const ModifiedChapter = () => {
  const [chapterName, setChapterName] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { id: chapterId } = useParams();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const response = await fetch(`https://www.batbooks.ir/book/chapter/${chapterId}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
=======
        const response = await fetch(
          `https://www.batbooks.ir/book/chapter/${chapterId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
>>>>>>> 3266c051b9b5647209bfe2a4ec4c289947d5594d

        if (!response.ok) {
          throw new Error("Failed to fetch chapter");
        }

        const data = await response.json();
        setChapterName(data.title);
        setChapterContent(data.body);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("sfdf");
    try {
<<<<<<< HEAD
      const response = await fetch(`https://www.batbooks.ir/book/chapter/${chapterId}/`, {
        method: "PUT",
        body: JSON.stringify({
          title: chapterName,
          body: chapterContent,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
=======
      const response = await fetch(
        `https://www.batbooks.ir/book/chapter/${chapterId}/`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: chapterName,
            body: chapterContent,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
>>>>>>> 3266c051b9b5647209bfe2a4ec4c289947d5594d
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (response.ok) {
        console.log("Chapter updated:", data);
        Swal.fire({
          title: " فصل با موفقیت ویرایش شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "ارور ",
        text: " درخواست موفقیت آمیز نبود ",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } finally {
      setLoading(false);
    }
  };
  return !loading ? (
    <>
      <Navbar />
      <div className="m-auto py-[50px]">
        <div
          dir="rtl"
          style={{
            borderRadius: "30px",
          }}
          className="bg-[#A4C0ED] w-[90%] mx-auto flex flex-col px-[75px] pt-[27px] pb-[72px] shadow-lg border-[2px] border-[#000000]/21"
        >
          <span className="font-bold text-[32px] text-[#265073] mx-auto">
            ویرایش فصل
          </span>

          <div className="flex flex-col items-center">
            <div className="flex flex-col my-4">
              <label className=" font-bold text-[20px]">نام فصل :</label>
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                className="px-[26px] bg-white rounded-[12px] w-[492px] h-[54px] mb-[27px] border-[2px] border-[#000000]/21"
              />
            </div>
            <div className="grid grid-cols-[1fr_2fr] justify-items-stretch gap-5">
              <div className="flex flex-col">
                <label className=" font-bold text-[20px] mb-[1px]">
                  محتوای فصل :
                </label>
                <Editor
                  value={chapterContent}
                  onTextChange={(e) => setChapterContent(e.htmlValue)}
                  className="border-[2px]  h-full border-[#000000]/21 bg-white"
                />
              </div>
              <div>
                <label className=" font-bold text-[20px] mb-[1px]">
                  پیش نمایش محتوای فصل:
                </label>
                <div className="bg-white h-full text-[16px]  px-[10px] py-[7px] leading-10 border border-[#2663cd]">
                  {parse(chapterContent)}
                </div>
              </div>
            </div>

            <div className="mx-auto">
              <button
                onClick={handleSubmit}
                className="cursor-pointer mt-[36px] text-[16.8px] font-[400] text-[#ffffff] rounded-[12px] border-[2px] border-[#000000]/21 px-[86px] py-[13.5px] bg-[#2663CD] shadow-lg shadow-[#000000]/25"
              >
                اعمال تغییرات
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  ) : (
    <div className="h-[100vh] grid place-items-center">
      <Loading />
    </div>
  );
};

export default ModifiedChapter;
