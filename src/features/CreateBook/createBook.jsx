import Footer from "/src/common/Footer/Footer";
import Navbar from "../../pages/Navbar";

import TagExplorer from "./TagExplorer";
import { useState } from "react";
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  FiBook,
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiFileText,
  FiImage,
  FiUpload,
} from "react-icons/fi";

function CreateBook() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  let navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      console.log(selectedFile);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("status", "O");
      selectedGenres.forEach((genreId) => {
        formData.append("genres", Number(genreId));
      });
      selectedTags.forEach((tag) => {
        formData.append("tags", Number(tag.id));
      });
      console.log(formData.get("description"));

      const res = await fetch(`http://127.0.0.1:8000/book/create/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let errorMessage = "خطای ناشناخته‌ای رخ داده است";
      if (res.ok) {
        setTimeout(() => {
          Swal.fire({
            title: "کتاب شما با موفقیت ساخته شد",
            icon: "success",
            confirmButtonText: "باشه",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/mybooks");
            }
          });
        }, 100);
      } else {
        const errorText = await res.json();
        setTimeout(() => {
          Swal.fire({
            title: "ساخت کتاب با مشکل روبرو شد ",
            icon: "error",
            confirmButtonText: "باشه",
            text: JSON.stringify(errorText),
          });
        }, 100);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="px-4 sm:px-6 md:px-[75px] bg-[#A4C0ED] rounded-[30px] pt-[35px] w-9/10 max-w-[1170px] pb-[50px] mx-auto mt-4 sm:mt-8 md:mt-20 border-[2px] border-[#000]/21 flex flex-col items-center">
        <div className="gap-1 flex flex-row-reverse">
          <FiEdit3 className="text-2xl xl:text-3xl sm:text-[28px] md:text-[32px]" />
          <h1 className="text-xl xl:text-2xl sm:text-[28px] md:text-[32px] font-bold text-center">
            کتاب خود را بنویسید
          </h1>
        </div>

        {/* Upload + Book Name */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-[36px] mt-6 md:mt-[36px] w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-row-reverse gap-0.5 items-center text-center mb-2">
              <FiImage className="text-xl xl:text-2xl sm:text-[28px] md:text-[32px] opacity-65" />
              <h3 dir="rtl" className="text-lg xl:text-xl ">
                عکس جلد کتاب:
              </h3>
            </div>
            <div
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex pl-3 sm:pl-4 md:pl-2  px-2 sm:px-4 items-center w-full max-w-[492px] h-[53px] rounded-[12px] gap-2 sm:gap-[4px]"
            >
              <label
                htmlFor="image-input"
                className="bg-[#DDDDDD] rounded-[5px] py-[3px] px-2 sm:px-[6px] border-[2px] border-[#000000]/31 cursor-pointer whitespace-nowrap text-sm sm:text-base"
              >
                <div className="flex items-center gap-1">
                  <FiUpload className="text-base sm:text-md xl:text-lg" />
                  <span>انتخاب فایل</span>
                </div>
              </label>
              <input
                className="hidden outline-[#000000]/21"
                id="image-input"
                type="file"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />
              {selectedFile ? (
                <span className="truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] text-sm sm:text-base">
                  {selectedFile.name}
                </span>
              ) : (
                <span className="text-sm xl:text-lg sm:text-base mr-2">
                  فایلی انتخاب نشده
                </span>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-row-reverse gap-0.5 items-center text-center mb-2">
              <FiBook className="text-xl xl:text-2xl sm:text-[28px] md:text-[32px] opacity-65" />
              <h3 dir="rtl" className="text-lg xl:text-xl ">
                نام کتاب:
              </h3>
            </div>
            <input
              value={name}
              placeholder="نام کتاب خود را وارد کنید"
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center w-full max-w-[492px] h-[53px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 md:mt-[27px] flex flex-col gap-[10px] w-full">
          <div className="flex flex-row-reverse gap-0.5 items-center text-center mb-2">
            <FiFileText className="text-xl xl:text-2xl sm:text-[28px] md:text-[32px] opacity-65" />
            <h3 dir="rtl" className="text-lg xl:text-xl">
              خلاصه داستان:
            </h3>
          </div>
          <div dir="rtl" className="w-full max-w-[1020px] h-[211px]">
            <LongParagraphInput
              setInputValue={setDescription}
              placeholder="خلاصه داستان را در اینجا بنویسید "
            />
          </div>
        </div>

        {/* Tag Explorer */}
        <div className="w-full mt-6 md:mt-12">
          <TagExplorer
            onSelectTags={setSelectedTags}
            onSelectGenre={setSelectedGenres}
          />
        </div>

        {/* Submit */}
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
          className="btn !mt-8 md:!mt-[60px] !w-full max-w-[213px] !h-[52px] !rounded-[12px]"
        >
          <span className="span-btn">
            {loading ? "...در حال ایجاد" : "ایجاد کتاب"}
          </span>
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default CreateBook;
