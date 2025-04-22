import { useState, useEffect } from "react";
import { Rating, Select, MenuItem, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import Footer from "../../common/Footer/Footer.jsx";
import Navbar from "../../common/Navbar/navbar.jsx";
import SearchBar from "../../Searchbar";
import Reviews from "./reviews";
import Loading from "../../common/Loading/Loading.jsx";
import Swal from "sweetalert2";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 mx-1 ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300"
          } rounded-lg`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
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
  const [isSticky, setIsSticky] = useState(false);
  const [lastReadChapter, setLastReadChapter] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [chapterId, setChapterId] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [chapterFound,setChapterFound]=useState(false)

  const chaptersPerPage = 10;
  const totalPages = Math.ceil((book?.chapters?.length || 0) / chaptersPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        const [bookResponse, favoriteResponse] = await Promise.all([
          fetch(`https://batbooks.liara.run/book/${bookId}/`),
          fetch(
            `https://batbooks.liara.run/book-actions/is/favorite/${bookId}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        if (bookResponse.status==404){
          setChapterFound(false)
        }
        console.log(bookResponse.status)
        if (!bookResponse.ok || !favoriteResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        setChapterFound(true)
        const bookData = await bookResponse.json();
        const favoriteData = await favoriteResponse.json();

        setBook(bookData);
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
    try {
      const response = await fetch(
        `https://batbooks.liara.run/book-actions/toggle/favorite/${bookId}/`,
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
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
      setIsFavorite(!isFavorite);
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
      // Replace this with your actual API endpoint
      const response = await fetch(
        `https://batbooks.liara.run/comments/book/${bookId}/reviews/create/`,
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
        throw new Error(data.message || "failed to submit comment");
      }
    } catch (err) {
      setError(err.message || "try again");
    }
  };
  if (!chapterFound) {return(<div className="grid place-items-center h-[100vh]"> 
    <h2 className="text-4xl inline-block">
        صفحه مورد نظر یافت نشد
        </h2> 
   </div>)}
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="flex bg-[#D9F0FF] min-h-screen p-5 flex-row-reverse text-right ">
        {/* Sidebar */}
        <div className={`w-[23.3vw]  transition-all duration-500 ease-in-out`}>
          <img
            src={
              book.image
                ? `https://batbooks.liara.run/${book.image}`
                : `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198`
            }
            alt="Book Cover"
            className="rounded-lg shadow-lg w-full h-[500px]"
          />
          {console.log(book)}
          <div className="grid grid-cols-1 mt-4">
            <button
              onClick={() => handleFavorite()}
              className={`btn !shadow-lg !rounded-full !h-8  !w-full  ${
                isFavorite ? "" : " !bg-[#FFFF] !text-black"
              }`}
            >
              <span className="span-btn">
                {isFavorite
                  ? "حذف از مورد علاقه ها"
                  : "اضافه کردن به مورد علاقه ها"}
              </span>
            </button>
            <button
              className={`btn !shadow-lg !rounded-full !h-8  !w-full  ${
                book.readOnce ? "" : " !bg-[#FFFF] !text-black"
              }`}
            >
              <span className="span-btn">
                {book.readOnce ? "تا کنون خوانده شده" : "تا کنون خوانده نشده"}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 mr-auto flex flex-col">
          <SearchBar />

          {/* Book Details */}
          <div className="bg-[#D9F0FF] p-5 mb-5 relative z-10">
            <h1 className="text-4xl font-bold mb-4">{book.name}</h1>
            <h2 className="text-2xl text-gray-600">{book.author}</h2>

            <div className="flex items-center my-2 justify-end">
              <span className="ml-2 text-gray-700 mb-1 font-bold opacity-70">
                نظر
              </span>
              <span className="ml-2 mr-2 text-gray-700 mb-1 font-bold opacity-70">
                {book.reviewsCount || 0}
              </span>
              <span className="ml-2 text-gray-700 mb-1 font-bold opacity-70">
                رای
              </span>
              <span className="ml-2 mr-50 text-gray-700 mb-1 font-bold opacity-70">
                {book.ratingsCount || 0}
              </span>
              <span className="ml-2 mr-7 text-gray-700 text-2xl mb-1">
                {book.rating}
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
              {book.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-5 py-1 rounded-lg text-sm mx-2"
                >
                  {genre}
                </span>
              ))}
              <span dir="rtl" className="font-semibold">
                ژانر ها:
              </span>
            </div>
            <div className="mt-5">
              {book.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-5 py-1 rounded-lg text-sm mx-2"
                >
                  {tag}
                </span>
              ))}
              <span dir="rtl" className="font-semibold">
                تگ ها:
              </span>
            </div>
          </div>

          {/* Chapter List */}
          <div className="bg-[#D9F0FF] p-5 relative z-0">
            <h2 className="text-xl font-bold mb-3">فهرست فصل‌ها</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-400 text-white">
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
                        className="border-b hover:bg-blue-100 cursor-pointer"
                      >
                        <td className="p-3">
                          {chapter.title || `فصل ${index + 1}`}
                        </td>
                        <td className="p-3">
                          {chapter.releaseDate || "۱۴۰۲/۰۷/۰۱"}
                        </td>
                        <td className="p-3">{chapter.number || index + 1}</td>
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
      <button
        className="btn !mr-60 !rounded-[10px]"
        onClick={() => setIsClicked(true)}
      >
        <span className="span-btn">نقد خود را بنویسید</span>
      </button>
      <form
        className={`w-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg border mt-8 mx-20 ${isClicked ? "visible" : "hidden"}`}
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
          <div className="flex flex-row justify-between w-[90%] items-center">
            <div>
              <label className="block text-gray-600 mb-1 text-sm">
                عنوان نقد
              </label>

              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="عنوان نقد خود را وارد کنید..."
                className="w-[500px] px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm">
                آخرین چپتر خوانده شده
              </label>
              <Select
                value={chapterId}
                onChange={(e) => {
                  setLastReadChapter(e.target.key);
                  setChapterId(e.target.value);
                }}
                className="w-[180px]  rounded-[10px] text-lg text-center font-vazir"
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
                <MenuItem className="font-vazir" value={0}>
                  انتخاب چپتر
                </MenuItem>
                {book.chapters.map((chapter, index) => (
                  <MenuItem
                    className="font-vazir"
                    value={chapter.id}
                    key={chapter.title}
                  >
                    {index + 1}.{chapter.title}
                  </MenuItem>
                ))}
              </Select>
              <div className="text-red-600">{error}</div>
            </div>
            <div>
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
                  className="w-[70px] text-[20px] rounded-[10px] text-center border border-gray-300"
                />
              </section>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              محتوای نظر
            </label>
            <Editor
              value={reviewContent}
              onTextChange={(e) => setReviewContent(e.htmlValue)}
              style={{ height: "200px" }}
            />
          </div>

          <button className="btn !rounded-[10px] font-bold" type="submit">
            <span className="span-btn">ثبت نقد</span>
          </button>
        </div>

        <div className="mt-6 bg-blue-100 text-blue-800 border-l-4 border-blue-600 p-4 text-xs rounded">
          <strong>⚠ لطفا با احترام نظر دهید!</strong> از نقد سازنده استقبال می
          شود؛ لطفا محترمانه برخورد کنید و قوانین را رعایت کنید.
        </div>
      </form>

      <div className="w-350 p-10 pl-28">
        {/* <Reviews bookId={bookId} /> */}
      </div>

      <Footer />
    </div>
  );
};

export default BookPage;
