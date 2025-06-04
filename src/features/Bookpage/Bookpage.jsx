import { useState, useEffect } from "react";
import { Rating, Select, MenuItem, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editor } from "primereact/editor";
import Footer from "../../common/Footer/Footer.jsx";
import Navbar from "../../common/Navbar/navbar.jsx";
import Reviews from "./reviews";
import SearchBar from "../../Searchbar";
import Loading from "../../common/Loading/Loading.jsx";
import Swal from "sweetalert2";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 4) pages.push("...");

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {pageNumbers.map((page, idx) => (
        <button
          key={idx}
          disabled={page === "..."}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 rounded-lg ${
            page === "..."
              ? "bg-transparent cursor-default"
              : currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const BookPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(bookId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(2.5);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [lastReadChapter, setLastReadChapter] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [chapterId, setChapterId] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [chapterFound, setChapterFound] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const chaptersPerPage = 10;
  const totalPages = Math.ceil((book?.chapters?.length || 0) / chaptersPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const auth = token ? `Bearer ${token}` : "";

        const [bookResponse, favoriteResponse, reveiewsResponse] =
          await Promise.all([
            fetch(`https://www.batbooks.ir/book/${bookId}/`),
            fetch(
              `https://www.batbooks.ir/book-actions/is/favorite/${bookId}/`,
              {
                headers: { Authorization: auth },
              }
            ),
            fetch(`https://www.batbooks.ir/comments/book/${bookId}/reviews/`),
          ]);

        if (bookResponse.status == 404) {
          setChapterFound(false);
        }
        if (!bookResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        setChapterFound(true);
        const bookData = await bookResponse.json();
        const favoriteData = await favoriteResponse.json();
        const reviewsData = await reveiewsResponse.json();

        setBook(bookData);
        setReviewsCount(reviewsData.count);
        setIsFavorite(favoriteData.is_favorite);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFavorite = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://www.batbooks.ir/book-actions/toggle/favorite/${bookId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        Swal.fire({
          title: `${isFavorite ? "از کتاب های مورد علاقه حذف شد" : "به کتاب های مورد علاقه اضافه شد"}`,
          icon: "success",
          confirmButtonText: "باشه",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }, 100);
      setIsFavorite(!isFavorite);
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

  if (loading)
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );

  const token = localStorage.getItem("access_token");
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    if (chapterId === 0) {
      setError("چپتر را انتخاب کنید");
      return;
    }
    try {
      const response = await fetch(
        `https://www.batbooks.ir/comments/book/${bookId}/reviews/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            body: reviewContent,
            rating: reviewRating,
            book: parseInt(bookId),
            chapter: chapterId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("comment sent for review");
        // Redirect to verification page or next step after a short delay

        // Adjust the route as needed
        setTimeout(() => {
          Swal.fire({
            title: "نقد شما با موفقیت ثبت شد",
            icon: "success",
            confirmButtonText: "باشه",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      } else {
        throw new Error(data.error || "failed to submit comment");
      }
    } catch (err) {
      setError(err.message || "try again");
    }
  };
  if (!chapterFound) {
    return (
      <div className="grid place-items-center h-[100vh]">
        <h2 className="text-4xl inline-block">صفحه مورد نظر یافت نشد</h2>
      </div>
    );
  }
  return (
    <div className="">
      <Navbar />

      <div className="flex min-h-screen p-5 flex-col md:flex-row-reverse text-right ">
        {/* Sidebar */}
        <div className="md:w-1/3 xl:w-1/4  transition-all duration-500 ease-in-out">
          <img
            src={
              book.image
                ? `https://www.batbooks.ir${book.image}`
                : `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198`
            }
            alt="Book Cover"
            className="rounded-lg shadow-lg w-full xl:h-[500px]"
          />
          {isAuthenticated ? (
            <div className="grid grid-cols-1 mt-4">
              <button
                onClick={() => handleFavorite()}
                className={`btn !shadow-lg !rounded-full !h-8  !w-full  ${
                  isFavorite ? "before:!bg-[#FF3B30] !bg-[#CC2F26]" : ""
                }`}
              >
                <span className="span-btn">
                  {isFavorite
                    ? "حذف از مورد علاقه ها"
                    : "اضافه کردن به مورد علاقه ها"}
                </span>
              </button>
            </div>
          ) : null}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 xl:w-3/4 mr-auto flex flex-col">
          {/* <SearchBar /> */}

          {/* Book Details */}
          <div className=" text-right p-5 pt-0 mb-5 z-10">
            <h1 className=" text-4xl font-bold mb-4">{book.name}</h1>
            <h2 className="text-2xl text-gray-600">{book.Author}</h2>

            <div className="flex gap-[10px] items-center my-2 justify-end">
              <span className=" text-gray-700 mb-1 font-bold opacity-70">
                نقد
              </span>
              <span className=" mr-10 text-gray-700 mb-1 font-bold opacity-70">
                {reviewsCount}
              </span>

              <span className=" text-gray-700 text-2xl mb-1">
                {Math.round(book.rating * 10) / 10}
              </span>
              <Rating
                name="half-rating-read"
                defaultValue={Number(book.rating) || 0}
                precision={0.1}
                readOnly
              />
            </div>

            <p className="text-gray-700">
              {book.description ||
                "توضیحات کوتاه کتاب در اینجا نوشته می‌شود..."}
            </p>

            <div className="mt-2">
              <span dir="rtl" className="font-semibold">
                ژانر ها:
              </span>
              <div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-2 text-center"
                dir="rtl"
              >
                {book.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-1 py-1 rounded-lg text-sm  text-nowrap"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <span dir="rtl" className="font-semibold">
                تگ ها:
              </span>
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
                dir="rtl"
              >
                {book.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className=" bg-gray-200 px-1 py-1 rounded-lg text-sm text-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter List */}
          <div className="  md:p-5 relative z-0">
            <h2 className="text-xl font-bold mb-3">فهرست فصل‌ها</h2>
            <div className="">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-400 text-white text-sm text-nowrap">
                    <th className="p-3">نام فصل</th>
                    <th className="p-3">تاریخ انتشار</th>
                    <th className="p-3">شماره فصل</th>
                  </tr>
                </thead>
                <tbody>
                  {book.chapters
                    ?.slice(
                      (currentPage - 1) * chaptersPerPage,
                      currentPage * chaptersPerPage
                    )
                    .map((chapter, index) => (
                      <tr
                        onClick={() =>
                          navigate(`/chapter/${chapter.id}`, {
                            state: { index, bookId },
                          })
                        }
                        key={chapter.id || index}
                        className="border-b hover:bg-blue-100 cursor-pointer text-sm"
                      >
                        <td className="p-3">
                          {chapter.title || `فصل ${index + 1}`}
                        </td>
                        <td className="p-3">
                          {chapter.releaseDate || "۱۴۰۲/۰۷/۰۱"}
                        </td>
                        <td className="p-3">
                          {chapter.number ??
                            index + 1 + (currentPage - 1) * chaptersPerPage}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Review Section */}
      {isAuthenticated ? (
        <button
          className="btn md:!mr-30  !rounded-[10px]"
          onClick={() => setIsClicked(true)}
        >
          <span className="span-btn">نقد خود را بنویسید</span>
        </button>
      ) : null}
      <form
        className={`w-auto bg-[#d9f0ff] text-gray-800 p-3 lg:p-6 rounded-lg shadow-lg border mt-8 mb-8 mx-3 md:mx-20 ${isClicked ? "visible" : "hidden"}`}
        dir="rtl"
        onSubmit={handleSubmitReview}
      >
        <div dir="ltr" className="flex flex-row items-center">
          <i
            onClick={() => setIsClicked(false)}
            className="text-5xl text-red-600 cursor-pointer"
          >
            &times;
          </i>
        </div>
        <h3 className="text-2xl font-bold mb-6 border-b pb-2 text-blue-600">
          ثبت نقد
        </h3>
        <div className="space-y-6">
          <div className="w-full flex flex-col gap-10 lg:flex-row lg:gap-0 justify-between  items-center">
            <div className="w-full px-2">
              <label className="block mb-1 text-sm">عنوان نقد</label>

              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="عنوان نقد خود را وارد کنید..."
                className="w-full xl:w-[500px] bg-white px-4 py-2 rounded-[5px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <label className="block  mb-1 text-sm">
                آخرین چپتر خوانده شده
              </label>
              <Select
                value={chapterId}
                onChange={(e) => {
                  setLastReadChapter(e.target.key);
                  setChapterId(e.target.value);
                }}
                className="w-[180px] bg-white rounded-[10px] text-lg text-center font-vazir"
                MenuProps={{
                  PaperProps: {
                    sx: { fontFamily: "Vazir" },
                    style: {
                      maxHeight: 6 * 36, // ارتفاع کلی منو
                    },
                  },
                  MenuListProps: {
                    style: {
                      padding: 0,
                    },
                  },
                }}
              >
                <MenuItem className="font-vazir" value={0} dir="rtl">
                  انتخاب چپتر
                </MenuItem>
                {book.chapters.map((chapter, index) => (
                  <MenuItem
                    className="font-vazir "
                    value={chapter.id}
                    key={chapter.title}
                    dir="rtl"
                  >
                    {index + 1}.{chapter.title}
                  </MenuItem>
                ))}
              </Select>
              <div className="text-red-600">{error}</div>
            </div>
            <div className="w-full flex flex-col items-center">
              <section className="flex items-center gap-[10px]">
                <Rating
                  precision={0.1}
                  name="custom-rating"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                  size="large"
                  className="mr-2"
                  dir="ltr"
                />
                {reviewRating < 1 ? setReviewRating(1) : null}
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  max={5}
                  value={reviewRating}
                  onChange={(e) =>
                    0 <= e.target.value && e.target.value <= 5
                      ? setReviewRating(e.target.value)
                      : setReviewRating(0)
                  }
                  className="w-[70px] bg-white text-[20px] rounded-[10px] text-center border border-gray-300"
                />
              </section>
            </div>
          </div>
          <div>
            <label className="block  mb-1 text-sm">محتوای نظر</label>
            <Editor
              value={reviewContent}
              onTextChange={(e) => setReviewContent(e.htmlValue)}
              style={{
                height: "200px",
                backgroundColor: "white",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            />
          </div>

          <button className="btn !rounded-[10px] font-bold" type="submit">
            <span className="span-btn">ثبت نقد</span>
          </button>
        </div>

        <div className="mt-6 bg-white text-blue-800 border-l-4 border-blue-600 p-4 text-xs rounded-[5px]">
          <strong>⚠ لطفا با احترام نظر دهید!</strong> از نقد سازنده استقبال می
          شود؛ لطفا محترمانه برخورد کنید و قوانین را رعایت کنید.
        </div>
      </form>

      <Reviews book={book} />
      <Footer />
    </div>
  );
};

export default BookPage;
