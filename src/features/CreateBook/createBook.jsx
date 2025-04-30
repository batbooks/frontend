import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import TagExplorer from "./TagExplorer";
import { useState } from "react";
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function CreateBook() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
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
    setError("");
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", selectedFile);
      formData.append("status", "O");
      selectedGenres.forEach((genreId) => {
        formData.append("genres", Number(genreId));
      });
      selectedTags.forEach((tag) => {
        formData.append("tags", Number(tag.id));
      });

      await fetch(`http://45.158.169.198/book/create/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
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
    }
  };

  return (
    <div>
      <Navbar />
      <main className="px-[75px] bg-[#A4C0ED] rounded-[30px] pt-[35px] w-[1170px] pb-[50px] mx-auto mt-20 border-[2px] border-[#000]/21 flex flex-col items-center">
        <h1 className="text-[32px] font-bold text-center">
          کتاب خود را بنویسید
        </h1>

        {/* Upload + Book Name */}
        <div className="flex gap-[36px] mt-[36px]">
          <div className="flex flex-col">
            <h3 dir="rtl" className="text-[20px]">
              عکس جلد کتاب:
            </h3>
            <div
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex pl-14 px-4 items-center  w-[492px] h-[53px] rounded-[12px] gap-[4px]"
            >
              <label
                htmlFor="image-input"
                className="bg-[#DDDDDD] rounded-[5px] py-[3px] px-[6px] border-[2px] border-[#000000]/31 cursor-pointer"
              >
                انتخاب فایل
              </label>
              <input
                className="hidden outline-[#000000]/21"
                id="image-input"
                type="file"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
              />
              {selectedFile ? (
                <span> {selectedFile.name}</span>
              ) : (
                <span>فایلی انتخاب نشده</span>
              )}
            </div>
          </div>
          <div>
            <h3 dir="rtl" className="text-[20px]">
              نام کتاب:
            </h3>
            <input
              value={name}
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center w-[492px] h-[53px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="mt-[27px] flex flex-col gap-[10px]">
          <h3 dir="rtl" className="text-[20px]">
            خلاصه داستان:
          </h3>
          <div dir="rtl" className="w-[1020px] h-[211px]">
            <LongParagraphInput setinputValue={setDescription} />
          </div>
        </div>

        {/* Tag Explorer */}
        <div className="w-full mt-12">
          <TagExplorer
            onSelectTags={setSelectedTags}
            onSelectGenre={setSelectedGenres}
          />
        </div>

        {/* Submit */}
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
          className="btn  !mt-[60px] !w-[213px] !h-[52px] !rounded-[12px]"
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
