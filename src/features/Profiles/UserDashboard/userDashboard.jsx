import CommentIcon from "@mui/icons-material/Comment";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "../../../common/Loading/Loading";

export default function UserDashboard() {
  const [menuNum, setMenuNum] = useState(1);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevReviews, setPrevReviews] = useState("");
  const [nextReviews, setNextReviews] = useState("");
  const [reviews, setReviews] = useState([]);
  const [totalPagesReview, setTotalPagesReview] = useState(1);
  const [currentpageReview, setcurrentpageReview] = useState(1);
  const [prevComments, setPrevComments] = useState("");
  const [nextComments, setNextComments] = useState("");
  const [comments, setComments] = useState([]);
  const [totalPagesComment, setTotalPagesComment] = useState(1);
  const [currentpageComment, setcurrentpageComment] = useState(1);
  const [books, setBooks] = useState([]);
  const [showingBooks, setShowingBooks] = useState([]);
  const [totalPagesBooks, setTotalPagesBooks] = useState(1);
  const [currentpageBooks, setcurrentpageBooks] = useState(1);

  useEffect(() => {
    if (menuNum === 1) {
      setTotalPages(totalPagesReview);
      setcurrentpage(currentpageReview);
    } else if (menuNum === 2) {
      setTotalPages(totalPagesComment);
      setcurrentpage(currentpageComment);
    } else if (menuNum === 4) {
      setTotalPages(totalPagesBooks);
      setcurrentpage(currentpageBooks);
    }
  }, [menuNum, totalPagesComment, totalPagesReview, totalPagesBooks]);

  const handlePageChange = async (page) => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    if (menuNum === 1) {
      try {
        const pageDiff = page - currentpage;
        if (pageDiff > 0) {
          let nextLink = nextReviews;
          for (let i = 0; i < pageDiff; i++) {
            const response = await fetch(`${nextLink}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();
            nextLink = data.links.next;
            if (i === pageDiff - 1) {
              setNextReviews(data.links.next);
              setPrevReviews(data.links.previous);
              setcurrentpageReview(page);
              setcurrentpage(page);
              setReviews(data.results);
              setLoading(false);
            }
          }
        } else if (pageDiff < 0) {
          let prevLink = prevReviews;
          for (let i = pageDiff; i < 0; i++) {
            const response = await fetch(`${prevLink}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();
            prevLink = data.links.previous;
            if (i === -1) {
              setNextReviews(data.links.next);
              setPrevReviews(data.links.previous);
              setcurrentpageReview(page);
              setcurrentpage(page);
              setReviews(data.results);
              setLoading(false);
            }
          }
        }
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    } else if (menuNum === 2) {
      try {
        const pageDiff = page - currentpage;
        if (pageDiff > 0) {
          let nextLink = nextComments;
          for (let i = 0; i < pageDiff; i++) {
            const response = await fetch(`${nextLink}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();
            nextLink = data.links.next;
            if (i === pageDiff - 1) {
              setNextComments(data.links.next);
              setPrevComments(data.links.previous);
              setcurrentpageComment(page);
              setcurrentpage(page);
              setComments(data.results);
              setLoading(false);
            }
          }
        } else if (pageDiff < 0) {
          let prevLink = prevComments;
          for (let i = pageDiff; i < 0; i++) {
            const response = await fetch(`${prevLink}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
            }
            const data = await response.json();
            prevLink = data.links.previous;
            if (i === -1) {
              setNextComments(data.links.next);
              setPrevComments(data.links.previous);
              setcurrentpageComment(page);
              setcurrentpage(page);
              setComments(data.results);
              setLoading(false);
            }
          }
        }
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    } else if (menuNum === 4) {
      setShowingBooks(
        books.filter((_, i) => i < page * 10 && i >= (page - 1) * 10)
      );
      setcurrentpageBooks(page);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/comments/user/reviews/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        setReviews(data.results);
        setPrevReviews(data.links.previous);
        setNextReviews(data.links.next);
        setTotalPagesReview(Math.ceil(data.count / 10));
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    };
    const fetchComments = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/comments/user/comments/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        setComments(data.results);
        setPrevComments(data.links.previous);
        setNextComments(data.links.next);
        setTotalPagesComment(Math.ceil(data.count / 10));
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    };
    const fetchBooks = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/book/user-book-progress/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }
        const data = await response.json();
        setBooks(data);
        setShowingBooks(data.filter((_, i) => i < 10));
        setTotalPagesBooks(Math.ceil(data.count));
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      }
    };
    const loadData = async () => {
      setLoading(true);
      await fetchReviews();
      await fetchComments();
      await fetchBooks();
      setLoading(false);
    };
    loadData();
  }, []);

  function getTimeAgo(dateString) {
    const then = new Date(dateString);
    const now = new Date();

    const diffMs = now - then;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours <= 0) {
      return "اخیرا فرستاده شده";
    } else if (diffHours < 24) {
      return `${diffHours} ساعت پیش`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) {
        return "دیروز";
      } else if (diffDays < 30) {
        return `${diffDays} روز پیش`;
      } else {
        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths < 12) {
          return `${diffMonths} ماه پیش`;
        } else {
          const diffYears = Math.floor(diffMonths / 12);
          if (diffMonths % 12 < 6) {
            return `${diffYears} سال پیش`;
          } else {
            return `${diffYears} و نیم سال پیش`;
          }
        }
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-[40px] w-full items-center md:items-start">
      {/* Sidebar - Adjusted for medium screens */}
      <div className="z-50 sticky flex flex-row md:flex-col justify-center items-center overflow-x-auto md:overflow-x-visible h-fit bg-[#a4c0ed] min-w-full md:min-w-[200px] lg:min-w-[250px] p-3 md:pt-[15px] md:pb-[18px] md:px-3 gap-4 md:gap-[15px] lg:gap-[20px] outline-2 outline-[#000]/21 rounded-md shadow-md mx-auto">
        <button
          onClick={() => setMenuNum(1)}
          className={`group btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[8px] lg:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 1
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <ReviewsIcon className="relative text-lg md:text-xl" />
          <span className="hidden group-hover:inline md:inline span-btn !text-sm md:!text-[15px] lg:!text-[16px] !ml-auto transition-opacity duration-200">
            تاریخچه نقد کتاب ها
          </span>
        </button>

        <button
          onClick={() => setMenuNum(2)}
          className={`group btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[8px] lg:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 2
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <CommentIcon
            sx={{ transform: "scaleX(-1)" }}
            className="relative text-lg md:text-xl"
          />
          <span className="hidden group-hover:inline md:inline span-btn !text-sm md:!text-[15px] lg:!text-[16px] !ml-auto transition-opacity duration-200">
            تاریخچه نظرات فصل ها
          </span>
        </button>

        <button
          onClick={() => setMenuNum(4)}
          className={`group btn !mx-0 !rounded-md !mb-0 !w-fit md:!w-full !h-fit gap-1 md:gap-[5px] py-2 md:py-[8px] lg:py-[10px] pr-1 md:pr-[5px] pl-1 md:pl-[5px] !shadow-none outline outline-[#000]/21 !focus:outline !focus:outline-[#000]/21 ${
            menuNum !== 4
              ? "!bg-[#2663CDBF] before:!bg-[#4D8AFFBF]"
              : "!bg-[#4D8AFFBF] before:!bg-[#2663CDBF]"
          }`}
        >
          <AutoStoriesIcon className="relative text-lg md:text-xl" />
          <span className="hidden group-hover:inline md:inline span-btn !text-sm md:!text-[15px] lg:!text-[16px] !ml-auto transition-opacity duration-200">
            کتاب های در حال خواندن
          </span>
        </button>
      </div>

      {/* Main Content - Adjusted for medium screens */}
      <div className="flex flex-col gap-6 md:gap-6 lg:gap-[35px] w-full">
        {loading ? <Loading /> : null}
        {((menuNum === 1 && !loading && reviews.length === 0) ||
          (menuNum === 2 && !loading && comments.length === 0) ||
          (menuNum === 4 && !loading && showingBooks.length === 0)) && (
          <h1 className="text-[20px]">موردی برای نمایش وجود ندارد</h1>
        )}
        {menuNum === 1 &&
          !loading &&
          reviews.map((review) => (
            <Review
              key={review.id}
              bookId={review.book}
              bookName={review.book_name}
              userImage={review.image}
              rating={review.rating}
              userName={review.user.name}
              created={getTimeAgo(review.created)}
              chapterId={review.chapter}
              chapterName={review.chapter_name}
              reviewTitle={review.title}
              reviewContent={review.body}
              numLike={review.like.length}
              numDislike={review.dislike.length}
              likeStat={
                review.like.some((id) => id === review.user.id)
                  ? 1
                  : review.dislike.some((id) => id === review.user.id)
                    ? 0
                    : -1
              }
            />
          ))}
        {menuNum === 2 &&
          !loading &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              isReply={comment.tag !== null}
              chapterId={comment.chapter}
              chapterName={comment.chapter_name}
              userName={comment.user.name}
              userImage={comment.image}
              created={getTimeAgo(comment.created)}
              commentContent={comment.body}
              likeNum={comment.like.length}
              dislikeNum={comment.dislike.length}
              likeStat={
                comment.like.some((id) => id === comment.user.id)
                  ? 1
                  : comment.dislike.some((id) => id === comment.user.id)
                    ? 0
                    : -1
              }
              tag={comment.tag}
              tagId={comment.tag_id}
            />
          ))}
        {menuNum === 4 &&
          !loading &&
          showingBooks.map((book) => (
            <ReadingBook
              key={book.id}
              bookImage={book.book_image}
              bookName={book.book_name}
              bookId={book.book}
              lastChapter={book.last_read_chapter}
              historyId={book.id}
              author={book.author_name}
              lastChapterIndex={book.chapter_num}
              allChapters={book.chapter_count}
              star={book.rating}
              chapterName={book.chapter_title}
            />
          ))}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 my-6 items-center">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentpage - 1)}
              disabled={currentpage === 1}
              className={`px-3 py-1 rounded-md ${
                currentpage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              }`}
            >
              قبلی
            </button>

            {/* First Page */}

            {currentpage > 3 && totalPages > 5 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className={`px-3 py-1 rounded-md ${
                    currentpage === 1
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  }`}
                >
                  1
                </button>
                {currentpage > 4 && <span className="px-2">...</span>}
              </>
            )}

            {/* Middle Pages */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentpage <= 3) {
                pageNum = i + 1;
              } else if (currentpage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentpage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentpage === pageNum
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Last Page */}
            {currentpage < totalPages - 2 && totalPages > 5 && (
              <>
                {currentpage < totalPages - 3 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-1 rounded-md ${
                    currentpage === totalPages
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  }`}
                >
                  {console.log(totalPages)}
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentpage + 1)}
              disabled={currentpage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentpage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              }`}
            >
              بعدی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Review({
  bookId,
  bookName,
  userImage,
  rating,
  userName,
  created,
  chapterId,
  chapterName,
  reviewTitle,
  reviewContent,
  numLike,
  numDislike,
  likeStat,
}) {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row mb-3 md:mb-3 lg:mb-[12px]">
        <h2 className="text-lg md:text-[19px] lg:text-[20px] font-normal">
          نام کتاب:
        </h2>
        <h2
          onClick={() => {
            navigate(`/book/${bookId}`);
          }}
          className="text-lg md:text-[19px] lg:text-[20px] font-semibold text-[#2663CD] cursor-pointer"
        >
          {bookName}
        </h2>
      </div>
      <div className="flex flex-col gap-4 md:gap-4 lg:gap-[22px] px-4 md:px-5 lg:px-[25px] py-6 md:py-6 lg:py-[30px] shadow-md bg-blue-300 border-2 border-[#000000]/21 rounded-xl lg:rounded-[25px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-4 lg:gap-[25px]">
          <div className="flex flex-col items-center gap-3 md:gap-3 lg:gap-[16px]">
            <div className="w-16 h-16 md:w-18 md:h-18 lg:w-[83px] lg:h-[83px] rounded-full overflow-hidden">
              {userImage ? (
                <img
                  src={`http://127.0.0.1:8000${userImage}`}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={"/images/user_none.png"}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <Rating
              dir="ltr"
              defaultValue={Number(rating)}
              precision={0.1}
              readOnly
              size="medium"
            />
            <span className="text-base md:text-[15px] lg:text-[16px] font-bold">
              {userName}
            </span>

            <button
              onClick={() => navigate(`/book/${bookId}`)}
              className="btn !py-1 md:!py-[4px] lg:!py-[5px] !px-2 md:!px-[8px] lg:!px-[10px] !text-xs md:!text-[13px] lg:!text-[14px] !font-normal"
            >
              <span className="span-btn">مشاهده در صفحه</span>
            </button>
          </div>
          <div className="w-full min-h-[180px] p-4 md:p-5 lg:p-6 rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm shadow-black/21 bg-[#d9f0ff]">
            <div className="flex flex-col gap-2 md:gap-2 lg:gap-[10px]">
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-[300px] lg:gap-[500px]">
                <h2 className="text-sm md:text-[14px] lg:text-[15px] text-[#000000]/70">
                  {created}
                </h2>
                <h2 className="text-sm md:text-[14px] lg:text-base">
                  آخرین چپتر خوانده شده:
                  <span
                    onClick={() => navigate(`/chapter/${chapterId}`)}
                    className="font-bold text-blue-700 cursor-pointer"
                  >
                    {chapterName}
                  </span>
                </h2>
              </div>
              <h1 className="font-bold text-lg md:text-[19px] lg:text-xl">
                {reviewTitle}
              </h1>
              <div className="text-sm md:text-[14px] lg:text-[16px] font-light my-auto">
                {reviewContent}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-42">
          <div className="flex gap-4 md:gap-4 lg:gap-[25px]">
            <div className="flex items-center gap-0.5 md:gap-[2px]">
              <span className="inline-block min-w-[15px] text-center">
                {numDislike}
              </span>
              {likeStat === 0 ? (
                <AiFillDislike
                  color="red"
                  size={20}
                  className="md:w-5 md:h-5"
                />
              ) : (
                <AiOutlineDislike
                  color="red"
                  size={20}
                  className="md:w-5 md:h-5"
                />
              )}
            </div>
            <div className="flex items-center gap-0.5 md:gap-[2px]">
              <span className="inline-block min-w-[15px] text-center">
                {numLike}
              </span>
              {likeStat === 1 ? (
                <AiFillLike color="blue" size={20} className="md:w-5 md:h-5" />
              ) : (
                <AiOutlineLike
                  color="blue"
                  size={20}
                  className="md:w-5 md:h-5"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comment({
  isReply,
  chapterId,
  chapterName,
  userName,
  userImage,
  created,
  commentContent,
  likeNum,
  dislikeNum,
  likeStat,
  tag,
  tagId,
}) {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-1">
      {/* Top Info */}
      <div className="flex mb-3 gap-1 md:gap-[4px] lg:gap-[5px]">
        <h2 className="text-lg md:text-[19px] lg:text-[20px] font-normal">
          نام فصل:
        </h2>
        <h2
          onClick={() => navigate(`/chapter/${chapterId}`)}
          className="text-lg md:text-[19px] lg:text-[20px] font-semibold text-[#2663CD] cursor-pointer"
        >
          {chapterName}
        </h2>
      </div>

      {/* Comment Card */}
      <div className="flex flex-col gap-4 py-6 px-4 md:px-5 lg:px-[25px] bg-[#A4C0ED] border-2 border-[#000000]/21 rounded-xl lg:rounded-[25px]">
        <div className="flex flex-col items-center md:flex-row lg:gap-[30px] gap-5">
          <div className="flex flex-col items-center gap-3 md:w-31/100">
            {userImage ? (
              <img
                className="w-16 h-16 lg:w-[83px] lg:h-[83px] rounded-full"
                src={`http://127.0.0.1:8000${userImage}`}
                alt="user"
              />
            ) : (
              <img
                className="w-16 h-16 lg:w-[83px] lg:h-[83px] rounded-full"
                src="/images/user_none.png"
                alt="user"
              />
            )}
            <span className="text-base md:text-[15px] lg:text-[16px] font-normal">
              {userName}
            </span>
            <button
              onClick={() => navigate(`/chapter/${chapterId}`)}
              className="btn !py-1 md:!py-[4px] lg:!py-[5px] !px-2 md:!px-[8px] lg:!px-[10px] !text-xs md:!text-[13px] lg:!text-[14px] !font-normal"
            >
              <span className="span-btn">مشاهده در صفحه</span>
            </button>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-4 lg:gap-[22px] flex-grow">
              <div className="w-full p-4 md:p-5 lg:p-6 rounded-md lg:rounded-[15px] border-black/20 border-2 shadow-sm bg-[#E0F2F1] min-h-[180px]">
                <h2 className="text-sm md:text-[14px] lg:text-[15px] text-[#000000]/70 font-light mb-3">
                  {created}
                </h2>
                {isReply ? (
                  <button
                    onClick={() => {
                      navigate(`/anotheruserprofile/${tagId}`);
                    }}
                    className="relative flex gap-[5px] items-center cursor-pointer group focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm md:text-[16px] text-[#2563EB] font-[600]">
                      {`@${tag}`}
                    </span>
                    <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
                  </button>
                ) : null}
                {commentContent}
              </div>
            </div>
            <div className="self-start mt-4 mr-7">
              <LikeAndDislike
                likeNum={likeNum}
                dislikeNum={dislikeNum}
                likeStat={likeStat}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LikeAndDislike({ likeStat, likeNum, dislikeNum }) {
  return (
    <div className="flex gap-4 md:gap-5 lg:gap-[25px]">
      <div className="flex">
        <span>{dislikeNum}</span>
        <div className="h-fit w-fit">
          {likeStat === 0 ? (
            <AiFillDislike
              color="red"
              size={20}
              className="md:w-5 md:h-5 pointer-events-none"
            />
          ) : (
            <AiOutlineDislike
              color="red"
              size={20}
              className="md:w-5 md:h-5 pointer-events-none"
            />
          )}
        </div>
      </div>
      <div className="flex">
        <div className="h-fit w-fit">
          {likeStat === 1 ? (
            <AiFillLike
              color="blue"
              size={20}
              className="md:w-5 md:h-5 pointer-events-none"
            />
          ) : (
            <AiOutlineLike
              color="blue"
              size={20}
              className="md:w-5 md:h-5 pointer-events-none"
            />
          )}
        </div>
        <span>{likeNum}</span>
      </div>
    </div>
  );
}

function ReadingBook({
  bookImage,
  bookName,
  bookId,
  lastChapter,
  historyId,
  chapterName,
  author,
  allChapters,
  lastChapterIndex,
  star,
}) {
  let navigate = useNavigate();

  const handleDeleteHistoryBook = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/book/user-book-progress/${historyId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
      }
      Swal.fire({
        title: "کتاب شما با موفقیت از لیست حذف شد",
        icon: "success",
        confirmButtonText: "باشه",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          confirmButtonText: "باشه",
        });
      }, 100);
    }
  };

  return (
    <div className={`grid grid-cols-1`}>
      <div className="flex flex-col md:flex-row py-4 md:py-5 lg:py-[26px] pr-4 md:pr-5 lg:pr-[26px] pl-6 md:pl-7 lg:pl-[41px] bg-[#a4c0ed] rounded-xl lg:rounded-[25px] items-center border-2 border-[#000000]/8 justify-between">
        <div className="flex flex-col md:flex-row items-center">
          {bookImage === null ? (
            <img
              onClick={() => {
                navigate(`/book/${bookId}`);
              }}
              className={`shadow-lg shadow-[#000000]/25 rounded-xl lg:rounded-[20px] w-32 md:w-36 lg:w-[153px] h-40 md:h-44 lg:h-[189px] cursor-pointer`}
              src="/images/book_sample1.png"
              alt="book"
            ></img>
          ) : (
            <img
              onClick={() => {
                navigate(`/book/${bookId}`);
              }}
              className={`shadow-lg shadow-[#000000]/25 rounded-xl lg:rounded-[20px] w-32 md:w-36 lg:w-[153px] h-40 md:h-44 lg:h-[189px] cursor-pointer`}
              src={`http://127.0.0.1:8000${bookImage}`}
              alt="book"
            ></img>
          )}
          <div className="flex flex-col mr-4 md:mr-5 lg:mr-[26px] mt-4 md:mt-5 lg:mt-[27px] text-center md:text-right">
            <h6
              onClick={() => {
                navigate(`/book/${bookId}`);
              }}
              className={`text-xl md:text-[22px] lg:text-[26px] font-normal mb-1 md:mb-1.5 lg:mb-[5px] hover:text-blue-700 cursor-pointer`}
            >
              {bookName}
            </h6>
            <h4 className="mb-1.5 md:mb-1 lg:mb-[8px] text-base md:text-[17px] lg:text-[18px] font-normal">
              آخرین فصل:{chapterName}
            </h4>
            <h4 className="mb-1.5 md:mb-1 lg:mb-[8px] text-base md:text-[17px] lg:text-[18px] font-normal">
              نویسنده:{author}
            </h4>
            <Rating
              size="medium"
              style={{ direction: "ltr" }}
              name="half-rating-read"
              defaultValue={star}
              precision={0.1}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 w-full md:w-auto">
          <div className="w-64 md:w-80 lg:w-[480px] h-4 md:h-[18px] lg:h-[21px] bg-white rounded-full shadow-lg shadow-[#000000]/25">
            <div
              style={{ width: `${(lastChapterIndex / allChapters) * 100}%` }}
              className="h-full bg-[#26A541] rounded-full shadow-lg shadow-[#000000]/25"
            ></div>
          </div>
          <h4 className="text-sm md:text-[15px] lg:text-[16px] font-normal mr-0 md:mr-2 lg:mr-3 mt-2 md:mt-0">
            {Math.ceil((lastChapterIndex / allChapters) * 100) || "تست"}%
          </h4>
        </div>
        <div className="flex flex-col gap-[15px]">
          <button
            onClick={() => navigate(`/chapter/${lastChapter}`)}
            className={`btn !rounded-lg lg:!rounded-[10px] !mx-0 !mb-0  !h-fit py-2 md:py-[8px] lg:py-[9px] px-6 md:px-7 lg:px-[32px] mt-4 md:mt-0`}
          >
            <span className="span-btn text-sm md:text-[15px] lg:text-[16px] font-normal">
              ادامه دادن
            </span>
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "آیا مطمئن هستید؟",
                text: "!این عملیات قابل بازگشت نیست",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "!بله، حذف کن",
                cancelButtonText: "لغو",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteHistoryBook();
                }
              });
            }}
            className={`btn !rounded-lg lg:!rounded-[10px] !mx-0 !mb-0 !h-fit py-2 md:py-[8px] lg:py-[9px] px-6 md:px-7 lg:px-[24px] mt-4 md:mt-0`}
          >
            <span className="span-btn text-sm md:text-[15px] lg:text-[16px] font-normal">
              حذف از لیست
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
