import Footer from "/src/common/Footer/footer";
import Navbar from "/src/common/Navbar/navbar";
import TagExplorer from "../CreateBook/TagExplorer";
import { useEffect, useState } from "react";
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

function EditBook() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [allGenres, setAllGenres] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenresAndTags = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const [genresRes, tagsRes] = await Promise.all([
          fetch(`/api/tag/genres/`),
          fetch(`/api/tag/tag-categories/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        const genresData = await genresRes.json();
        const tagsData = await tagsRes.json();

        setAllGenres(genresData.genres || []);

        const allTagsFlat = (tagsData.tag_categories || []).flatMap(
          (category) => category.tags
        );
        setAllTags(allTagsFlat);
      } catch (err) {
        console.error("Error fetching genres or tags:", err);
        setError("خطا در بارگذاری ژانرها یا تگ‌ها");
      }
    };
    fetchGenresAndTags();
  }, []);

  useEffect(() => {
    if (!id) return;
    if (allGenres.length === 0 || allTags.length === 0) return;

    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/book/${id}/`);
        const data = await response.json();

        setName(data.name);
        setDescription(data.description);

        const genreIds = data.genres
          .map((genreName) => {
            const found = allGenres.find(
              (g) => g.title === genreName || g.name === genreName
            );
            return found ? found.id : null;
          })
          .filter(Boolean);
        setSelectedGenres(genreIds);

        const matchedTags = data.tags
          .map((tagName) => {
            return allTags.find(
              (t) => t.title === tagName || t.name === tagName
            );
          })
          .filter(Boolean);
        setSelectedTags(matchedTags);
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError("خطا در بارگذاری اطلاعات کتاب");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, allGenres, allTags]);

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

      await fetch(`/api/book/${id}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "کتاب شما با موفقیت ویرایش شد.",
        icon: "success",
        confirmButtonText: "باشه",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/mybooks");
        }
      });
    } catch (err) {
      console.error(err.message);
      setError("خطا در ویرایش کتاب");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center mt-8">در حال بارگذاری...</div>;

  return (
    <div>
      <Navbar />
      <main className="px-4 sm:px-6 md:px-[75px] bg-[#A4C0ED] rounded-[30px] pt-[35px] w-full max-w-[1170px] pb-[50px] mx-auto mt-4 sm:mt-8 md:mt-20 border-[2px] border-[#000]/21 flex flex-col items-center">
        <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-bold text-center">
          ویرایش اطلاعات کتاب
        </h1>

        {error && (
          <div className="text-red-600 mt-4 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Upload + Book Name */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-[36px] mt-6 md:mt-[36px] w-full">
          <div className="flex flex-col w-full">
            <h3 dir="rtl" className="text-lg md:text-[20px]">
              عکس جلد کتاب:
            </h3>
            <div
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex pl-14 px-4 items-center w-full max-w-[492px] h-[53px] rounded-[12px] gap-[4px]"
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
                <span className="truncate max-w-[180px] sm:max-w-[250px]">
                  {selectedFile.name}
                </span>
              ) : (
                <span>فایلی انتخاب نشده</span>
              )}
            </div>
          </div>
          <div className="w-full">
            <h3 dir="rtl" className="text-lg md:text-[20px]">
              نام کتاب:
            </h3>
            <input
              value={name}
              dir="rtl"
              className="bg-[#FFFFFF] mx-auto flex justify-center pl-14 px-4 items-center w-full max-w-[492px] h-[53px] rounded-[12px] placeholder:text-right placeholder:mr-[72px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 md:mt-[27px] flex flex-col gap-[10px] w-full">
          <h3 dir="rtl" className="text-lg md:text-[20px]">
            خلاصه داستان:
          </h3>
          <div dir="rtl" className="w-full max-w-[1020px] h-[211px]">
            <LongParagraphInput
              inputValue={description}
              setInputValue={setDescription}
            />
          </div>
        </div>

        {/* Tag Explorer */}
        <div className="w-full mt-6 md:mt-12">
          <TagExplorer
            onSelectTags={setSelectedTags}
            onSelectGenre={setSelectedGenres}
            initialTags={selectedTags}
            initialGenres={selectedGenres}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn !mt-8 md:!mt-[60px] !w-full max-w-[213px] !h-[52px] !rounded-[12px]"
        >
          <span className="span-btn">
            {loading ? "...در حال ایجاد" : "ویرایش کتاب"}
          </span>
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default EditBook;
