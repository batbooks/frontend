import { useState } from "react";
import { Editor } from "primereact/editor";
import { Rating } from "primereact/rating";
// import "primereact/resources/themes/lara-dark-indigo/theme.css"; // Choose your preferred theme
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

export default function BookPage() {
  const chapters = [
    { id: 1, name: "Good Morning Brother", date: "6 years ago" },
    { id: 2, name: "Life’s Little Problems", date: "6 years ago" },
    { id: 3, name: "The Bitter Truth", date: "6 years ago" },
    { id: 4, name: "Stars Fell", date: "6 years ago" },
    { id: 5, name: "Start Over", date: "6 years ago" },
    { id: 6, name: "Concentrate and Try Again", date: "6 years ago" },
    { id: 7, name: "Of Gaps And Pretending", date: "6 years ago" },
    { id: 8, name: "Perspective", date: "6 years ago" },
    { id: 9, name: "Cheaters", date: "6 years ago" },
    { id: 10, name: "Overlooked Details", date: "6 years ago" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 10;
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);

  // Review states
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleSubmitReview = () => {
    console.log("Review Submitted:");
    console.log("Title:", reviewTitle);
    console.log("Rating:", reviewRating);
    console.log("Content:", reviewContent);
    alert("Thank you for your review!");
    setReviewTitle("");
    setReviewRating(0);
    setReviewContent("");
  };

  return (
    <div className="bg-[#D9F0FF] min-h-screen  flex flex-col items-center">
      {/* Search Bar */}
      <div className="relative w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Search Your Books"
          className="bg-white w-full px-12 py-2 rounded-full border border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
        />
        <svg
          className="absolute left-3 top-2 w-6 h-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          fill="currentColor"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
        </svg>
      </div>

      {/* Book Details Section */}
      <div className=" flex flex-col md:flex-row w-full bg-blue-300 p-6  pb-20   ">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Book Cover"
            className="w-48 h-64 rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-2xl font-bold text-blue-900">Book Name</h2>
          <h3 className="text-lg text-gray-700">Author Name</h3>
          <div className="flex items-center my-2 text-gray-600">
            ⭐ ⭐ ⭐ ⭐ ⭐ <span className="ml-2 font-bold text-black">4.5</span>
            <span className="ml-2 text-sm">654 Ratings · 756 Reviews</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, possimus velit aspernatur consequatur iusto, aperiam earum accusantium, hic inventore libero molestiae expedita ad provident voluptatibus. Maxime, nostrum. Quod, facilis enim.          </p>
          <div className="flex flex-wrap mt-2 text-sm">
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">
              Genre 1
            </span>
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2">
              Genre 2
            </span>
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md">
              Genre 3
            </span>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            <p>
              <strong>Pages:</strong> 300
            </p>
            <p>
              <strong>Publication Date:</strong> MM/DD/YYYY
            </p>
            <p>
              <strong>Language:</strong> English
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="w-full bg-blue-300 p-6  ">
        <h3 className="text-lg font-bold  flex items-center mb-4">
          📑 TABLE OF CONTENTS
        </h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border border-gray-300">
                Chapter Name
              </th>
              <th className="p-2 text-right border border-gray-300">
                Release Date
              </th>
            </tr>
          </thead>
          <tbody>
            {chapters
              .slice(
                (currentPage - 1) * chaptersPerPage,
                currentPage * chaptersPerPage
              )
              .map((chapter) => (
                <tr key={chapter.id} className="border border-gray-300">
                  <td className="p-2 underline cursor-pointer">
                    {chapter.id}. {chapter.name}
                  </td>
                  <td className="p-2 text-right text-gray-600">
                    {chapter.date}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="w-full max-w-4xl bg-[#1c1c1c] text-gray-200 p-6 rounded-2xl shadow-2xl border mt-8">
        <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2 text-yellow-400">
          ⭐ Leave A Review
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-1 text-sm">
              Review Title
            </label>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Enter review title..."
              className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-[#2c2c2c] text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-sm">
              Overall Rating
            </label>
            <Rating
              value={reviewRating}
              onChange={(e) => setReviewRating(e.value)}
              stars={5}
              cancel={false}
              className="text-yellow-400"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-sm">
              Review Content
            </label>
            <Editor
              value={reviewContent}
              onTextChange={(e) => setReviewContent(e.htmlValue)}
              style={{ height: "200px" }}
              className="border-gray-700"
            />
          </div>
          <button
            onClick={handleSubmitReview}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-xl transition"
          >
            Submit Review
          </button>
        </div>
        <div className="mt-6 bg-yellow-100 text-yellow-800 border-l-4 border-yellow-600 p-4 text-xs rounded">
          <strong>⚠ Be Kind!</strong> Fair critique is appreciated, but please
          be respectful and follow the{" "}
          <a href="#" className="underline text-yellow-700">
            review rules
          </a>
          .
        </div>
      </div>
    </div>
  );
}
