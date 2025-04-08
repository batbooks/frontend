import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import { useState } from "react";
// import { useNavigate } from "react-router";
import { Editor } from "primereact/editor";
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";

function CreateBook() {
  const genresName = [
    "فانتزی",
    "علمی-تخیلی",
    "رمان(داستانی)",
    "تاریخی",
    "جنایی و کارآگاهی",
    "معمایی",
    "زندگی نامه",
    "توسعه فردی",
    "عاشقانه",
    "کمدی",
    "کمیک",
    "ترسناک",
    "فانتزی",
    "علمی-تخیلی",
    "رمان(داستانی)",
    "تاریخی",
    "جنایی و کارآگاهی",
    "معمایی",
    "زندگی نامه",
    "توسعه فردی",
    "عاشقانه",
    "کمدی",
    "کمیک",
    "ترسناک",
    "کمدی",
    "کمیک",
    "ترسناک",
    "فانتزی",
    "علمی-تخیلی",
    "رمان(داستانی)",
    "تاریخی",
    "جنایی و کارآگاهی",
    "معمایی",
    "زندگی نامه",
    "توسعه فردی",
    "عاشقانه",
    "کمدی",
    "کمیک",
    "ترسناک",
  ];
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [editor, setEditor] = useState("");

  function handleAddGenres(genre) {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div>
      <Navbar />
      <main className="px-[75px] bg-[#A4C0ED] rounded-[30px] pt-[35px] w-[1170px] pb-[50px] mx-auto mt-20 border-[2px] border-[#000]/21 flex flex-col items-center">
        <h1 className="text-[32px] font-bold text-center">
          کتاب خود را بنویسید
        </h1>
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
                className="bg-[#DDDDDD]  rounded-[5px] py-[3px] px-[6px] border-[2px] border-[#000000]/31 cursor-pointer"
              >
                انتخاب فایل
              </label>
              <input
                className="hidden"
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
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center  w-[492px] h-[53px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
            />
          </div>
        </div>
        <div className="mt-[27px] flex flex-col gap-[10px]">
          <h3 dir="rtl" className="text-[20px]">
            خلاصه داستان:
          </h3>
          <div dir="rtl" className="w-[1020px] h-[211px]">
            <LongParagraphInput />
          </div>
          {/* <Editor
            value={editor}
            onTextChange={(e) => setEditor(e.htmlValue)}
            className="bg-white h-[400px] w-[800px]"
            dir="rtl"
          /> */}
        </div>
        <span dir="rtl" className="text-[20px] mb-[12px] mt-[45px] ml-auto">
          ژانر های داستان:
        </span>
        <div className=" flex gap-[36px]">
          <div className="bg-white p-[30px] w-[503px] h-[321px] rounded-[15px] grid grid-cols-3 gap-[39px] overflow-y-scroll shadow-lg shadow-[#000000]/21 border-[2px] border-[#000000]/21">
            {genresName.map((name) => (
              <button
                onClick={() => handleAddGenres(name)}
                key={name}
                className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[124px] h-[36px] rounded-[5.5px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 "
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            {selectedGenres.length !== 0 ? (
              <div className="grid grid-cols-3 gap-[15px] mb-[15px]">
                {selectedGenres.map((genreName) => (
                  <SelectedGenre
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genreName={genreName}
                  />
                ))}
              </div>
            ) : null}
            <div className="flex gap-[6px]">
              <input
                dir="rtl"
                placeholder="ژانر کتاب"
                className="shadow-lg shadow-[#000000]/21 focus:outline-none border-[2px] border-[#000000]/21 bg-[#FFFFFF] mx-auto pl-14 px-4 items-center  w-[386px] h-[43px] rounded-l-[53px] rounded-r-[5px] placeholder:text-right placeholder:mr-[72px]"
              />
              <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto items-center  w-[89px] h-[43px] rounded-l-[5px] rounded-r-[53px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
                جستجو
              </button>
            </div>
          </div>
        </div>
        <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center mt-[60px]  w-[213px] h-[52px] rounded-[12px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
          ایجاد کتاب
        </button>
      </main>
      <Footer />
    </div>
  );
}

function SelectedGenre({ genreName, selectedGenres, setSelectedGenres }) {
  return (
    <div className="bg-white rounded-full px-[11px] flex justify-between shadow-lg">
      <button
        onClick={() =>
          setSelectedGenres(() =>
            selectedGenres.filter((genre) => genre !== genreName)
          )
        }
        className="cursor-pointer"
      >
        &times;
      </button>
      <span className="text-[15px]">{genreName}</span>
    </div>
  );
}

export default CreateBook;
