import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import Footer from "../../common/Footer/Footer.jsx";
import Navbar from "../../common/Navbar/navbar.jsx";
import SearchBar from "../../Searchbar";
import Reviews from "./reviews";

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
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const chaptersPerPage = 10;
  const totalPages = Math.ceil((book?.chapters?.length || 0) / chaptersPerPage);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://batbooks.liara.run/book/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch book");
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmitReview = () => {
    alert("با تشکر از نظر شما!");
    setReviewTitle("");
    setReviewRating(0);
    setReviewContent("");
  };

  if (loading)
    return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">خطا: {error}</div>;
  if (!book) return <div className="text-center py-20">کتاب یافت نشد</div>;

  return (
    <div>
      <Navbar />

      <div className="flex bg-[#D9F0FF] min-h-screen p-5 flex-row-reverse text-right">
        {/* Sidebar */}
        <div
          className={`w-[23.3vw] mt-14 ${
            isSticky ? "hidden" : "fixed top-5"
          } transition-all duration-500 ease-in-out`}
        >
          <img
            src={
              book.coverImage ||
              "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198"
            }
            alt="Book Cover"
            className="rounded-lg shadow-lg w-full"
          />
          <div className="grid grid-cols-1 gap-y-2 mt-4">
            <button
              className={`shadow-lg rounded-full h-8 mt-1 ${
                book.isFavorite ? "bg-[#265073] text-white" : "bg-white"
              }`}
            >
              {book.isFavorite
                ? "حذف از مورد علاقه ها"
                : "اضافه کردن به مورد علاقه ها"}
            </button>
            <button
              className={`shadow-lg rounded-full h-8 ${
                book.readOnce ? "bg-[#265073] text-white" : "bg-white"
              }`}
            >
              {book.readOnce ? "تا کنون خوانده شده" : "تا کنون خوانده نشده"}
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
              <span className="font-semibold">ژانرها</span>
              {book.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-5 py-1 rounded-lg text-sm mx-2"
                >
                  {genre}
                </span>
              ))}
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
      <div className="w-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg border mt-8 mx-20">
        <h3 className="text-2xl font-bold mb-6 border-b pb-2 text-blue-600">
          ثبت نظر
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              عنوان نظر
            </label>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="عنوان نظر خود را وارد کنید..."
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="block text-gray-600 mb-1">امتیاز کلی</label>
          <Rating
            name="custom-rating"
            value={reviewRating}
            onChange={(event, newValue) => setReviewRating(newValue)}
            size="large"
            className="mr-2"
          />

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

          <button
            onClick={handleSubmitReview}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition"
          >
            ارسال نظر
          </button>
        </div>

        <div className="mt-6 bg-blue-100 text-blue-800 border-l-4 border-blue-600 p-4 text-xs rounded">
          <strong>⚠ لطفا با احترام نظر دهید!</strong> نقد سازنده appreciated,
          اما لطفا محترمانه برخورد کنید و قوانین را رعایت کنید.
        </div>
      </div>

      <div className="w-350 p-10 pl-28">
        <Reviews bookId={id} />
      </div>

      <Footer />
    </div>
  );
};

export default BookPage;
