import { useState ,useEffect} from "react";
import { Rating } from '@mui/material';

// import { Rating } from "primereact/rating";

import SearchBar from "../Searchbar";
import Comments from "./comments";
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300"} rounded-lg`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

const BookPage = () => {
  const rating = 4.62;
  const reviews = 756;
  const totalRatings = 654;
  const genres = [" فانتزی ", " ماجراجویی ", " درام "];
  const chapters = Array.from({ length: 20 }, (_, i) => `فصل ${i + 1}`);
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 10;
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  const visibleChapters = chapters.slice(
    (currentPage - 1) * chaptersPerPage,
    currentPage * chaptersPerPage
  );
  const read_once=true;
  const isfavourite=false;

  // Review States
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const stopPosition = 420; // Height at which the element should stop
      const scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition >= stopPosition) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleSubmitReview = () => {
    alert("با تشکر از نظر شما!");
    setReviewTitle("");
    setReviewRating(0);
    setReviewContent("");
  };

  return (
    <div>
     
    <div className="flex  bg-[#D9F0FF] min-h-screen p-5 flex-row-reverse text-right">
      {/* Fixed Book Cover */}
      <div className={`w-[23.3vw]   ${
        isSticky ? " hidden" : " fixed top-5 "
      } transition-all duration-500 ease-in-out`} style={{ bottom: {isSticky} ? "auto" : "200px" }}>
        <img
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198"
          alt="Book Cover"
          className="rounded-lg shadow-lg"
        />
        <div className="grid grid-cols-1 gap-y-2">
          <button className={`shadow-lg rounded-full h-8 mt-1 ${isfavourite? "bg-[#265073] text-white ":"bg-white" } `}>{isfavourite?" حذف از مورد علاقه ها ":" اضافه کردن به مورد علاقه ها "}</button>
          <button className={`shadow-lg rounded-full h-8 ${read_once? "bg-[#265073] text-white ":"bg-white" } `}>{read_once?" تا کنون خوانده شده " : " تا کنون خوانده نشده "}</button>
          
        </div>
      </div>

      {/* Combined Book Details and Chapters */}
      <div className="w-3/4 mr-auto flex flex-col">
      <SearchBar  />
        {/* Book Details */}
        <div className="bg-[#D9F0FF] p-5   mb-5 relative z-10 text-right">
          <h1 className="text-4xl font-bold mb-4">نام کتاب</h1>
          <h2 className="text-2xl text-gray-600">نام نویسنده</h2>
          <div className="flex items-center my-2 justify-end">
            <span className="ml-2  text-gray-700 mb-1 font-bold opacity-70">
                نظر 
            </span>
            <span className="ml-2 mr-2 text-gray-700 mb-1 font-bold opacity-70">
           {reviews}
            </span>
            <span className="ml-2  text-gray-700 mb-1 font-bold opacity-70">
               رای 
            </span>
            <span className="ml-2 mr-50 text-gray-700 mb-1 font-bold opacity-70">
           {totalRatings}
            </span>
            <span className="ml-2 mr-7 text-gray-700 text-2xl mb-1">
                     {rating}
            </span>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.01} readOnly />
          </div>
          <p className="text-gray-700">توضیحات کوتاه کتاب در اینجا نوشته می‌شود...</p>
          <div className="mt-2">
            <span className="font-semibold"> ژانرها </span>
            {genres.map((genre, index) => (
              <span key={index} className="bg-gray-200 px-5 py-1 rounded-lg text-sm mx-2">{genre}</span>
            ))}
          </div>
        </div>

       {/* Chapter List */}
<div className="bg-[#D9F0FF] p-5  relative z-0 text-right">
  <h2 className="text-xl font-bold mb-3"> فهرست چپترها </h2>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-blue-400 text-white">
          {/* New Columns */}
          <th className="p-3 text-right"> اسم فصل ها </th>
          <th className="p-3 text-right"> تاریخ انتشار </th>
          {/* Existing Column */}
          <th className="p-3 text-right"> فصل </th>
        </tr>
      </thead>
      <tbody>
        {visibleChapters.map((chapter, index) => (
          <tr key={index} className=" my-2 rounded-lg cursor-pointer hover:bg-blue-500">
            {/* New Columns Data */}
            <td className="p-3 text-right"> اسم فصل {index + 1}</td> {/* Replace with actual chapter name if available */}
            <td className="p-3 text-right"> ۱۴۰۲/۰۷/۰۱ </td> {/* Replace with actual release date if available */}
            {/* Existing Column Data */}
            <td className="p-3 text-right">{chapter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
</div>
      </div>  
      </div>    
       <Comments></Comments >
      </div>
      
  );
};

export default BookPage;
