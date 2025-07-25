import React, { useEffect, useState } from "react";
import Navbar from "/src/common/Navbar/navbar";
import Footer from "../../common/Footer/Footer";
import { Editor } from "primereact/editor";
import { useParams } from "react-router";
import Loading from "../../common/Loading/Loading";

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
        const response = await fetch(`http://45.158.169.198/book/chapter/${chapterId}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      const response = await fetch(`http://45.158.169.198/book/chapter/${chapterId}/`, {
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

      if (!response.ok) throw new Error("Failed to update chapter");

      const data = await response.json();
      console.log("Chapter updated:", data);
    } catch (err) {
      console.error("Error updating chapter:", err.message);
    } finally {
      setLoading(false);
    }
  };
  return !loading ? (
    <>
      <Navbar />
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
          <span className="font-bold text-[32px] text-[#265073] mx-auto">
            ویرایش فصل
          </span>

          <div className="flex flex-col">
            <h2 className="text-[26px] text-[#265073] font-[700]">نام فصل:</h2>

            <div className="my-4">
              <label className="text-[#333333] font-[400] text-[20px] ml-[190px]">
                نام فصل :
              </label>
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                className="px-[26.6px] bg-[#ffffff] rounded-[12px] w-[492px] h-[54px] mb-[27px] border-[2px] border-[#000000]/21"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#333333] font-[400] text-[20px] mb-[1px]">
                محتوای فصل :
              </label>
              <Editor
                value={chapterContent}
                onTextChange={(e) => setChapterContent(e.htmlValue)}
                style={{ height: "286px" }}
                className="border-[2px] border-[#000000]/21 bg-white"
              />
            </div>

            <div className="mx-auto">
              <button
                onClick={handleSubmit}
                className="mt-[36px] text-[16.8px] font-[400] text-[#ffffff] rounded-[12px] border-[2px] border-[#000000]/21 px-[86px] py-[13.5px] bg-[#2663CD] shadow-lg shadow-[#000000]/25"
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
